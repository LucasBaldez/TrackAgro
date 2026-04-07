const { Reproduction } = require('../models');

const getReproductionByAnimal = async (req, res) => {
  try {
    const repro = await Reproduction.findAll({ 
      where: { animalId: req.params.animalId },
      order: [['date', 'DESC']]
    });
    res.json(repro);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createReproduction = async (req, res) => {
  try {
    const repro = await Reproduction.create({ ...req.body });
    res.status(201).json(repro);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getReproductionByAnimal, createReproduction };
