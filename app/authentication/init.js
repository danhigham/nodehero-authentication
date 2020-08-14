const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const config = require('../../config')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy

const authenticationMiddleware = require('./middleware')

// Generate Password
const saltRounds = 10
const myPlaintextPassword = 'my-password'
const salt = bcrypt.genSaltSync(saltRounds)
const passwordHash = bcrypt.hashSync(myPlaintextPassword, salt)

const user = {
  username: 'test-user',
  passwordHash,
  id: 1
}

function findUser (username, callback) {
  if (username === user.username) {
    return callback(null, user)
  }
  return callback(null)
}

passport.serializeUser(function (user, cb) {
  cb(null, user.username)
})

passport.deserializeUser(function (username, cb) {
  findUser(username, cb)
})

function initPassport () {

  passport.use(new GoogleStrategy({
    clientID: config.google.clientId,
    clientSecret: config.google.secret,
    callbackURL: config.google.callback
  },
  function(accessToken, refreshToken, profile, done) {
       User.findOrCreate({ googleId: profile.id }, function (err, user) {
         return done(err, user);
       });
    }
  ));

  passport.authenticationMiddleware = authenticationMiddleware
}

module.exports = initPassport
