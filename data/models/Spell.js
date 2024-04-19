import { Model, DataTypes } from 'sequelize';
import sequelize from './client.js';

class Spell extends Model {}

Spell.init({
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
  modelName: 'Spell',
  tableName: 'spell',
});

export default Spell;
