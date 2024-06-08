//Importa e configura o dotenv para carregar variáveis de ambiente do arquivo .env;
require('dotenv').config();
//Importa o módulo 'express';
const express = require('express');
//Importa o módulo 'cors';
const cors = require('cors');
//Importa o módulo 'body-parser';
const bodyParser = require('body-parser');

//Importa as rotas;
const usuariosRoutes = require('./routes/usuarios.routes.js');
const restaurantesRoutes = require('./routes/restaurantes.routes.js');
const avaliacoesRoutes = require('./routes/avaliacoes.routes.js');
const loginRoutes = require('./routes/login.routes.js');
const favoritosRoutes = require('./routes/favoritos.routes.js');
const avaliacoesController = require('./routes/avaliacoes.routes.js');
const contatosController =  require('./routes/contato.routes.js')

//Cria uma instância do aplicativo Express;
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

//Define a porta do servidor;
const port = process.env.PORT || 3000;

app.use(express.json());

//Define rotas para os diversos recursos da aplicação;
app.use('/', favoritosRoutes);
app.use('/', loginRoutes);
app.use('/', usuariosRoutes);
app.use('/', restaurantesRoutes);
app.use('/', avaliacoesRoutes);
app.use('/', avaliacoesController);
app.use('/', contatosController);

//Inicia o servidor e "ouve" na porta especificada;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port} 🥂`);
});