const LocalStrategy = require('passport-local').Strategy

function initialize(passport, getCustomerByUsername ,getCustomerById) {
  const authenticateUser = async (username, password, done) => {
    const user = await getCustomerByUsername(username);
    console.log(user);
    if (user == null) {
        console.log('Inside first if');
      return done(null, false, { message: 'No user with that username' });
    }

    try {
      if (password === user.password) {
        console.log('Inside Try if');
        return done(null, user)
      } else {
        console.log('Inside else ');
        return done(null, false, { message: 'Password incorrect' })
      }
    } catch (e) {
      return done(e)
    }
  }

  passport.use(new LocalStrategy({ usernameField: 'username' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => {
    return done(null, getCustomerById(id))
  })
}

module.exports = initialize