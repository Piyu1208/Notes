const express = require('express');
const { getUsers,
    getUserById,
    deleteUser
 } = require('../controllers/userController.js');

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.delete('/users/:id', deleteUser);


module.exports = router;

