module.exports = app => {

   app.get('/', ( req, res) => {
      res.json({ message: "Welcome to TaskManager"});
   });
}

