const { Movement } = require('../models');

const getMovementsByAnimal = async (req, res) => {
  try {
    const movements = await Movement.findAll({ 
      where: { animalId: req.params.animalId },
      order: [['date', 'DESC']]
    });
    res.json(movements.map(m => ({ ...m.get(), _id: m.id })));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createMovement = async (req, res) => {
  try {
    const movement = await Movement.create({ ...req.body });
    res.status(201).json({ ...movement.get(), _id: movement.id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteMovement = async (req, res) => {
  try {
    const movement = await Movement.findByPk(req.params.id);
    if (movement) {
      await movement.destroy();
      res.json({ message: 'Registro de movimentação removido' });
    } else {
      res.status(404).json({ message: 'Registro não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getMovementsByAnimal, createMovement, deleteMovement };
