import passportLocal from 'passport-local';
const LocalStrategy = passportLocal.Strategy;

function initialize(passport, getUserByEmail, getUserById) {
  const authenticateUser = async (email, password, done) => {
    try {
      const user = await getUserByEmail(email);
      
      if (!user) {
        return done(null, false, { message: 'No user with that email' });
      }

      // In a real app, use bcrypt to compare hashed passwords!
      if (password === user.password) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Password incorrect' });
      }
    } catch (e) {
      return done(e);
    }
  };

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id))
  })
}

export default initialize;