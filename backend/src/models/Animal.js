const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Animal = sequelize.define('Animal', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  idUnique: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  earringNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  birthDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  sex: {
    type: DataTypes.ENUM('Macho', 'Fêmea', 'M', 'F'),
    allowNull: false,
  },
  breed: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  currentWeight: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('Ativo', 'Vendido', 'Morto'),
    defaultValue: 'Ativo',
  },
  photo: {
    type: DataTypes.STRING,
  },
});

module.exports = Animal;
