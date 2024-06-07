//Importa o módulo de configuração do banco de dados;
const pool = require('../config/dbConfig');

//Função assíncrona para adicionar um novo contato;
const addContato = async (req, res) => {
    //Extrai os dados do corpo da requisição;
  const {
    nome,
    email,
    telefone,
    menssagem
  } = req.body;

  console.log
    try {
         //Executa a query para inserir o contato no banco de dados;
        const result = await pool.query(
        'INSERT INTO Contato (Nome, Email, Telefone, Mensagem) VALUES ($1, $2, $3, $4) RETURNING *',
        [nome, email, telefone, menssagem]
        );
        res.json(result.rows[0]);
    } catch (error) {
        //Loga um erro em caso de falha ao inserir no banco de dados;
        console.error('Error inserting into database:', error);
        res.status(500).send('Error inserting into database');
    }
}

//Função assíncrona para obter todos os contatos
const getContato = async (req, res) => {
    try {
        //Executa a query para obter todos os contatos;
        const result = await pool.query('SELECT * FROM Contato');
        res.json(result.rows);
    } catch (error) {
          //Loga um erro em caso de falha ao buscar no banco de dados;
        console.error('Error fetching from database:', error);
        res.status(500).send('Error fetching from database');
    }
}

//Função assíncrona para atualizar um contato específico;
const updateContato = async (req, res) => {
    //Extrai o ID dos parâmetros da requisição;
    const { id } = req.params;
    //Extrai os dados do corpo da requisição;
    const {
        nome,
        email,
        telefone,
        menssagem
    } = req.body;

    try {
        //Executa a query para atualizar o contato no banco de dados;
        const result = await pool.query(
            'UPDATE Contatos SET Nome = $1, Email = $2, Telefone = $3, Mensagem = $4, ID = $5 RETURNING *',
            [nome, email, telefone, menssagem, id]
        );
        res.json(result.rows[0]);
    } catch (error) {
          //Loga um erro em caso de falha ao atualizar no banco de dados;
        console.error('Error updating from database:', error);
        res.status(500).send('Error updating from database');
    }
}

//Função assíncrona para deletar um contato específico;
const deleteContato = async (req, res) => {
     //Extrai o ID dos parâmetros da requisição;
    const { id } = req.params;

    try {
        //Executa a query para deletar o contato;
        const result = await pool.query('DELETE FROM Contato WHERE ID = $1', [id]);
        res.json(result.rows[0]);
    } catch (error) {
         //Loga um erro em caso de falha ao deletar no banco de dados;
        console.error('Error deleting from database:', error);
        res.status(500).send('Error deleting from database');
    }
}

//Função assíncrona para obter um contato específico pelo ID;
const getContatoById = async (req, res) => {
     //Extrai o ID dos parâmetros da requisição;
    const { id } = req.params;

    try {
        //Executa a query para obter o contato pelo ID;
        const result = await pool.query('SELECT * FROM Contado WHERE ID = $1', [id]);
        res.json(result.rows[0]);
    } catch (error) {
          //Loga um erro em caso de falha ao buscar pelo ID no banco de dados;
        console.error('Error fetching from database:', error);
        res.status(500).send('Error fetching from database');
    }
}

//Função assíncrona para obter um contato específico por email;
const getContatoByEmail = async (req, res) => {
    //Extrai o email dos parâmetros da requisição;
    const { email } = req.params;

    try {
        //Executa a query para obter o contato pelo email;
        const result = await pool.query('SELECT * FROM Contato WHERE Email = $1', [email]);
        res.json(result.rows[0]);
    } catch (error) {
         //Loga um erro em caso de falha ao buscar pelo email no banco de dados;
        console.error('Error fetching from database:', error);
        res.status(500).send('Error fetching from database');
    }
}

// Função assíncrona para obter um contato específico pelo telefone;
const getContatoByTelefone = async (req, res) => {
     //Extrai o telefone dos parâmetros da requisição;
    const { telefone } = req.params;

    try {
        //Executa a query para obter o contato pelo telefone;
        const result = await pool.query('SELECT * FROM Users WHERE Telefone = $1', [telefone]);
        res.json(result.rows);
    } catch (error) {
         //Loga um erro em caso de falha ao buscar pelo telefone no banco de dados;
        console.error('Error fetching from database:', error);
        res.status(500).send('Error fetching from database');
    }
}

// Função assíncrona para obter um contato específico pelo nome;
const getContatoByNome = async (req, res) => {
     //Extrai o nome dos parâmetros da requisição;
    const { nome } = req.params;

    try {
         //Executa a query para obter o contato pelo nome;
        const result = await pool.query('SELECT * FROM Contatos WHERE Name = $1', [nome]);
        res.json(result.rows);
    } catch (error) {
         //Loga um erro em caso de falha ao buscar pelo nome no banco de dados;
        console.error('Error fetching from database:', error);
        res.status(500).send('Error fetching from database');
    }
}

//Exporta as funções para serem utilizadas em outras partes da aplicação;
module.exports = {
    addContato,
    getContato,
    updateContato,
    deleteContato,
    getContatoById,
    getContatoByEmail,
    getContatoByTelefone,
    getContatoByNome
};