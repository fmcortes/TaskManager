const User = require('../models/user.model');

exports.getUsers = async(req, res) => {
   const users  = await  User.find({});
   res.send(users)
};

exports.saveUser = async (req, res) => {
   const user = new User(req.body);
   try {
      await user.save();
      res.json({ message: "User successfuly added!", user });
   } catch (err) {
      res.status(422).send(err);
   }
};