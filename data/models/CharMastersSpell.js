import { Model, DataTypes } from 'sequelize';
import sequelize from './client.js';

class CharMasterSpell extends Model {}

CharMasterSpell.init({
  char_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Character',
      key: 'id',
    },
  },
  spell_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Spell',
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'CharMasterSpell',
  tableName: 'char_masters_spell',
});

export default CharMasterSpell;