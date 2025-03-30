const express = require('express');
const { getPosts, createPost, updatePost, deletePost, listaPostPorId } = require('../controllers/postController');

const router = express.Router();

router.get('/get', getPosts);          // Listar posts
router.post('/create', createPost);    // Criar post
router.put('/update/:id', updatePost); // Atualizar post
router.delete('/delete/:id', deletePost); // Deletar post
router.get('/getid/:id', listaPostPorId); // Obter post por ID

module.exports = router;
