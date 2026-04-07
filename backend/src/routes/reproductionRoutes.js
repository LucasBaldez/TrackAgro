const express = require('express');
const router = express.Router();
const { getReproductionByAnimal, createReproduction } = require('../controllers/reproductionController');
const { protect } = require('../middleware/auth');

router.get('/animal/:animalId', protect, getReproductionByAnimal);
router.post('/', protect, createReproduction);

module.exports = router;
