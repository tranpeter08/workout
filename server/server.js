'use strict';
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');
const cors = require('cors');

const { PORT, DATABASE_URL } = require('./config');
const { router: usersRouter } = require('./users');
const { router: authRouter, jwtAuth } = require('./auth');
const { localStrategy, jwtStrategy } = require('./auth/strategies');
const { router: workoutsRouter } = require('./workouts');
const { router: exercisesRouter } = require('./exercises');

const app = express();

app.use(express.json());
app.use(morgan('common'));

// CORS
// const corsOptions = {
//   methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }
// app.use(cors(corsOptions));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  if (req.method === 'OPTIONS') {
    return res.send(204);
  }
  next();
});

passport.use(localStrategy);
passport.use(jwtStrategy);
// to do: simplify routes
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/users/:userId/workouts', workoutsRouter);
app.use('/users/:userId/workouts/:workoutId/exercises', exercisesRouter);
// app.use('/api/:userId', [workoutsRouter, exercisesRouter]);

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