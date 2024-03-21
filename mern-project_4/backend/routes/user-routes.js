const express = require('express')
const { signup } = require('../controllers/user_controller.js');
const { login } = require('../controllers/user_controller.js');
const { getUser } = require('../controllers/user_controller.js')
const { logout } = require('../controllers/user_controller.js')
const { verifying } = require('../controllers/user_controller.js');
const { refresh_token } = require('../controllers/user_controller.js')
// import signup from '../controllers/user_controller'
const routing = express.Router();
routing.get('/', (req, res, next) => {
    res.send('Connected')
})
routing.post('/signup', signup)
routing.post('/login', login)
routing.get('/user', verifying, getUser)
routing.get('/refresh', refresh_token, verifying, getUser)
routing.post('/logout', verifying, logout)
module.exports = routing;