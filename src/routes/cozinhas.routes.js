//Importa o módulo 'express' para criar rotas;
const express = require('express');
//Cria um objeto de rota do express;
const router = express.Router();

//Importa as funcões do controllers;
const cuisineTypeController = require('../controllers/cozinhaController'); // Ajuste o caminho conforme a estrutura do seu projeto

//Define as rotas;
router.post('/cuisine-types', cuisineTypeController.addCuisineType);
router.get('/cuisine-types', cuisineTypeController.getCuisineTypes);
router.put('/cuisine-types/:id', cuisineTypeController.updateCuisineType);
router.delete('/cuisine-types/:id', cuisineTypeController.deleteCuisineType);

//Exporta o router para ser utilizado em outras partes da aplicação;
module.exports = router;
