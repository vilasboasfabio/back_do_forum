//Importa o módulo Pool para gerenciar conexões com o banco de dados;
const { Pool } = require('pg');

//Conjunto de conexões com o banco de dados;
const pool = new Pool({
  user: process.env.DB_USER, 
  host: process.env.DB_HOST, 
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

//Exporta a instância do Pool para que ela possa ser utilizadas em outros módulos;
module.exports = pool;
