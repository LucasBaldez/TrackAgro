const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Vaccine = sequelize.define('Vaccine', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  applicationDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  nextDose: {
    type: DataTypes.DATE,
  },
  batch: {
    type: DataTypes.STRING,
  },
  dosage: {
    type: DataTypes.STRING, // e.g., "5ml", "2cc"
  },
  route: {
    type: DataTypes.STRING,
    defaultValue: 'Subcutânea',
  },
  manufacturer: {
    type: DataTypes.STRING,
  },
  expiryDate: {
    type: DataTypes.DATE,
  },
  veterinarian: {
    type: DataTypes.STRING,
  },
  observations: {
    type: DataTypes.TEXT,
  },
});

module.exports = Vaccine;
