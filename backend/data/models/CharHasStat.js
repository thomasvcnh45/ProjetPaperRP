import { Model, DataTypes } from 'sequelize';
import sequelize from './client.js';

class CharHasStat extends Model {}

CharHasStat.init({
  char_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Character',
      key: 'id',
    },
  },
  stat_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Stat',
      key: 'id',
    },
  },
  value: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'CharHasStat',
  tableName: 'char_has_stat',
});

export default CharHasStat;