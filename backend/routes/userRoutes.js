const express = require('express');
const { getUsers,
    getUserById,
    deleteUser,
    updateUserRole
 } = require('../controllers/userController.js');

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.delete('/users/:id', deleteUser);
router.patch('/users/:id', updateUserRole);


module.exports = router;

