const { Vaccine } = require('../models');

const getVaccinesByAnimal = async (req, res) => {
  try {
    const vaccines = await Vaccine.findAll({ 
      where: { animalId: req.params.animalId },
      order: [['applicationDate', 'DESC']]
    });
    res.json(vaccines.map(v => ({ ...v.get(), _id: v.id })));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createVaccine = async (req, res) => {
  try {
    const { 
      name, 
      applicationDate, 
      nextDose, 
      batch, 
      dosage, 
      route, 
      manufacturer, 
      expiryDate, 
      veterinarian, 
      observations, 
      animalId 
    } = req.body;

    const vaccine = await Vaccine.create({
      name,
      applicationDate,
      nextDose,
      batch,
      dosage,
      route,
      manufacturer,
      expiryDate,
      veterinarian,
      observations,
      animalId,
    });

    res.status(201).json({ ...vaccine.get(), _id: vaccine.id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteVaccine = async (req, res) => {
  try {
    const vaccine = await Vaccine.findByPk(req.params.id);
    if (vaccine) {
      await vaccine.destroy();
      res.json({ message: 'Vacina removida' });
    } else {
      res.status(404).json({ message: 'Vacina não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getVaccinesByAnimal, createVaccine, deleteVaccine };
