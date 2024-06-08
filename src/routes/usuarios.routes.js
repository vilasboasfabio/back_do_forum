//Importa o módulo 'express' para criar rotas;
const express = require('express');
//Cria um objeto de rota do express;
const router = express.Router();

//Importa as funcões do controllers;
const usuariosController = require('../controllers/usuariosController');

//Define as rotas;
router.post('/usuarios', usuariosController.addUser);
router.get('/usuarios', usuariosController.getUsers);
router.put('/usuarios/:id', usuariosController.updateUser);
router.delete('/usuarios/:id', usuariosController.deleteUser);
router.get('/usuarios/:id', usuariosController.getUserById);
router.get('/usuarios/email/:email', usuariosController.getUserByEmail);
router.get('/usuarios/type/:type', usuariosController.getUserByType);
router.get('/usuarios/name/:name', usuariosController.getUserByName);

//Exporta o router para ser utilizado em outras partes da aplicação;
module.exports = router;
