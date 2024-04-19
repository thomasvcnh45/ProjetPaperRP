import { Model, DataTypes } from 'sequelize';
import sequelize from './client.js';

class Stat extends Model {}

Stat.init({
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Stat',
  tableName: 'stat',
});

export default Stat;
