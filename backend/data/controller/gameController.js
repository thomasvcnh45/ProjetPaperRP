import { Game, Character, Note, Status, User, Class, CharHasStat,  Stat, CharKnowsSkill, CharMasterSpell, Skill, Spell, CharIsClass, CharPossessesInventory, Inventory } from '../models/index.js';
import { z } from 'zod';
import generateController from './generateController.js';


const gameSchema = z.object({
  name: z.string().min(1).optional(),
  campaign: z.string().optional(),
  status_id: z.number().int().optional(), 
  note_id: z.number().int().optional(),
  user_id: z.number().int()
});

  const gameControllerGenerique = generateController(Game, gameSchema);

  const gameController = {
    ...gameControllerGenerique,
  
    async addCharacterToGame(req, res) {
      const { game_id, pseudo } = req.body;
      try {
          const game = await Game.findByPk(game_id);
          const user = await User.findOne({ where: { pseudo: pseudo } });
  
          if (!game || !user) {
              return res.status(404).send({ message: "Game or User not found." });
          }
  
          let character = await Character.create({
              experience: 0,
              level: 1,
              health: 100,
              game_id: game_id,
              user_id: user.id
          });
  
          const defaultStats = [
            { id: 1, defaultValue: 10 },
            { id: 2, defaultValue: 10 },
            { id: 3, defaultValue: 10 },
            { id: 4, defaultValue: 10 },
            { id: 5, defaultValue: 10 },
            { id: 6, defaultValue: 10 },
            { id: 7, defaultValue: 10 }];
          const defaultSkills = [{ id: 1 }];
          const defaultSpells = [{ id: 1 }];
          const defaultClasses = [{ id: 1 }];
          const defaultItems = [{ id: 1, isEquipped: true }]; 
  
          await Promise.all([
              ...defaultStats.map(stat => CharHasStat.create({
                  char_id: character.id,
                  stat_id: stat.id,
                  value: stat.defaultValue
              })),
              ...defaultSkills.map(skill => CharKnowsSkill.create({
                  char_id: character.id,
                  skill_id: skill.id
              })),
              ...defaultSpells.map(spell => CharMasterSpell.create({
                  char_id: character.id,
                  spell_id: spell.id
              })),
              ...defaultClasses.map(cls => CharIsClass.create({
                  char_id: character.id,
                  class_id: cls.id
              })),
              ...defaultItems.map(item => CharPossessesInventory.create({
                  char_id: character.id,
                  inventory_id: item.id,
                  is_equipped: item.isEquipped
              }))
          ]);
  
          const updatedGame = await Game.findByPk(game_id, {
              include: [{
                  model: Character,
                  as: 'characters',
                  include: [{
                      model: Stat,
                      as: 'stats',
                      through: { attributes: ['value'] }
                  }, {
                      model: Skill,
                      as: 'skills'
                  }, {
                      model: Spell,
                      as: 'spells'
                  }, {
                      model: Class,
                      as: 'classes'
                  }, {
                      model: Inventory,
                      as: 'inventories',
                      through: { attributes: ['is_equipped'] }
                  }]
              }]
          });
  
          res.json(updatedGame);
      } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
      }
  },

    async getGameNotes(req, res) {
      try {
        const gameId = req.params.gameId;
        const gameWithNotes = await Game.findByPk(gameId, {
          include: [{
            model: Note,
            as: 'note',
          }],
        });
    
        if (!gameWithNotes) {
          return res.status(404).json({ message: 'Partie non trouvée' });
        }
    
        res.json(gameWithNotes);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Erreur serveur interne' });
      }
    },

    async addNoteToGame(req, res) {
      const { game_id, value } = req.body; 
      try {
        const game = await Game.findByPk(game_id);
        if (!game) {
          return res.status(404).send({ message: "Game not found." });
        }
    
        const newNote = await Note.create({ value });
    
        await game.update({ note_id: newNote.id });
    
        const updatedGameWithNote = await Game.findByPk(game_id, {
          include: [{ model: Note, as: 'note' }]
        });
    
        res.json(updatedGameWithNote);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    },
  
    async getGameStatus(req, res) {
      try {
        const gameId = req.params.gameId;
        const gameWithStatus = await Game.findByPk(gameId, {
          include: [{
            model: Status,
            as: 'status',
          }], 
        });
    
        if (!gameWithStatus) {
          return res.status(404).json({ message: 'Partie non trouvée' });
        }
    
        res.json(gameWithStatus);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Erreur serveur interne' });
      }
    },
  

    async addStatusToGame(req, res) {
      const { game_id, status_id } = req.body; 
    
      try {
        const game = await Game.findByPk(game_id);
        if (!game) {
          return res.status(404).send({ message: "Game not found." });
        }
    
        const status = await Status.findByPk(status_id);
        if (!status) {
          return res.status(404).send({ message: "Status not found." });
        }
    
        await game.update({ status_id });
    
        const updatedGameWithStatus = await Game.findByPk(game_id, {
          include: [{ model: Status, as: 'status' }]
        });
    
        res.json(updatedGameWithStatus);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    },
    
    
    async getGameCharacters(req, res) {
      try {
        const gameId = req.params.gameId;
        const gameWithCharacters = await Game.findByPk(gameId, {
          include: [{
            model: Character,
            as: 'characters',
            include: [{
              model: User, 
              as: 'user',
              attributes: ['pseudo'], 
            }],
          }],
        });
    
        if (!gameWithCharacters) {
         res.status(404).json({ message: 'Partie non trouvée' });
        }
        else {
          res.json(gameWithCharacters);
        }
          } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Erreur serveur interne' });
      }
    },
  
    async getGameUser(req, res) {
      try {
        const gameId = req.params.gameId;
        const gameWithUser = await Game.findByPk(gameId, {
          include: [{
            model: User,
            as: 'user',
            attributes: ['id', 'pseudo']
          }],
        });

        if (!gameWithUser) {
         res.status(404).json({ message: 'Partie non trouvée' });
        } else {
          res.json(gameWithUser);
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Erreur serveur interne' });
      }
    }
  };
  
  export default gameController;
  