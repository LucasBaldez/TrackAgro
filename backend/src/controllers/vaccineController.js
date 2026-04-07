const { Vaccine } = require('../models');

const getVaccinesByAnimal = async (req, res) => {
  try {
    const vaccines = await Vaccine.findAll({ 
      where: { animalId: req.params.animalId },
      order: [['applicationDate', 'DESC']]
    });
    res.json(vaccines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createVaccine = async (req, res) => {
  try {
    const { name, applicationDate, nextDose, batch, observations, animalId } = req.body;
    const vaccine = await Vaccine.create({
      name,
      applicationDate,
      nextDose,
      batch,
      observations,
      animalId,
    });
    res.status(201).json(vaccine);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getVaccinesByAnimal, createVaccine };
