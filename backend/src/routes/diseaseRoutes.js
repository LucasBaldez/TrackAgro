const express = require('express');
const router = express.Router();
const { getDiseasesByAnimal, createDisease } = require('../controllers/diseaseController');
const { protect } = require('../middleware/auth');

router.get('/animal/:animalId', protect, getDiseasesByAnimal);
router.post('/', protect, createDisease);

module.exports = router;
