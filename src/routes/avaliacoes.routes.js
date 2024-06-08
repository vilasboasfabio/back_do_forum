//Importa o módulo 'express' para criar rotas;
const express = require('express');

//Cria um objeto de rota do express;
const router = express.Router();

//Importa o middleware de autenticação de token;
const authenticateToken = require('../middleware/authMiddleware');

//Importa o controllers;
const { addReview, getReviewsByRestaurant } = require('../controllers/avaliacoesController');

// Rota para adicionar uma nova avaliação
router.post('/review', authenticateToken, addReview);

// Rota para obter todas as avaliações de um restaurante específico
router.get('/reviews/:restaurantId', getReviewsByRestaurant);

//Exporta o router para ser utilizado em outras partes da aplicação;
module.exports = router;