const express = require('express');
const router = express.Router();
const {addFavorite, getFavorites, removeFavorite} = require('../controllers/favoritosController')

const authenticateToken = require('../middleware/authMiddleware')

// Rotas para favoritos
router.post('/favorites', authenticateToken, addFavorite);
router.get('/favorites', authenticateToken, getFavorites);
router.delete('/favorites', authenticateToken, removeFavorite);

module.exports = router;