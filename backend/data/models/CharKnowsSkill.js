import { Model, DataTypes } from 'sequelize';
import sequelize from './client.js';

class CharKnowsSkill extends Model {}

CharKnowsSkill.init({
  char_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Character', 
      key: 'id',
    },
  },
  skill_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Skill',
      key: 'id',
    },
  },
},{ 
  sequelize, 
  modelName: 'CharKnowsSkill', 
  tableName: 'char_knows_skill' 
});

export default CharKnowsSkill;