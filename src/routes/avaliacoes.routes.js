const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const { addReview, getReviewsByRestaurant } = require('../controllers/avaliacoesController');

// Rota para adicionar uma nova avaliação
router.post('/review', authenticateToken, addReview);

// Rota para obter todas as avaliações de um restaurante específico
router.get('/reviews/:restaurantId', getReviewsByRestaurant);

module.exports = router;