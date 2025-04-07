const Users = require('../models/usersModel');

const getUsers = (req, res) => {
    Users.getAllUsers((err, results ) => {
        if(err) {
            return res.status(500).json({error: 'Erro ao buscar usuarios'})
        }
        res.json(results);
    })
}

const createUsers = (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome) {
        return res.status(400).json({ error: 'Nome é obrigatório' });
    }
    if (!email) {
        return res.status(400).json({ error: 'Email é obrigatório' });
    }
    if (!senha) {
        return res.status(400).json({ error: 'Senha é obrigatória' });
    }

    Users.createUsers(nome, email, senha, (err, result) => {  // Ajuste no nome da função do model
        if (err) {
            return res.status(500).json({ error: 'Erro ao criar usuário' });
        }
        res.status(201).json({ message: 'Usuário criado com sucesso!' }); // Mensagem correta
    });
};

const updateUser = (req, res) => {
    const { id } = req.params;
    const {nome, email, senha, perfil} = req.body;

    if (!nome) {
        return res.status(400).json({ error: 'Nome é obrigatório' });
    }
    if (!email) {
        return res.status(400).json({ error: 'Email é obrigatório' });
    }
    if (!senha) {
        return res.status(400).json({ error: 'Senha é obrigatória' });
    }
    Users.updateUser (id, nome, email, senha, perfil, (err, result) => {  // Ajuste no nome da função do model
        if (err) {
            return res.status(500).json({ error: 'Erro ao atualizar usuário' });
        }
        res.status(201).json({ message: 'Usuário atualizado com sucesso!' }); // Mensagem correta
    });

}
const deleteUser = (req, res) => {
    const { id } = req.params;

    if (!id){
        return res.status(400).json({error: "Id deve ser obrigatório"});
    }
    Users.deleteUser (id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao deletar usuário' });
        }
        res.status(201).json({ message: 'Usuário deletado com sucesso!' }); // Mensagem correta
    });
};

const getByEmail = (req, res) => {
    const { email } = req.params;
    if (!email) {
        return res.status(400).json({error: "Email é obrigatório"});
    }
    Users.getByEmail (email, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error ao selecionar usuarios'});
        }

        res.json(results);
    })
}

module.exports = { getUsers, createUsers, updateUser, deleteUser, getByEmail};