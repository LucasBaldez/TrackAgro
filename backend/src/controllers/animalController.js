const { Animal } = require('../models');
const multer = require('multer');
const path = require('path');

// Multer Config
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  fileFilter(req, file, cb) {
    const filetypes = /jpg|jpeg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb('Apenas imagens!');
    }
  },
});

const getAnimals = async (req, res) => {
  try {
    const animals = await Animal.findAll();
    res.json(animals.map(a => ({ ...a.get(), _id: a.id })));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAnimalById = async (req, res) => {
  try {
    const animal = await Animal.findByPk(req.params.id);
    if (animal) {
      res.json({ ...animal.get(), _id: animal.id });
    } else {
      res.status(404).json({ message: 'Animal não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createAnimal = async (req, res) => {
  try {
    const { idUnique, name, earringNumber, birthDate, sex, breed, currentWeight } = req.body;
    const photo = req.file ? `/uploads/${req.file.filename}` : '';

    const animal = await Animal.create({
      idUnique,
      name,
      earringNumber,
      birthDate,
      sex,
      breed,
      currentWeight,
      photo,
      ownerId: req.user.id,
    });

    res.status(201).json({ ...animal.get(), _id: animal.id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateAnimal = async (req, res) => {
  try {
    const animal = await Animal.findByPk(req.params.id);

    if (animal) {
      animal.name = req.body.name || animal.name;
      animal.earringNumber = req.body.earringNumber || animal.earringNumber;
      animal.birthDate = req.body.birthDate || animal.birthDate;
      animal.sex = req.body.sex || animal.sex;
      animal.breed = req.body.breed || animal.breed;
      animal.currentWeight = req.body.currentWeight || animal.currentWeight;
      animal.status = req.body.status || animal.status;

      if (req.file) {
        animal.photo = `/uploads/${req.file.filename}`;
      }

      await animal.save();
      res.json({ ...animal.get(), _id: animal.id });
    } else {
      res.status(404).json({ message: 'Animal não encontrado' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteAnimal = async (req, res) => {
  try {
    const animal = await Animal.findByPk(req.params.id);
    if (animal) {
      await animal.destroy();
      res.json({ message: 'Animal removido' });
    } else {
      res.status(404).json({ message: 'Animal não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAnimals, getAnimalById, createAnimal, updateAnimal, deleteAnimal, upload };
