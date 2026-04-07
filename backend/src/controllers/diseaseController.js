const { Disease } = require('../models');

const getDiseasesByAnimal = async (req, res) => {
  try {
    const diseases = await Disease.findAll({ 
      where: { animalId: req.params.animalId },
      order: [['diagnosisDate', 'DESC']]
    });
    res.json(diseases);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createDisease = async (req, res) => {
  try {
    const disease = await Disease.create({ ...req.body });
    res.status(201).json(disease);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getDiseasesByAnimal, createDisease };
