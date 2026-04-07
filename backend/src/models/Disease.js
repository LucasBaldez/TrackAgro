const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Disease = sequelize.define('Disease', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  diagnosisDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  treatment: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  medication: {
    type: DataTypes.STRING,
  },
  vet: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.ENUM('Em tratamento', 'Curado', 'Crítico'),
    defaultValue: 'Em tratamento',
  },
});

module.exports = Disease;
