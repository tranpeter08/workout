'use strict';

const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const { User } = require('../users/model');
const config = require('../config');

const router = express.Router();

const validateSubmission = (req, res, next) => {
  passport.authenticate('local', {session:false}, (err, user, info) => {
    console.log('USER:\n',user)
  return req.json(user)
  });
  next();
}

const createAuthToken = function(user) {
  console.log('token user ===\n', user)
  return jwt.sign({payload: user}, config.JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: config.JWT_EXPIRY,
    subject: user.username
  });
};

// 'local' from strategies, see docs
const localAuth = passport.authenticate('local', {session: false});

router.use(express.json());
// sign in, trade for auth token

// router.post('/login', localAuth, (req, res) => {
//   console.log('req user ===\n', req.user.serialize());
//   const authToken = createAuthToken(req.user.serialize());
      
//   res.json({authToken})
// });

router.post('/login',(req, res, next)=> {
  passport.authenticate('local', {session: false}, (err, user, info) => {
    console.log('USER:\n', err)
    if (err) {
      return next(err)
    }
    if (info) {
      return res.status(401).json(info)
    }
    const authToken = createAuthToken(user.serialize());
    return res.json({authToken});
  })(req, res, next);
})

// 'jwt from strategies, see docs'
const jwtAuth = passport.authenticate('jwt', {session: false});

// trade old token for new
router.post('/refresh', jwtAuth, (req, res) => {
  const authToken = createAuthToken(req.user);
  res.json({authToken});
});

router.post('/test', jwtAuth, (req, res) => {
  
  res.json({message: 'success'})
})
module.exports = {router, jwtAuth};