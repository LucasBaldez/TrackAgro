const express = require('express');
const router = express.Router();
const { getVaccinesByAnimal, createVaccine } = require('../controllers/vaccineController');
const { protect } = require('../middleware/auth');

router.get('/animal/:animalId', protect, getVaccinesByAnimal);
router.post('/', protect, createVaccine);

module.exports = router;
