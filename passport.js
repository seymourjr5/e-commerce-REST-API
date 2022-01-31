const LocalStrategy = require('passport-local').Strategy
const pool = require('./db');

function initialize(passport, getCustomerByUsername ,getUserById) {
  const authenticateUser = async (username, password, done) => {
    const user = getCustomerByUsername(username);
    if (user == null) {
      return done(null, false, { message: 'No user with that username' })
    }

    try {
      if (password === user.password) {
        return done(null, user)
      } else {
        return done(null, false, { message: 'Password incorrect' })
      }
    } catch (e) {
      return done(e)
    }
  }

  passport.use(new LocalStrategy({ usernameField: 'username' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id))
  })
}

module.exports = initialize