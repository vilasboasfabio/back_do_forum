//Importa o módulo de configuração do banco de dados;
const pool = require('../config/dbConfig');
//Importa o módulo de criptografia bcryptjs;
const bcrypt = require('bcryptjs');

//Função assíncrona para adicionar um novo usuário;
const addUser = async (req, res) => {
  //Extrai os dados do corpo da requisição;
  const {
    name,
    email,
    password,
    type,
    bio
  } = req.body;

  try {
    //Gera um salt para o hash da senha;
    const salt = await bcrypt.genSalt(10);
    //Gera o hash da senha;
    const hashedPassword = await bcrypt.hash(password, salt);

      //Executa a query para inserir o usuário no banco de dados;
    const result = await pool.query(
      'INSERT INTO Users (Username, Email, Pass, UserType, Bio) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, email, hashedPassword, type, bio]
    );
    res.json(result.rows[0]);
  } catch (error) {
      //Loga um erro em caso de falha ao inserir no banco de dados;
    console.error('Error inserting into database:', error);
    res.status(500).send('Error inserting into database');
  }
};

//Função assíncrona para obter todos os usuários;
const getUsers = async (req, res) => {
  try {
    //Executa a query para obter todos os usuários;
    const result = await pool.query('SELECT * FROM Users');
    res.json(result.rows);
  } catch (error) {
     //Loga um erro em caso de falha ao obter no banco de dados;
    console.error('Error fetching from database:', error);
    res.status(500).send('Error fetching from database');
  }
};

//Função assíncrona para atualizar um usuário;
const updateUser = async (req, res) => {
   //Extrai o ID dos parâmetros da requisição;
  const { id } = req.params;
  //Extrai os dados do corpo da requisição;
  const {
    name,
    email,
    password,
    type,
    bio
  } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Executa a query para atualizar o usuário no banco de dados;
    const result = await pool.query(
      'UPDATE Users SET Username = $1, Email = $2, Pass = $3, UserType = $4, Bio = $5 WHERE UserID = $6 RETURNING *',
      [name, email, hashedPassword, type, bio, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
     //Loga um erro em caso de falha ao atualizar no banco de dados;
    console.error('Error updating database:', error);
    res.status(500).send('Error updating database');
  }
};

//Função assíncrona para deletar um usuário;
const deleteUser = async (req, res) => {
  //Extrai o ID dos parâmetros da requisição;
  const { id } = req.params;

  try {
     //Executa a query para deletar o usuário;
    const result = await pool.query('DELETE FROM Users WHERE UserID = $1 RETURNING *', [id]);
    res.json(result.rows[0]);
  } catch (error) {
     //Loga um erro em caso de falha ao deletar no banco de dados;
    console.error('Error deleting from database:', error);
    res.status(500).send('Error deleting from database');
  }
};

//Função assíncrona para obter um usuário pelo ID;
const getUserById = async (req, res) => {
  //Extrai o ID dos parâmetros da requisição;
  const { id } = req.params;

  try {
    //Executa a query para obter o usuário pelo ID;
    const result = await pool.query('SELECT * FROM Users WHERE UserID = $1', [id]);
    res.json(result.rows[0]);
  } catch (error) {
      //Loga um erro em caso de falha ao buscar pelo ID no banco de dados;
    console.error('Error fetching from database:', error);
    res.status(500).send('Error fetching from database');
  }
};

//Função assíncrona para obter um usuário pelo email;
const getUserByEmail = async (req, res) => {
  //Extrai o email dos parâmetros da requisição;
  const { email } = req.params;

  try {
    //Executa a query para obter o usuário pelo email;
    const result = await pool.query('SELECT * FROM Users WHERE Email = $1', [email]);
    res.json(result.rows[0]);
  } catch (error) {
     //Loga um erro em caso de falha ao buscar pelo email no banco de dados;
    console.error('Error fetching from database:', error);
    res.status(500).send('Error fetching from database');
  }
};

//Função assíncrona para obter usuários pelo tipo;
const getUserByType = async (req, res) => {
  //Extrai o tipo dos parâmetros da requisição;
  const { type } = req.params;

  try {
    //Executa a query para obter o usuário pelo tipo;
    const result = await pool.query('SELECT * FROM Users WHERE UserType = $1', [type]);
    res.json(result.rows);
  } catch (error) {
    //Loga um erro em caso de falha ao buscar pelo tipo no banco de dados;
    console.error('Error fetching from database:', error);
    res.status(500).send('Error fetching from database');
  }
};

//Função assíncrona para obter usuários pelo nome;
const getUserByName = async (req, res) => {
  //Extrai o nome dos parâmetros da requisição;
  const { name } = req.params;

  try {
      //Executa a query para obter o usuário pelo nome;
    const result = await pool.query('SELECT * FROM Users WHERE Username = $1', [name]);
    res.json(result.rows);
  } catch (error) {
    //Loga um erro em caso de falha ao buscar pelo nome no banco de dados;
    console.error('Error fetching from database:', error);
    res.status(500).send('Error fetching from database');
  }
};

//Exporta as funções para serem utilizadas em outras partes da aplicação;
module.exports = {
  addUser,
  getUsers,
  updateUser,
  deleteUser,
  getUserById,
  getUserByEmail,
  getUserByType,
  getUserByName,
};