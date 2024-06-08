//Importa o módulo de configuração do banco de dados;
const pool = require('../config/dbConfig');
//Importa o módulo bcrypt para lidar com hash de senha;
const bcrypt = require('bcrypt');
//Importa o módulo jsonwebtoken para lidar com tokens JWT;
const jwt = require('jsonwebtoken');

//Função assíncrona para autenticar um usuário;
const loginUser = async (req, res) => {
  //Extrai os dados do corpo da requisição;
  const { email, password } = req.body;

  try {
    //Verifica se o usuário existe no banco de dados;
    const userResult = await pool.query('SELECT * FROM Users WHERE Email = $1', [email]);
    if (userResult.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = userResult.rows[0];

    //Verifica se a senha fornecida corresponde à senha armazenada no banco de dados;
    const validPassword = await bcrypt.compare(password, user.pass);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    //Cria um token JWT para o usuário autenticado;
    const token = jwt.sign({ userId: user.userid, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '24h'// Define a expiração do token para 24 horas;
    });

    res.json({ token });
  } catch (error) {
    //Loga um erro em caso de falha ao autenticar o usuário e retorna uma resposta de erro;
    console.error('Error logging in:', error);
    res.status(500).send('Error logging in');
  }
};

//Exporta a função para ser utilizada em outras partes da aplicação;
module.exports = {
  loginUser,
};