import { Model, DataTypes } from 'sequelize';
import sequelize from './client.js';

class Note extends Model {}

Note.init({
  value: {
    type: DataTypes.TEXT,
    allowNull: false, 
  },
}, {
  sequelize,
  modelName: 'Note',
  tableName: 'note',
 
});

export default Note;
