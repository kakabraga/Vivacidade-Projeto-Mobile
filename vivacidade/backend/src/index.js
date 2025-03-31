const express = require('express');
const cors = require('cors');
const postRoutes = require('./routes/postRoutes');
const usersRoutes = require('./routes/usersRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/posts', postRoutes);
app.use('/api/users', usersRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
