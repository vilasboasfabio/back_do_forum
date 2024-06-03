const pool = require('../config/dbConfig');

const addFavorite = async (req, res) => {
  const userId = req.user.userId;
  const { restaurantId } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO Favorites (UserId, RestaurantId) VALUES ($1, $2) RETURNING *',
      [userId, restaurantId]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error adding favorite:', error);
    res.status(500).send('Error adding favorite');
  }
};

const removeFavorite = async (req, res) => {
  const userId = req.user.userId;
  const { restaurantId } = req.body;

  try {
    await pool.query(
      'DELETE FROM Favorites WHERE UserId = $1 AND RestaurantId = $2',
      [userId, restaurantId]
    );
    res.sendStatus(204);
  } catch (error) {
    console.error('Error removing favorite:', error);
    res.status(500).send('Error removing favorite');
  }
};

const getFavorites = async (req, res) => {
  const userId = req.user.userId;

  try {
    const result = await pool.query(
      'SELECT Restaurants.* FROM Favorites JOIN Restaurants ON Favorites.RestaurantId = Restaurants.RestaurantId WHERE Favorites.UserId = $1',
      [userId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).send('Error fetching favorites');
  }
};

module.exports = {
  addFavorite,
  removeFavorite,
  getFavorites,
};