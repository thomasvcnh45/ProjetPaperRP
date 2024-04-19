import { Model, DataTypes } from 'sequelize';
import sequelize from './client.js';

class Status extends Model {}

Status.init({
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Status',
  tableName: 'status',
});

export default Status;
