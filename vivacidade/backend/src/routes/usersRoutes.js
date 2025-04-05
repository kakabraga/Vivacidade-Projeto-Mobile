const express = require("express");
const { getUsers, createUsers, updateUser, deleteUser } = require("../controllers/usersController");
const router = express.Router();

router.get('/get', getUsers);
router.post('/create', createUsers);
router.put('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser );
module.exports = router;
