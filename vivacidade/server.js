const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');

const app = express();

// Configuração do CORS - permitindo todas as origens
// Permite todas as origens durante o desenvolvimento local
app.use(cors({
    origin: ['http://localhost:8081', 'http://192.168.0.249:8081', 'exp://192.168.0.249:19000'], // Expo inclui essa URL
  }));
  
  
  

// Rota de teste
app.post('/', (req, res) => {
  res.send('API funcionando!');
});

// Configuração do banco de dados
const sequelize = new Sequelize('vivacidade', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql',
});

// Middleware para ler o corpo da requisição
app.use(bodyParser.json());

// Testando a conexão com o MySQL
sequelize.authenticate()
  .then(() => {
    console.log('Conectado ao banco de dados MySQL');
  })
  .catch((err) => {
    console.error('Erro de conexão:', err);
  });

// Definir o modelo de Usuário
const User = sequelize.define('User', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Sincronizar o modelo com o banco de dados (criar a tabela se não existir)
sequelize.sync()
  .then(() => {
    console.log('Tabela de usuários sincronizada com sucesso!');
  })
  .catch((error) => {
    console.error('Erro ao sincronizar a tabela:', error);
  });

// Rota para registrar um novo usuário
app.post('/register', async (req, res) => {
    const { nome, email, senha } = req.body;
  
    try {
      // Verificar se o usuário já existe no banco de dados
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'Email já registrado!' });
      }
  
      // Criar um novo usuário
      const newUser = await User.create({
        nome,
        email,
        senha, // Em um sistema real, você deve criptografar a senha!
      });
  
      return res.status(201).json({ message: 'Usuário registrado com sucesso!', user: newUser });
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      return res.status(500).json({ message: 'Erro ao registrar usuário.' });
    }
  });

// Iniciar o servidor na porta 1024
app.listen(1024, () => {
  console.log('Backend rodando na porta 1024');
});
