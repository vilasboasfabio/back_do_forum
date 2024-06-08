//Importa o módulo 'express' para criar rotas;
const express = require('express');
//Cria um objeto de rota do express;
const router = express.Router();

//Importa as funcões do controllers;
const {addFavorite, getFavorites, removeFavorite} = require('../controllers/favoritosController')
//Importa o middleware de autenticação de token;
const authenticateToken = require('../middleware/authMiddleware')

//Define as rotas;
router.post('/favorites', authenticateToken, addFavorite);
router.get('/favorites', authenticateToken, getFavorites);
router.delete('/favorites', authenticateToken, removeFavorite);

//Exporta o router para ser utilizado em outras partes da aplicação;
module.exports = router;