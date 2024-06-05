const express = require('express');
const router = express.Router();

const usuariosController = require('../controllers/usuariosController');

router.post('/usuarios', usuariosController.addUser);
router.get('/usuarios', usuariosController.getUsers);
router.put('/usuarios/:id', usuariosController.updateUser);
router.delete('/usuarios/:id', usuariosController.deleteUser);
router.get('/usuarios/:id', usuariosController.getUserById);
router.get('/usuarios/email/:email', usuariosController.getUserByEmail);
router.get('/usuarios/type/:type', usuariosController.getUserByType);
router.get('/usuarios/name/:name', usuariosController.getUserByName);


module.exports = router;
