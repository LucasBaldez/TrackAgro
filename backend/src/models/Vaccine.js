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
  observations: {
    type: DataTypes.TEXT,
  },
});

module.exports = Vaccine;
