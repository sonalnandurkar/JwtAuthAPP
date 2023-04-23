const express = require('express');
const route = express.Router();
const user_controller = require('../controllers/user_controller');


// POST request for creating Author.
route.post('/register', user_controller.register)
route.post('/login', user_controller.login)

module.exports = route