'use strict';

const express = require('express');

const {User} = require('./model');

const router = express.Router();

function sendErrorMessage(code, reason, message, location) {
  if(location) {
    return res.status(code).json({
      code,
      reason,
      message,
      location
    });
  };
};

router.post('/', (req, res) => {
  // validate username: required, empty, length, trimmed

  // validate required fields
  const requiredFields = ['username', 'password']; 
  const missingFields = requiredFields.filter( field => !(field in req.body));

  sendErrorMessage(422, 'ValidationError', 'Missing required fields', missingFields);

  // validate string fields
  const stringFields = [
    'username', 'password', 'firstName', 'lastName', 'heightUnit', 'weightUnit'
  ];
  const nonStringFields = stringFields.filter(field => 
    field in req.body && typeof req.body[field] !== 'string'
  );

  sendErrorMessage(422, 'ValidationError', 'Field should be a string',nonStringFields);

  // validate number fields
  const numberFields = ['height', 'inches', 'weight', 'bodyFat'];
  const nonNumberFields = numberFields.filter( field => 
    field in req.body && typeof req.body[field] !== 'number'
  );

  sendErrorMessage(422, 'ValidationError', 'Field should be a number',nonNumberFields);

  // validate options
  const selectOptions = {heightUnit: ['cm', 'ft'], weightUnit: ['lb', 'kg']};
  const selectFields = Object.keys(selectOptions);
  const missingOptionFields = selectFields.filter(field => 
    field in req.body && !selectOptions[field].includes(req.body[field]));

  sendErrorMessage(422, 'ValidationError', 'Field unit is invalid',missingOptionFields);

  // validate trimmed fields
  const trimmedFields = ['username', 'password'];
  const nonTrimmedFields = trimmedFields.filter(field => 
    field in req.body && req.body[field].trim() !== req.body[field]
  );

  sendErrorMessage(422, 'ValidationError')

  // validate length of username and password
  // check for length, send message if length not satisfied
  const lengthFields = {
    username: {min: 8},
    password: {min: 10, max: 72}
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

  const newUser = {
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
  };
})