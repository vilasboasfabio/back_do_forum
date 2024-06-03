const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/loginController');

// Rota para login
router.post('/login', loginUser);

module.exports = router;