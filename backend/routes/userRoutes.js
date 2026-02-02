const express = require('express');
const { getUsers,
    getUserById,
 } = require('../controllers/userController.js');

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:id', getUserById);


module.exports = router;

