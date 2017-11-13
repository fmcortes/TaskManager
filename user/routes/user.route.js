const mongoose = require('mongoose');
const User = require('../models/user.model');
const userController = require('../controllers/user.controller')

module.exports = app => {
   app.get("/api/users", userController.getUsers);

   app.post('/api/users', userController.saveUser);

}