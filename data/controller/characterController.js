import { Character, Skill, Spell, User, Inventory, Class, Stat, CharPossessesInventory, Game, CharHasStat } from '../models/index.js';
import generateController from './generateController.js';
import { z } from 'zod';

const characterSchema = z.object({
    name: z.string().min(1).optional(),
    experience: z.number().int().optional(),
    level: z.number().int().optional(),
    health: z.number().int().optional(),
    note: z.string().min().optional(),
    background: z.string().min().optional(),
    user_id: z.number().int(),
    game_id: z.number().int(),
  });


const characterControllerGenerique = generateController(Character, characterSchema);


const characterController = {
    ...characterControllerGenerique,
    
    async addSkillToCharacter(req, res) {
      const { char_id, skill_id } = req.body;
      try {
        const character = await Character.findByPk(char_id);
        const skill = await Skill.findByPk(skill_id);
  
        if (!character || !skill) {
          return res.status(404).send({ message: "Character or Skill not found." });
        }
  
        await character.addSkill(skill);
  
        const updatedCharacter = await Character.findByPk(char_id, {
          include: ['skills', 'spells', 'inventories', 'classes', 'stats'], 
        });
  
        res.json(updatedCharacter);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    },
  
    async removeSkillFromCharacter(req, res) {
      const { char_id, skill_id } = req.body;
      try {
        const character = await Character.findByPk(char_id);
        const skill = await Skill.findByPk(skill_id);
    
        if (!character || !skill) {
          return res.status(404).send({ message: "Character or Skill not found." });
        }
    
        await character.removeSkill(skill);
    
        const updatedCharacter = await Character.findByPk(char_id, {
          include: ['skills', 'spells', 'inventories', 'classes', 'stats'],
        });
    
        res.json(updatedCharacter);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    },

    async assignCharacterToUser(req, res) {
      const { user_id, char_id } = req.body;
      try {
        const user = await User.findByPk(user_id);
        const character = await Character.findByPk(char_id);
    
        if (!user) {
          return res.status(404).send({ message: "User not found." });
        }
        if (!character) {
          return res.status(404).send({ message: "Character not found." });
        }
    
        await character.update({ user_id });
    
        const updatedCharacter = await Character.findByPk(char_id, {
          include: [{
            model: User,
            as: 'user',
            attributes: ['id', 'pseudo'],
          }],
        });
    
        res.json(updatedCharacter);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    },
 
    async assignClassToCharacter(req, res) {
      const { char_id, class_id } = req.body; 
      try {
        const character = await Character.findByPk(char_id);
        const classInstance = await Class.findByPk(class_id);
    
        if (!character) {
          return res.status(404).send({ message: "Character not found." });
        }
        if (!classInstance) {
          return res.status(404).send({ message: "Class not found." });
        }
    
        await character.addClass(classInstance);
    
        const updatedCharacter = await Character.findByPk(char_id, {
          include: ['classes', 'skills', 'spells', 'inventories', 'stats'],
        });
    
        res.json(updatedCharacter);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    },
      
    async removeClassFromCharacter(req, res) {
      const { char_id, class_id } = req.body; 
      try {
        const character = await Character.findByPk(char_id);
        const classInstance = await Class.findByPk(class_id);
    
        if (!character) {
          return res.status(404).send({ message: "Character not found." });
        }
        if (!classInstance) {
          return res.status(404).send({ message: "Class not found." });
        }
    
        await character.removeClass(classInstance);
    
        const updatedCharacter = await Character.findByPk(char_id, {
          include: ['classes', 'skills', 'spells', 'inventories', 'stats'],
        });
    
        res.json(updatedCharacter);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    },

    async assignItemToCharacter(req, res) {
      const { char_id, inventory_id } = req.body;
      try {
        const character = await Character.findByPk(char_id);
        const inventory = await Inventory.findByPk(inventory_id);
    
        if (!character || !inventory) {
          return res.status(404).send({ message: "Character or Inventory not found." });
        }
        await CharPossessesInventory.upsert({
          char_id,
          inventory_id,
          is_equipped: false
        });
    
        const updatedCharacter = await Character.findByPk(char_id, {
          include: ['inventories']
        });
    
        res.json(updatedCharacter);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    },
      
    async removeItemFromCharacter(req, res) {
      const { char_id, inventory_id } = req.body;
      try {
        const charInventory = await CharPossessesInventory.findOne({
          where: { char_id, inventory_id }
        });
    
        if (!charInventory) {
          return res.status(404).send({ message: "Character Inventory association not found." });
        }
    
        await charInventory.update({ is_equipped: false });
    
        const updatedCharacter = await Character.findByPk(char_id, {
          include: ['inventories']
        });
    
        res.json(updatedCharacter);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    },

    async deleteInventoryFromCharacter(req, res) {
      const { char_id, inventory_id } = req.body;
      try {
        const charInventory = await CharPossessesInventory.findOne({
          where: { char_id, inventory_id }
        });
    
        if (!charInventory) {
          return res.status(404).send({ message: "Character Inventory association not found." });
        }
    
        await charInventory.destroy();
    
        const updatedCharacter = await Character.findByPk(char_id, {
          include: ['inventories'] 
        });
    
        res.json(updatedCharacter);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    },

    async toggleItemEquippedStatus(req, res) {
      const { char_id, inventory_id } = req.body;
      try {
        const charInventory = await CharPossessesInventory.findOne({
          where: { char_id, inventory_id }
        });
    
        if (!charInventory) {
          return res.status(404).send({ message: "Character Inventory association not found." });
        }
    
        const newEquippedStatus = !charInventory.is_equipped;
        await charInventory.update({ is_equipped: newEquippedStatus });
    
        const updatedCharacter = await Character.findByPk(char_id, {
          include: [{
            model: Inventory,
            as: 'inventories',
            through: {
              attributes: ['is_equipped']
            }
          }]
        });
    
        res.json(updatedCharacter);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    },

      async assignSpellToCharacter(req, res) {
        const { char_id, spell_id } = req.body;
        try {
          const character = await Character.findByPk(char_id);
          const spell = await Spell.findByPk(spell_id);
      
          if (!character) {
            return res.status(404).send({ message: "Character not found." });
          }
          if (!spell) {
            return res.status(404).send({ message: "Spell not found." });
          }
      
          await character.addSpell(spell);
      
          const updatedCharacter = await Character.findByPk(char_id, {
            include: ['skills', 'spells', 'inventories', 'classes', 'stats'],
          });
      
          res.json(updatedCharacter);
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
      },
      
      async removeSpellFromCharacter(req, res) {
        const { char_id, spell_id } = req.body;
        try {
          const character = await Character.findByPk(char_id);
          const spell = await Spell.findByPk(spell_id);
      
          if (!character) {
            return res.status(404).send({ message: "Character not found." });
          }
          if (!spell) {
            return res.status(404).send({ message: "Spell not found." });
          }
      
          await character.removeSpell(spell);
      
          const updatedCharacter = await Character.findByPk(char_id, {
            include: ['skills', 'spells', 'inventories', 'classes', 'stats'],
          });
      
          res.json(updatedCharacter);
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
      },
      
      async assignStatToCharacter(req, res) {
        const { char_id, stat_id, value } = req.body;
        try {
          const existingEntry = await CharHasStat.findOne({ where: { char_id, stat_id } });
          if (existingEntry) {
            existingEntry.value = value;
            await existingEntry.save();
          } else {
            await CharHasStat.create({ char_id, stat_id, value });
          }
          const updatedCharacter = await Character.findByPk(char_id, {
            include: [{
              association: 'stats',
              through: {
                attributes: ['value'], 
              },
            }, 'skills', 'spells', 'inventories', 'classes'],
          });
          res.json(updatedCharacter);
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
      },
      
      
      async removeStatFromCharacter(req, res) {
        const { char_id, stat_id } = req.body;
        try {
          const characterExists = await Character.findByPk(char_id);
          const statExists = await Stat.findByPk(stat_id);
      
          if (!characterExists) {
            return res.status(404).send({ message: "Character not found." });
          }
          if (!statExists) {
            return res.status(404).send({ message: "Stat not found." });
          }
                await CharHasStat.destroy({
            where: {
              char_id: char_id,
              stat_id: stat_id
            }
          });
                const updatedCharacter = await Character.findByPk(char_id, {
            include: ['skills', 'spells', 'inventories', 'classes', 'stats'],
          });
      
          res.json(updatedCharacter);
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
      },
    
      async getCharactersWithAll(req, res) {
        try {
          const characters = await Character.scope('withAll').findAll();
          res.json(characters);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Erreur serveur interne' });
        }
      },

      async getCharacterWithAllById(req, res) {
        try {
            const { characterId } = req.params;
            const character = await Character.scope('withAll').findByPk(characterId);
    
            if (!character) {
                return res.status(404).json({ message: 'Personnage non trouvé.' });
            }
    
            res.json(character);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erreur serveur interne' });
        }
    },

    async getCharacterWithGameAndUserById(req, res) {
      try {
          const { characterId } = req.params; 
  
          const character = await Character.findByPk(characterId, {
              include: [
                  {
                      model: Game,
                      as: 'game', 
                  },
                  {
                      model: User,
                      as: 'user',
                      attributes: ['id', 'pseudo'], 
                  },
              ]
          });
          if (!character) {
              return res.status(404).json({ message: 'Personnage non trouvé.' });
          }
  
          res.json(character);
      } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Erreur serveur interne.' });
      }
    },  

    async getCharactersByUserId(req, res) {
      try {
          const userId = req.params.userId;
          const characters = await Character.findAll({
              where: { user_id: userId },
              include: [{
                  model: Game,
                  as: 'game', 
              }]
          });
  
          if (!characters || characters.length === 0) {
              return res.status(404).json({ message: 'Aucun personnage trouvé pour cet utilisateur.' });
          }
  
          res.json(characters);
      } catch (error) {
          console.log(error);
          res.status(500).json({ message: 'Erreur serveur interne' });
      }
  }
  
  };
  
  export default characterController;
  