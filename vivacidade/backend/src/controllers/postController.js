const Post = require('../models/postModel');

// Listar posts
const getPosts = (req, res) => {
    Post.getAllPosts((err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar posts' });
        }
        res.json(results);
    });
};

// Criar post
const createPost = (req, res) => {
    const { title, content, image } = req.body;
    if (!title || !content) {
        return res.status(400).json({ error: 'Título e conteúdo são obrigatórios' });
    }

    Post.createPost(title, content, image, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao criar post', err});
        }
        res.status(201).json({ message: 'Post criado com sucesso!' });
    });
};

// Atualizar post
const updatePost = (req, res) => {
    const { id } = req.params;
    const { title, content, image } = req.body;

    Post.updatePost(id, title, content, image, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao atualizar post' });
        }
        res.json({ message: 'Post atualizado com sucesso!' });
    });
};

// Deletar post
const deletePost = (req, res) => {
    const { id } = req.params;

    Post.deletePost(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao deletar post' });
        }
        res.json({ message: 'Post deletado com sucesso!' });
    });
};

const listaPostPorId = (req, res) => {
    const {id} = req.params;
    Post.getPorId(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar post' });
        }
        if (result.length === 0) {  // Verifica se o post foi encontrado
            return res.status(404).json({ message: 'Post não encontrado' });
        }

        res.json({ post: result });
    });
}

module.exports = { getPosts, createPost, updatePost, deletePost, listaPostPorId };
