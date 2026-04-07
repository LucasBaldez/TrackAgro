const { Disease } = require('../models');

const getDiseasesByAnimal = async (req, res) => {
  try {
    const diseases = await Disease.findAll({ 
      where: { animalId: req.params.animalId },
      order: [['diagnosisDate', 'DESC']]
    });
    res.json(diseases.map(d => ({ ...d.get(), _id: d.id })));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createDisease = async (req, res) => {
  try {
    const { 
      type, 
      diagnosisDate, 
      treatment, 
      medication, 
      dosage, 
      route, 
      vet, 
      status, 
      observations, 
      animalId 
    } = req.body;

    const disease = await Disease.create({
      type,
      diagnosisDate,
      treatment,
      medication,
      dosage,
      route,
      vet,
      status,
      observations,
      animalId,
    });

    res.status(201).json({ ...disease.get(), _id: disease.id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteDisease = async (req, res) => {
  try {
    const disease = await Disease.findByPk(req.params.id);
    if (disease) {
      await disease.destroy();
      res.json({ message: 'Registro clínico removido' });
    } else {
      res.status(404).json({ message: 'Registro não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDiseasesByAnimal, createDisease, deleteDisease };
