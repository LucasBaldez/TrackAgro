const express = require('express');
const router = express.Router();
const { getAnimals, getAnimalById, createAnimal, updateAnimal, deleteAnimal, upload } = require('../controllers/animalController');
const { protect, admin } = require('../middleware/auth');

router.route('/')
  .get(protect, getAnimals)
  .post(protect, upload.single('photo'), createAnimal);

router.route('/:id')
  .get(protect, getAnimalById)
  .put(protect, upload.single('photo'), updateAnimal)
  .delete(protect, admin, deleteAnimal);

module.exports = router;
