//Importa o módulo de configuração do banco de dados;
const pool = require('../config/dbConfig');

//Função assíncrona para adicionar um restaurante aos favorito;
const addFavorite = async (req, res) => {
  //Extrai o ID do usuário autenticado da requisição;
  const userId = req.user.userId;
  //Extrai o ID do restaurante do corpo da requisição;
  const { restaurantId } = req.body;

  try {
    //Executa a query para inserir o restaurante favorito no banco de dados;
    const result = await pool.query(
      'INSERT INTO Favorites (UserId, RestaurantId) VALUES ($1, $2) RETURNING *',
      [userId, restaurantId]
    );
    res.json(result.rows[0]);
  } catch (error) {
     //Loga um erro em caso de falha ao inserir no banco de dados;
    console.error('Error adding favorite:', error);
    res.status(500).send('Error adding favorite');
  }
};

//Função assíncrona para deletar um restaurante aos favorito;
const removeFavorite = async (req, res) => {
  //Extrai o ID do usuário autenticado da requisição;
  const userId = req.user.userId;
   //Extrai o ID do restaurante do corpo da requisição;
  const { restaurantId } = req.body;

  try {
    //Executa a query para deletar o restaurante favorito no banco de dados;
    await pool.query(
      'DELETE FROM Favorites WHERE UserId = $1 AND RestaurantId = $2',
      [userId, restaurantId]
    );
    res.sendStatus(204);
  } catch (error) {
     //Loga um erro em caso de falha ao deletar no banco de dados;
    console.error('Error removing favorite:', error);
    res.status(500).send('Error removing favorite');
  }
};

//Função assíncrona para obter todos os restaurante aos favorito;
const getFavorites = async (req, res) => {
  const userId = req.user.userId;

  try {
     //Executa a query para obter todos os restaurantes favoritos no banco de dados;
    const result = await pool.query(
      'SELECT Restaurants.* FROM Favorites JOIN Restaurants ON Favorites.RestaurantId = Restaurants.RestaurantId WHERE Favorites.UserId = $1',
      [userId]
    );
    res.json(result.rows);
  } catch (error) {
     //Loga um erro em caso de falha ao buscar no banco de dados;
    console.error('Error fetching favorites:', error);
    res.status(500).send('Error fetching favorites');
  }
};

//Exporta as funções para serem utilizadas em outras partes da aplicação;
module.exports = {
  addFavorite,
  removeFavorite,
  getFavorites,
};