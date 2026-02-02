const express = require('express');
const { getUsers } = require('../controllers/userController.js');

const router = express.Router();

router.get('/users', getUsers);


module.exports = router;

