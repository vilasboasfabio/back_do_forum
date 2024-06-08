// authMiddleware.js
//Importa o módulo jsonwebtoken para lidar com tokens JWT;
const jwt = require('jsonwebtoken');

//Middleware para autenticação de token;
const authenticateToken = (req, res, next) => {
  //Obtém o cabeçalho de autorização da requisição;
  const authHeader = req.headers['authorization'];
  //Extrai o token JWT do cabeçalho de autorização, se presente;
  const token = authHeader && authHeader.split(' ')[1];

  //Verifica se o token não está presente;
  if (!token) return res.sendStatus(401);

  //Verifica se o token é válido;
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    //Se o token for válido, adiciona o usuário decodificado ao objeto de requisição;
    req.user = user;
    //Chama a próxima função de middleware na cadeia de middleware;
    next();
  });
};

//Exporta a função para ser utilizada em outras partes da aplicação;
module.exports = authenticateToken;