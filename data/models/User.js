import { Model, DataTypes } from 'sequelize';
import sequelize from './client.js';

class User extends Model {}

User.init({
  pseudo: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique:true,
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  refreshToken: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  sequelize,
  modelName: 'user',
  tableName: 'user', 
  scopes: {
    withCharacters: {
      include: [{
        association: 'characters', 
      }],
    },
    withGames: {
      include: [{
        association: 'games', 
      }],
    },
    withCharactersAndGames: {
      include: [
        { association: 'characters' },
        { association: 'games' },
      ],
    },
  },
});

export default User;
