const { Reproduction } = require('../models');

const getReproductionByAnimal = async (req, res) => {
  try {
    const repro = await Reproduction.findAll({ 
      where: { animalId: req.params.animalId },
      order: [['date', 'DESC']]
    });
    res.json(repro.map(r => ({ ...r.get(), _id: r.id })));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createReproduction = async (req, res) => {
  try {
    const repro = await Reproduction.create({ ...req.body });
    res.status(201).json({ ...repro.get(), _id: repro.id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteReproduction = async (req, res) => {
  try {
    const repro = await Reproduction.findByPk(req.params.id);
    if (repro) {
      await repro.destroy();
      res.json({ message: 'Registro reprodutivo removido' });
    } else {
      res.status(404).json({ message: 'Registro não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getReproductionByAnimal, createReproduction, deleteReproduction };
