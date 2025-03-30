const Users = require('../models/usersModel');

const getUsers = (req, res) => {
    Users.getAllUsers((err, results ) => {
        if(err) {
            return res.status(500).json({error: 'Erro ao buscar usuarios'})
        }
        res.json(results);
    })
}

module.exports = { getUsers};