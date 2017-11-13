const mongoose = require('mongoose');
const User = require('../models/User');

module.exports = app => {
   app.get('/api/users', async(req, res) => {
      const users  = await  User.find({});
      res.send(users);
   });

   app.post('/api/users', async(req, res) => {
      const user = new User(req.body);
      try {
         await user.save();
         res.json({message: 'User successfuly added!', user });
      } catch (err) {
         res.status(422).send(err)
      }

   });

}