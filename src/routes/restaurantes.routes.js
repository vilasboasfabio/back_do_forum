//Importa o módulo 'express' para criar rotas;
const express = require('express');
//Cria um objeto de rota do express;
const router = express.Router();
//Importa as funcões do controllers;
const restaurantController = require('../controllers/restaurantesController'); // Ajuste o caminho conforme a estrutura do seu projeto

//Importa o middleware de upload de arquivos;
const upload = require('../config/multer');
//Importa as rotas relacionadas aos tipos de cozinha;
const cuisineTypeRoutes = require('./cozinhas.routes');

//Define as rotas;
router.post('/restaurants', upload.fields([{name: 'photos', maxCount: 10 }]), restaurantController.addRestaurant);
router.get('/restaurants', restaurantController.getRestaurants);
router.put('/restaurants/:id', upload.fields([{ name: 'photos', maxCount: 10 }]), restaurantController.updateRestaurant);
router.delete('/restaurants/:id', restaurantController.deleteRestaurant);
router.get('/restaurants/:id', restaurantController.getRestaurantById);

//Utiliza as rotas relacionadas aos tipos de cozinha;
router.use(cuisineTypeRoutes);

//Exporta o router para ser utilizado em outras partes da aplicação;
module.exports = router;
