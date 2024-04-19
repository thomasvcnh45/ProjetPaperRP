import { Model, DataTypes } from 'sequelize';
import sequelize from './client.js';

class Class extends Model {}

Class.init({
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  note: {
    type: DataTypes.TEXT,
    allowNull: true, 
  },
}, {
  sequelize,
  modelName: 'Class',
  tableName: 'class',
});

export default Class;
