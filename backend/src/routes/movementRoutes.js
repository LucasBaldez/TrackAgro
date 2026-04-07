const express = require('express');
const router = express.Router();
const { getMovementsByAnimal, createMovement } = require('../controllers/movementController');
const { protect } = require('../middleware/auth');

router.get('/animal/:animalId', protect, getMovementsByAnimal);
router.post('/', protect, createMovement);

module.exports = router;
