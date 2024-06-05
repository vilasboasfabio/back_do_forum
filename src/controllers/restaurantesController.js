
const pool = require('../config/dbConfig'); // Ajuste o caminho conforme a estrutura do seu projeto

// Função para adicionar um novo restaurante
const addRestaurant = async (req, res) => {
  const {
    name,
    location,
    priceLevel,
    cuisineType,
    chefName,
    description,
    openingDays,
    paymentMethods,
    rating,
    foundationDate,
    photoUrl,
    menuLink
  } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO restaurants (name, location, priceLevel, cuisineType, chefName, description, openingDays, paymentMethods, rating, foundationDate, photos, menuLink) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *',
      [name, location, priceLevel, cuisineType, chefName, description, openingDays, paymentMethods, rating, foundationDate, photoUrl, menuLink]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error adding restaurant:', error);
    res.status(500).send('Error adding restaurant');
  }
};

// Função para obter todos os restaurantes
const getRestaurants = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM restaurants');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching from database:', error);
    res.status(500).send('Error fetching from database');
  }
};

// Função para atualizar um restaurante
const updateRestaurant = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    location,
    priceLevel,
    cuisineType,
    chefName,
    description,
    openingDays,
    paymentMethods,
    rating,
    foundationDate,
    photoUrl,
    menuLink
  } = req.body;

  try {
    const result = await pool.query(
      'UPDATE Restaurants SET Name = $1, Location = $2, PriceLevel = $3, cuisinetype = $4, ChefName = $5, Description = $6, OpeningDays = $7, PaymentMethods = $8, Rating = $9, FoundationDate = $10, menulink = $11, Photos = $12 WHERE RestaurantID = $13 RETURNING *',
      [name, location, priceLevel, cuisineType, chefName, description, openingDays, paymentMethods, rating, foundationDate, menuLink, photoUrl, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating database:', error);
    res.status(500).send('Error updating database');
  }
};

const deleteRestaurant = async (req, res) => {
  const restaurantId = req.params.id;
  try {
    // Primeiro, exclua as reviews associadas
    await pool.query('DELETE FROM reviews WHERE restaurantid = $1', [restaurantId]);

    // Exclua os favoritos associados
    await pool.query('DELETE FROM favorites WHERE restaurantid = $1', [restaurantId]);

    // Em seguida, exclua o restaurante
    await pool.query('DELETE FROM restaurants WHERE restaurantid = $1', [restaurantId]);

    res.status(200).send({ message: 'Restaurant deleted successfully' });
  } catch (error) {
    console.error('Error deleting from database:', error);
    res.status(500).send('Error deleting restaurant');
  }
};


const getRestaurantById = async (req, res) =>{
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM Restaurants WHERE restaurantid = $1', [id]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching from database:', error);
    res.status(500).send('Error fetching from database');
  }

}

module.exports = {
  addRestaurant,
  getRestaurants,
  updateRestaurant,
  deleteRestaurant,
  getRestaurantById
};
