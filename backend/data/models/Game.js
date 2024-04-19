import { Model, DataTypes } from 'sequelize';
import sequelize from './client.js';

class Game extends Model {}

Game.init({
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: "Une nouvelle aventure vous attend",
  },
  campaign: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 1,
  },
  note_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Game',
  tableName: 'game',
  scopes: {
    withStatus: {
      include: [{
        association: 'status', 
      }],
    },
    withCharacters: {
      include: [{
        association: 'characters', 
      }],
    },
    withNotes: {
      include: [{
        association: 'note',
      }],
    },
    withUsers: {
      include: [{
        association: 'user',
      }],
    },
  },
});

export default Game;
