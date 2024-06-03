const express = require('express');
const router = express.Router();

const contatoController = require('../controllers/contatoController');

router.post('/contatos', contatoController.addContato);
router.put('/contatos', contatoController.updateContato);
router.delete('/contatos', contatoController.deleteContato);
router.get('/contatos/:id', contatoController.getContatoById);
router.get('/contatos/:email', contatoController.getContatoByEmail);
router.get('/contatos', contatoController.getContato);



module.exports = router;