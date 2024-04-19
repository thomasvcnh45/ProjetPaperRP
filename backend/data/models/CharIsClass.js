import { Model, DataTypes } from 'sequelize';
import sequelize from './client.js';

class CharIsClass extends Model {}

CharIsClass.init({
  char_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Character', 
      key: 'id',
    },
  },
  class_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Class',
      key: 'id',
    },
  },
},{ 
  sequelize, 
  modelName: 'CharIsClass', 
  tableName: 'char_is_class' 
});

export default CharIsClass;