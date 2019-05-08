'use strict';
const {Strategy: LocalStrategy} = require('passport-local');
const {Strategy: JwtStrategy, ExtractJwt} = require('passport-jwt');

const {User} = require('../users/model')

const {JWT_SECRET, JWT_EXPIRY} = require('../config')

const localStrategy = new LocalStrategy((username, password, callback) => {
  let user;
  User.findOne({username})
    .then(_user => {
      user = _user;
      if(!user) {
        return Promise.reject({
          reason: 'LoginError',
          message: `no account associated with that username`,
          location: 'username'
        });
      }
      return user.validatePassword(password);
    })
    .then(isValid => {
      if(!isValid) {
        return Promise.reject({
          reason: 'LoginError',
          message: 'incorrect password or username',
          location: 'password'
        })
      }
      return callback(null, user);
      // passport returns a user object
    })
    .catch(err => {
      if(err.reason === 'LoginError') {
        console.error('ERROR ===>\n', err)
        return callback(null, false, err);
      }
      return callback(err, false);
    });
});

const jwtStrategy = new JwtStrategy(
  {
    secretOrKey: JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    algorithms: ['HS256']
  },
  (payload, callback) => {
    console.log('payload ====\n', payload);
    callback(null, {payload});
  }
);

module.exports = {localStrategy, jwtStrategy};