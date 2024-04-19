import { Model, DataTypes } from 'sequelize';
import Stat from './Stat.js';
import sequelize from './client.js';

class Character extends Model {}

Character.init({
  name: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: "Pitié donnes moi un nom",
  },
  experience: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  level: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 1,
  },
  health: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 100, 
  },
  background: {
    type: DataTypes.TEXT,
    allowNull:true,
    defaultValue: ""
  },
  note: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: ""
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  game_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Character',
  tableName: 'character',

  scopes: {
    withStats: {
      include: [{
        association: 'stats',
        through: {
          attributes: ['value'], 
        },
        attributes: ['id', 'name'], 
      }],
    },
    withClasses: {
      include: [{
        association: 'classes', 
      }],
    },
    withSkills: {
      include: [{
        association: 'skills', 
      }],
    },
    withSpells: {
      include: [{
        association: 'spells', 
      }],
    },
    withInventories: {
      include: [{
        association: 'inventories',
        through: {
          where: { is_equipped: true },
        },
      }],
    },
    withAll: {
      include: [
        {
          model: Stat,
          as: 'stats',
          through: {
            attributes: ['value'],
          },
        },
        'classes', 
        'skills',
        'spells',
        'inventories'
      ]
    }
  },
});

export default Character;
