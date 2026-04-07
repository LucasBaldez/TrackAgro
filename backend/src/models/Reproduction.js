const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Reproduction = sequelize.define('Reproduction', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  type: {
    type: DataTypes.ENUM('Cobertura', 'Inseminação'),
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  bullOrSemen: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pregnancyStatus: {
    type: DataTypes.ENUM('Pendente', 'Prenhez Confirmada', 'Vazia'),
    defaultValue: 'Pendente',
  },
  expectedBirthDate: {
    type: DataTypes.DATE,
  },
});

module.exports = Reproduction;
