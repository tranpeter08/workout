'use strict';
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');
const cors = require('cors')

const { PORT, DATABASE_URL } = require('./config');
const {router: usersRouter} = require('./users');
const {router: authRouter} = require('./auth');
const {localStrategy, jwtStrategy} = require('./auth/strategies')

const app = express();

app.use(express.json());
app.use(morgan('common'));

// CORS
app.use(cors());

passport.use(localStrategy);
passport.use(jwtStrategy);

app.use('/users', usersRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
  const fakeData = {
    foo: 'bar',
    buzz: 'bang'
  };
  res.json(fakeData);
});

let server;

const runServer = (databaseUrl, port = PORT) => {

}

app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
  mongoose.connect(DATABASE_URL);
  
});

module.exports = { app };