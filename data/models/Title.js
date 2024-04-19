import { Model, DataTypes } from 'sequelize';
import sequelize from './client.js';

class Title extends Model {}

Title.init({
  p1: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  p2: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  p3: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'Title',
  tableName: 'title',
});

export default Title;
