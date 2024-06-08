//Importa o módulo 'express' para criar rotas;
const express = require('express');
//Cria um objeto de rota do express;
const router = express.Router();

//Importa as funcões do controllers;
const contatoController = require('../controllers/contatoController');

//Define as rotas;
router.post('/contatos', contatoController.addContato);
router.put('/contatos', contatoController.updateContato);
router.delete('/contatos', contatoController.deleteContato);
router.get('/contatos/:id', contatoController.getContatoById);
router.get('/contatos/:email', contatoController.getContatoByEmail);
router.get('/contatos', contatoController.getContato);

//Exporta o router para ser utilizado em outras partes da aplicação;
module.exports = router;