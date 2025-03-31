const db = require("../config/db");

const getAllUsers = (callback) => {
  db.query("SELECT * FROM users", callback);
};
const createUsers = (nome, email, senha, callback) => {
  const sql = "INSERT INTO users (nome, email, senha) VALUES (?, ?, ?)";
  db.query(sql, [nome, email, senha], callback);
};
const updateUser = (id, nome, email, senha, perfil, callback) => {
    const sql = 'UPDATE users SET nome=?, email=?, senha=?, perfil=? WHERE id=?';

    db.query(sql, [nome, email, senha, perfil, id], callback);
};
const deleteUser = (id, callback) => {
    const sql = "DELETE FROM users WHERE id=?";
    db.query(sql, [id], callback);
}

module.exports = { getAllUsers, createUsers, updateUser, deleteUser };
