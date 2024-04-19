import User from './User.js'
import Character from './Character.js';
import Stat from './Stat.js'
import Class from './Class.js'
import Skill from './Skill.js'
import Spell from './Spell.js'
import Inventory from './Items.js'
import Status from './Statu.js';
import Note from './Note.js';
import Game from './Game.js'
import Title from './Title.js';
import CharHasStat from './CharHasStat.js';
import CharIsClass from './CharIsClass.js';
import CharKnowsSkill from './CharKnowsSkill.js';
import CharMasterSpell from './CharMastersSpell.js';
import CharPossessesInventory from './CharPossessesInventory.js';
import sequelize from './client.js';



User.hasMany(Character, { foreignKey: 'user_id', as: 'characters' });
User.hasMany(Game, { foreignKey: 'user_id', as: 'games' });


Character.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Character.belongsTo(Game, { foreignKey: 'game_id', as: 'game' });
Character.belongsToMany(Stat, { through: 'char_has_stat', foreignKey: 'char_id', otherKey: 'stat_id', as: 'stats' });
Character.belongsToMany(Class, { through: 'char_is_class', foreignKey: 'char_id', otherKey: 'class_id', as: 'classes' });
Character.belongsToMany(Skill, { through: 'char_knows_skill', foreignKey: 'char_id', otherKey: 'skill_id', as: 'skills' });
Character.belongsToMany(Spell, { through: 'char_masters_spell', foreignKey: 'char_id', otherKey: 'spell_id', as: 'spells' });

Character.belongsToMany(Inventory, { through: CharPossessesInventory, as: 'inventories',foreignKey: 'char_id',otherKey: 'inventory_id'});
Inventory.belongsToMany(Character, { through: CharPossessesInventory, foreignKey: 'inventory_id', otherKey: 'char_id',as: 'characters' });

CharPossessesInventory.belongsTo(Character, { foreignKey: 'char_id' });
CharPossessesInventory.belongsTo(Inventory, { foreignKey: 'inventory_id' });

Stat.belongsToMany(Character, { through: CharHasStat, foreignKey: 'stat_id', otherKey: 'char_id', as: 'charactersWithStats' });

CharHasStat.belongsTo(Character, { foreignKey: 'char_id' });
CharHasStat.belongsTo(Stat, { foreignKey: 'stat_id' });

Game.belongsTo(Status, { foreignKey: 'status_id', as: 'status' });
Game.belongsTo(Note, { foreignKey: 'note_id', as: 'note' });
Game.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Game.hasMany(Character, { foreignKey: 'game_id', as: 'characters' });

Status.hasMany(Game, { foreignKey: 'status_id', as: 'games' });



export {
  sequelize,
  User,
  Character,
  Stat,
  Class,
  Skill,
  Spell,
  Inventory,
  Status,
  Note,
  Game,
  CharPossessesInventory,
  CharKnowsSkill,
  CharMasterSpell,
  CharIsClass,
  CharHasStat,
  Title
};
