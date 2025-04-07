const express = require("express");
const { getUsers, createUsers, updateUser, deleteUser, getByEmail } = require("../controllers/usersController");
const router = express.Router();

router.get('/get', getUsers);
router.get('/getbyemail/:email', getByEmail)
router.post('/create', createUsers);
router.put('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser );
module.exports = router;
