const LocalStrategy = require('passport-local').Strategy;
const mysql = require('../db/connection');
const User = require('../db/model/User');
const bcrypt = require('bcryptjs');

module.exports = function (passport) {
  passport.use(new LocalStrategy({ usernameField: 'loginEmail', passwordField: 'loginPassword' },
    async (username, password, done) => {
      try {
        const user = new User();
        user.email = username;
        const userData = await user.getUserDataByEmail();
        if (!userData) return done(null, false, { message: 'User with that data not found!' });
        if (await bcrypt.compare(password, userData.password)) {
          return done(null, userData);
        } else {
          return done(null, false, { message: "Incorrect password" });
        }
      } catch (error) {
        console.error(error);
        return done(null, false, { message: 'Server error' });
      }
    }
  ));

  passport.serializeUser((user, done) => {
    console.log(`${JSON.stringify(user)}`);
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    mysql.query("SELECT * FROM user WHERE id = ?", [id], function (err, rows) {
      console.log(`id je ${id}`);
      done(err, rows[0]);
    });
  });
}