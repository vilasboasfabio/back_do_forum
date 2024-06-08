//Importa o módulo 'multer';
const multer = require('multer');
//Importa o módulo 'path';
const path = require('path');

// Configuração do armazenamento do Multer
const storage = multer.diskStorage({
  //Define o diretótio de destino para salvar os arquivos enviados;
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); //Salva os arquivos na pasta 'uploads/';
  },
  //Define o nome do arquivo a ser salvo;
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`); //Define o nome do arquivo com timestamp atual e o nome original do arquivo;
  },
});

//Cria uma instância do Multer com as configurações de armazenamento definidas acima;
const upload = multer({ storage });

//Exporta a instância do Multer para que ela possa ser utilizadas em outros módulos;
module.exports = upload;
