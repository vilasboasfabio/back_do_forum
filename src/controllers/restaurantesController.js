//Importa o módulo de configuração do banco de dados;
const pool = require('../config/dbConfig');

//Função assíncrona para adicionar um novo restaurante;
const addRestaurant = async (req, res) => {
  //Extrai os dados do corpo da requisição;
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
      //Executa a query para inserir o restaurante no banco de dados;
    const result = await pool.query(
      'INSERT INTO restaurants (name, location, priceLevel, cuisineType, chefName, description, openingDays, paymentMethods, rating, foundationDate, photos, menuLink) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *',
      [name, location, priceLevel, cuisineType, chefName, description, openingDays, paymentMethods, rating, foundationDate, photoUrl, menuLink]
    );
    res.json(result.rows[0]);
  } catch (error) {
    //Loga um erro em caso de falha ao inserir no banco de dados;
    console.error('Error adding restaurant:', error);
    res.status(500).send('Error adding restaurant');
  }
};

//Função assíncrona para obter todos os restaurantes;
const getRestaurants = async (req, res) => {
  try {
     //Executa a query para obter todos os restaurantes no banco de dados;
    const result = await pool.query('SELECT * FROM restaurants');
    res.json(result.rows);
  } catch (error) {
     //Loga um erro em caso de falha ao buscar no banco de dados;
    console.error('Error fetching from database:', error);
    res.status(500).send('Error fetching from database');
  }
};

//Função assíncrona para atualizar um restaurante;
const updateRestaurant = async (req, res) => {
   //Extrai o ID dos parâmetros da requisição;
  const { id } = req.params;
  //Extrai os dados do corpo da requisição;
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
      //Executa a query para atualizar o restaurante no banco de dados;
    const result = await pool.query(
      'UPDATE Restaurants SET Name = $1, Location = $2, PriceLevel = $3, cuisinetype = $4, ChefName = $5, Description = $6, OpeningDays = $7, PaymentMethods = $8, Rating = $9, FoundationDate = $10, menulink = $11, Photos = $12 WHERE RestaurantID = $13 RETURNING *',
      [name, location, priceLevel, cuisineType, chefName, description, openingDays, paymentMethods, rating, foundationDate, menuLink, photoUrl, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    //Loga um erro em caso de falha ao atualizar no banco de dados;
    console.error('Error updating database:', error);
    res.status(500).send('Error updating database');
  }
};

//Função assíncrona para deletar um restaurante;
const deleteRestaurant = async (req, res) => {
  //Extrai o ID do restaurante dos parâmetros da requisição;
  const restaurantId = req.params.id;
  try {
    // Primeiro, exclua as reviews associadas ao restaurante;
    await pool.query('DELETE FROM reviews WHERE restaurantid = $1', [restaurantId]);

    // Exclua os favoritos associados ao restaurantes;
    await pool.query('DELETE FROM favorites WHERE restaurantid = $1', [restaurantId]);

    // Em seguida, exclua o restaurante do banco de dados;
    await pool.query('DELETE FROM restaurants WHERE restaurantid = $1', [restaurantId]);

    res.status(200).send({ message: 'Restaurant deleted successfully' });
  } catch (error) {
    //Loga um erro em caso de falha ao deletar no banco de dados;
    console.error('Error deleting from database:', error);
    res.status(500).send('Error deleting restaurant');
  }
};

//Função assíncrona para obter restaurante pelo ID;
const getRestaurantById = async (req, res) =>{
  //Extrai o ID dos parâmetros da requisição;
  const { id } = req.params;

  try {
     //Executa a query para obter o restaurante pelo ID no banco de dados;
    const result = await pool.query('SELECT * FROM Restaurants WHERE restaurantid = $1', [id]);
    res.json(result.rows[0]);
  } catch (error) {
     //Loga um erro em caso de falha ao buscar no banco de dados;
    console.error('Error fetching from database:', error);
    res.status(500).send('Error fetching from database');
  }

}

//Exporta as funções para serem utilizadas em outras partes da aplicação;
module.exports = {
  addRestaurant,
  getRestaurants,
  updateRestaurant,
  deleteRestaurant,
  getRestaurantById
};
