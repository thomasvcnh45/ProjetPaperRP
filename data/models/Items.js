import { Model, DataTypes } from 'sequelize';
import sequelize from './client.js';

class Inventory extends Model {}

Inventory.init({
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
  modelName: 'Inventory',
  tableName: 'inventory',
});

export default Inventory;
