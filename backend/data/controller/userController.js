import { z } from 'zod';
import bcrypt from 'bcrypt';
import { sequelize } from '../models/index.js';
import jwt from 'jsonwebtoken';
import { User, Game } from '../models/index.js';
import generateController from './generateController.js';

const userSchema = z.object({
  pseudo: z.string().min(1),
  password: z.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/),
  passwordConfirm: z.string().min(6),
});


const userControllerGenerique = generateController(User, userSchema);

const userController = {
    ...userControllerGenerique,

    register: async (req, res) => {
      try {
        const { pseudo, password, passwordConfirm } = req.body;
    
        const validatedData = userSchema.parse({
          pseudo: pseudo,
          password: password,
          passwordConfirm: passwordConfirm
        });
    
        if (validatedData.password !== validatedData.passwordConfirm) {
            return res.json({
                success: false,
                message: 'Le mot de passe ne correspond pas',
            });
        }
    
        const result = await sequelize.transaction(async (t) => {
    
          const checkUser = await User.findOne({
              where: { pseudo: validatedData.pseudo },
              transaction: t, 
          });
    
          if (checkUser) {
              throw new Error('Pseudo déjà utilisé');
          }
    
          const hashedPassword = await bcrypt.hash(validatedData.password, 10);
    
          const user = await User.create({
             pseudo: validatedData.pseudo,
             password: hashedPassword,
          }, { transaction: t }); 
    
          return user;
        });
    
        return res.json({
            success: true,
            message: 'Vous pouvez maintenant vous connecter !',
            data: {
              id: result.id,
              pseudo: result.pseudo
            }
        });
    
      } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
          return res.status(409).json({
              success: false,
              message: 'Pseudo déjà utilisé',
          });
        } else {
          console.log(error);
          return res.status(500).json({
              success: false,
              message: 'Un mot de passe doit minimun contenir 8 caractères dont un chiffre et une majuscule',
          });
        }
      }
    },

    login: async (req, res) => {
      try {
        const { pseudo, password } = req.body;
        
        const user = await User.findOne({ where: { pseudo } });
        if (!user) {
          return res.status(401).json({ message: 'Pseudo ou mot de passe invalide' });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(401).json({ message: 'Pseudo ou mot de passe invalide' });
        }
    
        const token = jwt.sign({
          id: user.id,
          pseudo: user.pseudo
        }, process.env.JWT_SECRET, { expiresIn: '8h' });
    
        res.json({ 
          success: true,
          message: 'Connexion réussie',
          data: {
            id: user.id,
            pseudo: user.pseudo
          },
          token: token
        });
        
      } catch (error) {
        console.error('Erreur serveur interne', error);
        res.status(500).json({ 
          success: false,
          message: 'Erreur serveur interne'
        });
      }
    },
    

    async getUserGames(req, res) {
      try {
        const userId = req.params.userId;
        const userWithGames = await User.findByPk(userId, {
          include: [{
            association: 'games',
          }],
          attributes: ['id', 'pseudo']
        });
    
        if (!userWithGames) {
          return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.json(userWithGames); 
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Erreur serveur interne' });
      }
    },
    
    async associateUserToGame(req, res) {
      const { user_id, game_id } = req.body; 
      try {
        const game = await Game.findByPk(game_id);
        if (!game) {
          return res.status(404).json({ message: 'Jeu non trouvé' });
        }
    
        await game.update({ user_id }); 
    
        const updatedGameWithUser = await Game.findByPk(game_id, {
          include: [{ model: User, as: 'user' }]
        });
    
        res.json(updatedGameWithUser);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Erreur serveur interne' });
      }
    },

    show: async (req, res) => {
      res.render('dashboard/dashboard');
  },

};
  
export default userController;