const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../users');
const config = require('../config');

const router = express.Router();

const createAuthToken = (user) => {
  return jwt.sign({user},config.JWT_SECRET,{
    algorithm: 'HS256',
    expiresIn: config.JWT_EXPIRY,
    subject: user.username
  });
};

// 'local' from strategies, see docs
const localAuth = passport.authenticate('local', {session: false});

// sign in, trade for auth token
router.post('/login', localAuth, (req, res,) => {
  const authToken = createAuthToken(req.user.serialize());
  res.json({authToken});
});

// 'jwt from strategies, see docs'
const jwtAuth = passport.authenticate('jwt', {session: false});

// trade old token for new
router.post('/refresh', jwtAuth, (req, res) => {
  const newAuthToken = createAuthToken(req.user);
  res.json({newAuthToken});
});

module.exports = {router};