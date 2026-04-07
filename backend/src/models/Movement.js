const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Movement = sequelize.define('Movement', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  type: {
    type: DataTypes.ENUM('Entrada', 'Saída', 'Venda', 'Compra', 'Transferência'),
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  fromPaddock: {
    type: DataTypes.STRING,
  },
  toPaddock: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.FLOAT,
  },
  observations: {
    type: DataTypes.TEXT,
  },
});

module.exports = Movement;
