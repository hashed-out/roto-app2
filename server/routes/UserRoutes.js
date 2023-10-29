const express = require('express');
const UserServce = require('../services/UserService')

const router = express.Router();

// Registration Route
// router.post('/register', UserController.registerUser);

// Update User Route
router.put('/users/:id', UserServce.updateUser);

module.exports = router;
