'use strict';
const express = require('express');

const { User, Profile } = require('./model');
const { jwtAuth } = require('../auth')
const { validateUser, validateProfile } = require('./validate');
const { createError, handleError, sendRes } = require('../utils');

const router = express.Router();

// create user and profile
// jwt
router.post('/', validateUser, validateProfile, (req, res) => {
  const {username, password, email, profile} = req.body;

  return User
    .findOne({email})
    .then(user => {
      console.log('user\n:', user)
      if (user) {
        return Promise.reject({
          code: 400,
          reason: 'validationError',
          message: 'email already associated with another account!',
          location: ['email']
        })
      }
      return User.find({username}).count()
    })
    .then(count => {
      if (count > 0) {
        return Promise.reject({
          code: 400,
          reason: 'validationError',
          message: 'username already exists!',
          location: ['username']
        });
      };
      return User.hashPassword(password);
    })
    .then(hash => {
      return User
        .create({
          username, 
          password: hash, 
          email
        });
    })
    .then(user => {
      console.log('=== user ===\n', user)
      return Profile
        .create({userId: user._id, ...profile});
    })
    .then(profile => {
      console.log('===profile ===\n', profile)
      // create JWT
      return res.status(201).json(profile.serialize());
    })
    .catch(err => {
      if(err.reason === 'validationError') {
        return res.status(err.code).json(err);
      }
      console.error('=== ERROR ===\n', err);
      return res.status(500).json({message:'internal server error'})
    });
});

// update user password or email
router.put('/:userId', jwtAuth,(req, res) => {
  return User
    .findByIdAndUpdate(
      req.params.userId,
      req.body
    )
    .then(() => {
      return res.status(204);
    })
    .catch(err => {
      console.error('=== Error === \n');
      return res.status(500).json({message: 'Something went wrong'})
    });

});

// get profile
router.get('/profile/:userId/', jwtAuth, (req, res) => {
  return Profile
    .findOne({userId: req.params.userId})
    .populate({
      path: 'workouts',
      populate: {path: 'exercises'}
    })
    .then(profile => {
      if (!profile) {
        createError('validationError', 'profile not found', 404);
      }
      console.log('get profile\n', profile);
      return res.status(200).json(profile.serialize());
    })
    .catch(err => {
      return handleError(err, res)
    })
})

//update profile
router.put('/profile/:userId/', jwtAuth, validateProfile, (req, res) => {

  return Profile
    .findOneAndUpdate(
      {userId: req.params.userId},
      req.body
    )
    .then(() => {
      return res.status(200).json({message: 'profile has been updated'});
    })
    .catch(err => {
      return handleError(err, res);
    });
});

// TODO: route for new password request
router.post('/lost-credentials', (req, res) => {
  const { username, email } = req.body;

  if (!(username || email)) {
    return sendRes(res, 400, 'invalid fields')
  }

  function newPasswordWith(field){
    let query = req.body[field];
    return User
      .findOne({[field]:query})
      .then(user => {
        if (!user) {
          return createError(
            'validationError', 
            `no account associated with this ${field}`,
            404
          )
        };
        let tempPassword = `${username}${Date.now()}${email}`
        user.password = User.hashPassword(tempPassword);
        user.save();
        return res.status(200).json(user);
      })
      .catch(err => {
        return handleError(err, res);
      })
  };

  return username? newPasswordWith('username') : newPasswordWith('email');
});

// show all users for debugging only
// router.get('/', (req, res) => {
//   return User.find()
//     .then(users => res.json(users))
//     .catch(err => {
//       console.error(err);
//       res.json({message: 'An error has occured'});
//     })
// });

module.exports = { router };