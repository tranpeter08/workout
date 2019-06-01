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
  console.log('Sign token with user: \n', user)
  return jwt.sign({payload: user}, config.JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: config.JWT_EXPIRY,
    subject: user.username
  });
};

// 'local' from strategies, see docs
const localAuth = passport.authenticate('local', {session: false});

router.post('/login',(req, res, next)=> {
  passport.authenticate('local', {session: false}, (err, user, info) => {
    
    if (err) {
      console.log('passport error: \n', err)
      return next(err)
    }
    if (info) {
      console.log('passport info: \n', info)
      return res.status(401).json(info)
    }
    const authToken = createAuthToken(user.serialize());
    return res.json({authToken});
  })(req, res, next);
})

// 'jwt from strategies, see docs'
const jwtAuth = passport.authenticate('jwt', {session: false});

// trade old token for new
router.post('/refresh', jwtAuth,(req, res) => {
  console.log('req user payload', req.user.payload)
  const authToken = createAuthToken(req.user.payload);
  res.json({authToken});
});

router.post('/test', jwtAuth, (req, res) => {
  res.json({message: 'success'})
})

module.exports = {router, jwtAuth};