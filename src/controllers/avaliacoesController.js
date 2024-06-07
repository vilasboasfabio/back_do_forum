//Importa o módulo de configuração do banco de dados;
const pool = require('../config/dbConfig');

//Função assíncrona para adicionar uma nova avaliação;
const addReview = async (req, res) => {
  //Extrai o restaurantId, rating e reviewText do corpo da requisição;
  const { restaurantId, rating, reviewText } = req.body;
  //Obtém o userId do objeto req.user;
  const userId = req.user.userId;

  //Loga os IDs do usuário e restaurante, e os dados da avaliação;
  console.log('User ID:', userId);
  console.log('Restaurant ID, Rating, Review Text:', restaurantId, rating, reviewText);

  try {
    //Executa a query para inserir a avaliação no banco de dados;
    const result = await pool.query(
      'INSERT INTO Reviews (RestaurantID, UserID, Rating, ReviewText) VALUES ($1, $2, $3, $4) RETURNING *',
      [restaurantId, userId, rating, reviewText]
    );
    res.json(result.rows[0]);
  } catch (error) {
    //Loga um erro em caso de falha ao inserir no banco de dados;
    console.error('Error inserting into database:', error);
    res.status(500).send('Error inserting into database');
  }
};

//Função assíncrona para obter as avaliações de um restaurante específico;
const getReviewsByRestaurant = async (req, res) => {
  //Extrai o restaurantId dos parâmetros da requisição;
  const { restaurantId } = req.params;

  try {
    //Executa a query para obter as avaliações do restaurante específico;
    const result = await pool.query(
      'SELECT Reviews.*, Users.username AS username FROM Reviews JOIN Users ON Reviews.UserID = Users.UserID WHERE RestaurantID = $1',
      [restaurantId]
    );
    res.json(result.rows);
  } catch (error) {
     //Loga um erro em caso de falha ao buscar no banco de dados;
    console.error('Error fetching reviews from database:', error);
    res.status(500).send('Error fetching reviews from database');
  }
};

//Exporta as funções addReview e getReviewByRestaurant para serem utilizadas em outras partes da aplicação;
module.exports = {
  addReview,
  getReviewsByRestaurant,
};