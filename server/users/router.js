'use strict';
const express = require('express');

const {User} = require('./model');

const router = express.Router();

router.post('/', (req, res) => {
  // validate required fields
  const requiredFields = ['username', 'password']; 
  const missingFields = requiredFields.filter( field => !(field in req.body));

  sendErrorMessage(
    400, 
    'ValidationError', 
    'Missing required fields', 
    missingFields
  );

  // validate Nonempty fields
  const nonEmptyFields = ['password', 'username']
  const emptyFields = nonEmptyFields.filter( field => 
    req.body[field].trim() === ''
  );

  sendErrorMessage(
    400,
    'ValidationError',
    'Field cannot be empty',
    emptyFields
  );

  // validate trimmed fields
  const trimmedFields = ['username', 'password'];
  const nonTrimmedFields = trimmedFields.filter(field => 
    field in req.body && req.body[field].trim() !== req.body[field]
  );

  sendErrorMessage(
    400, 
    'ValidationError', 
    'Cannot start or end with white space', 
    nonTrimmedFields
  );

  // validate length of username and password
  const lengthFields = {
    username: {min: 8},
    password: {min: 10, max: 72}
  };

  const lengthFieldKeys = Object.keys(lengthFields);
  const badLengthFields = lengthFieldKeys.filter( field => 
    field in req.body && req.body[field].length < lengthFields[field].min ||
    req.body[field].length > lengthFields[field].max
  );

  const badLengthMessage = badLengthFields.map(field =>{
    if(req.body[field].trim().length < lengthFields[field].min) {
      return `${field} must be at least ${lengthFields[field].min} characters long`
    } else if(req.body[field].trim().length > lengthFields[field].max) {
      return `${field} must be no more than ${lengthFields[field].max} characters long`
    }
  }).join('; ');

  sendErrorMessage(
    400,
    'ValidationError',
    badLengthMessage,
    badLengthFields
  );

  // validate number fields
  const numberFields = ['height', 'inches', 'weight', 'bodyFat'];
  const nonNumberFields = numberFields.filter( field => 
    field in req.body && typeof req.body[field] !== 'number'
  );

  sendErrorMessage(
    400, 
    'ValidationError', 
    'Field should be a number',
    nonNumberFields
  );

  // validate string fields
  const stringFields = [
    'username', 'password', 'firstName', 'lastName', 'heightUnit', 'weightUnit'
  ];
  const nonStringFields = stringFields.filter(field => 
    field in req.body && typeof req.body[field] !== 'string'
  );

  sendErrorMessage(
    400, 
    'ValidationError', 
    'Field should be a string',
    nonStringFields
  );

  // validate options
  const selectOptions = {heightUnit: ['cm', 'ft'], weightUnit: ['lb', 'kg']};
  const selectFields = Object.keys(selectOptions);
  const missingOptionFields = selectFields.filter(field => 
    field in req.body && !selectOptions[field].includes(req.body[field]));

  sendErrorMessage(
    400, 
    'ValidationError', 
    'Field unit is invalid',
    missingOptionFields
  );

  if('inches' in req.body && req.body.heightUnit === 'cm') {
    sendErrorMessage(400, 'ValidationError', 'Incorrect height unit', ['inches'])
  }

  const {
    username, 
    password, 
    firstName,
    lastName,
    height,
    heightUnit,
    inches,
    weight,
    weightUnit,
    bodyFat
  } = req.body;

  return User.find({username})
    .count()
    .then( count => {
      if(count > 0) {
        return Promise.reject({
          code: 400,
          reason: 'ValidationError',
          message: 'username already exists!',
          location: 'username'
        });
      };
      return User.hashPassword(password);
    })
    .then(hash => {
      return User.create({
          username, 
          password: hash, 
          firstName,
          lastName,
          height,
          heightUnit,
          inches,
          weight,
          weightUnit,
          bodyFat
      })
    })
    .then(user => {
      return res.status(201).json(user.serialize());
    })
    .catch(err => {
      if(err.reason === 'ValidationError') {
        return res.status(err.code).json(err);
      }
      console.error('ERROR:', err);
      return res.status(500).json({message:'internal server error'})
    });

  function sendErrorMessage(code, reason, message, location) {
    const locationString = location.join(', ');
    if(locationString) {
      console.log('LOCATION:', location);
      return res.status(code).json({
        code,
        reason,
        message,
        location: locationString
      });
    };
  };
});

module.exports = {router};