const pool = require('../config/dbConfig');
const bcrypt = require('bcryptjs');

// Função para adicionar um novo usuário
const addUser = async (req, res) => {
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

    const result = await pool.query(
      'INSERT INTO Users (Username, Email, Pass, UserType, Bio) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, email, hashedPassword, type, bio]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error inserting into database:', error);
    res.status(500).send('Error inserting into database');
  }
};

// Função para listar todos os usuários
const getUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Users');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching from database:', error);
    res.status(500).send('Error fetching from database');
  }
};

// Função para atualizar um usuário
const updateUser = async (req, res) => {
  const { id } = req.params;
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

    const result = await pool.query(
      'UPDATE Users SET Username = $1, Email = $2, Pass = $3, UserType = $4, Bio = $5 WHERE UserID = $6 RETURNING *',
      [name, email, hashedPassword, type, bio, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating database:', error);
    res.status(500).send('Error updating database');
  }
};

// Função para deletar um usuário
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM Users WHERE UserID = $1 RETURNING *', [id]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error deleting from database:', error);
    res.status(500).send('Error deleting from database');
  }
};

// Função para obter um usuário pelo ID
const getUserById = async (req, res) => {

  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM Users WHERE UserID = $1', [id]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching from database:', error);
    res.status(500).send('Error fetching from database');
  }
};

// Função para obter um usuário pelo email

const getUserByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const result = await pool.query('SELECT * FROM Users WHERE Email = $1', [email]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching from database:', error);
    res.status(500).send('Error fetching from database');
  }
};

// Função para obter usuários pelo tipo
const getUserByType = async (req, res) => {
  const { type } = req.params;

  try {
    const result = await pool.query('SELECT * FROM Users WHERE UserType = $1', [type]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching from database:', error);
    res.status(500).send('Error fetching from database');
  }
};

// Função para obter usuários pelo nome
const getUserByName = async (req, res) => {
  const { name } = req.params;

  try {
    const result = await pool.query('SELECT * FROM Users WHERE Username = $1', [name]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching from database:', error);
    res.status(500).send('Error fetching from database');
  }
};

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