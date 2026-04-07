const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Disease = sequelize.define('Disease', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  type: {
    type: DataTypes.STRING, // e.g., "Mastite", "Tristeza Parasitária"
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
  dosage: {
    type: DataTypes.STRING,
  },
  route: {
    type: DataTypes.STRING,
    defaultValue: 'Intramuscular',
  },
  vet: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'Em tratamento',
  },
  observations: {
    type: DataTypes.TEXT,
  },
});

module.exports = Disease;
