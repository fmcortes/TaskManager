const passport = require('passport');
const keys = require('../config/keys');

passport.serializeUser((user, done) => {
   done(null, user.id);
});