//Importa o módulo de configuração do banco de dados;
const pool = require('../config/dbConfig');

// Função assíncrona para adicionar um novo tipo de cozinha;
const addCuisineType = async (req, res) => {
   //Extrai o nome da cozinha do corpo da requisição;
  const { cuisineName } = req.body;

  try {
      //Executa a query para inserir o tipo de cozinha no banco de dados;
    const result = await pool.query(
      'INSERT INTO CuisineTypes (CuisineName) VALUES ($1) RETURNING *',
      [cuisineName]
    );
    res.json(result.rows[0]);
  } catch (error) {
     //Loga um erro em caso de falha ao inserir no banco de dados;
    console.error('Error inserting into database:', error);
    res.status(500).send('Error inserting into database');
  }
};

//Função assíncrona para obter todos os tipos de cozinha;
const getCuisineTypes = async (req, res) => {
  try {
     //Executa a query para obter todos os tipo de cozinha no banco de dados;
    const result = await pool.query('SELECT * FROM CuisineTypes');
    res.json(result.rows);
  } catch (error) {
     //Loga um erro em caso de falha ao buscar no banco de dados;
    console.error('Error fetching from database:', error);
    res.status(500).send('Error fetching from database');
  }
};

//Função assíncrona para atualizar um tipo de cozinha;
const updateCuisineType = async (req, res) => {
   //Extrai o ID dos parâmetros da requisição;
  const { id } = req.params;
   //Extrai o nome da cozinha do corpo da requisição;
  const { cuisineName } = req.body;

  try {
     //Executa a query para atualizar tipo de cozinha no banco de dados;
    const result = await pool.query(
      'UPDATE CuisineTypes SET CuisineName = $1 WHERE CuisineTypeID = $2 RETURNING *',
      [cuisineName, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    //Loga um erro em caso de falha ao atualizar no banco de dados;
    console.error('Error updating database:', error);
    res.status(500).send('Error updating database');
  }
};

//Função assíncrona para deletar um tipo de cozinha;
const deleteCuisineType = async (req, res) => {
  const { id } = req.params;

  try {
     //Executa a query para deletar o tipo de cozinha no banco de dados;
    await pool.query('DELETE FROM CuisineTypes WHERE CuisineTypeID = $1', [id]);
    res.sendStatus(204);
  } catch (error) {
     //Loga um erro em caso de falha ao deletar no banco de dados;
    console.error('Error deleting from database:', error);
    res.status(500).send('Error deleting from database');
  }
};

//Exporta as funções para serem utilizadas em outras partes da aplicação;
module.exports = {
  addCuisineType,
  getCuisineTypes,
  updateCuisineType,
  deleteCuisineType,
};
