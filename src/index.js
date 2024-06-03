require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const usuariosRoutes = require('./routes/usuarios.routes.js');
const restaurantesRoutes = require('./routes/restaurantes.routes.js');
const avaliacoesRoutes = require('./routes/avaliacoes.routes.js');
const loginRoutes = require('./routes/login.routes.js');
const favoritosRoutes = require('./routes/favoritos.routes.js');
const avaliacoesController = require('./routes/avaliacoes.routes.js');



const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/', favoritosRoutes);
app.use('/', loginRoutes);
app.use('/', usuariosRoutes);
app.use('/', restaurantesRoutes);
app.use('/', avaliacoesRoutes);
app.use('/', avaliacoesController);


app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port} 🥂`);
});