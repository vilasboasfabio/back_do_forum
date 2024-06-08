//Importa o módulo 'express' para criar rotas;
const express = require('express');
//Cria um objeto de rota do express;
const router = express.Router();

//Importa a função do controllers;
const { loginUser } = require('../controllers/loginController');

// Rota para login
router.post('/login', loginUser);

//Exporta o router para ser utilizado em outras partes da aplicação;
module.exports = router;