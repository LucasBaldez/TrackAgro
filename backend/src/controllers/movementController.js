const { Movement } = require('../models');

const getMovementsByAnimal = async (req, res) => {
  try {
    const movements = await Movement.findAll({ 
      where: { animalId: req.params.animalId },
      order: [['date', 'DESC']]
    });
    res.json(movements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createMovement = async (req, res) => {
  try {
    const movement = await Movement.create({ ...req.body });
    res.status(201).json(movement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getMovementsByAnimal, createMovement };
