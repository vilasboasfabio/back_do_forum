const pool = require('../config/dbConfig');

const addReview = async (req, res) => {
  const { restaurantId, rating, reviewText } = req.body;
  const userId = req.user.userId;

  console.log('User ID:', userId);
  console.log('Restaurant ID, Rating, Review Text:', restaurantId, rating, reviewText);

  try {
    const result = await pool.query(
      'INSERT INTO Reviews (RestaurantID, UserID, Rating, ReviewText) VALUES ($1, $2, $3, $4) RETURNING *',
      [restaurantId, userId, rating, reviewText]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error inserting into database:', error);
    res.status(500).send('Error inserting into database');
  }
};

const getReviewsByRestaurant = async (req, res) => {
  const { restaurantId } = req.params;

  try {
    const result = await pool.query(
      'SELECT Reviews.*, Users.username AS username FROM Reviews JOIN Users ON Reviews.UserID = Users.UserID WHERE RestaurantID = $1',
      [restaurantId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching reviews from database:', error);
    res.status(500).send('Error fetching reviews from database');
  }
};

module.exports = {
  addReview,
  getReviewsByRestaurant,
};