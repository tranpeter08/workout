const express = require('express');
const mongoose = require('mongoose');

const { PORT, DATABASE_URL } = require('./config');
const {router: usersRouter} = require('./users/router');

const app = express();

app.use(express.json());

app.use('/users', )

app.get('/workout', (req, res) => {
  const fakeData = {
    foo: 'bar',
    buzz: 'bang'
  };
  res.json(fakeData);
});

app.post('/users', (req, res) => {
  const { 
    userName, 
    password, 
    firstName, 
    lastName
  } = req.body;
  const newUser = {
    userName, 
    password, 
    firstName, 
    lastName
  }
});

let server;

const runServer = (databaseUrl, port = PORT) => {

}

app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
  mongoose.connect('mongodb://localhost/test');
  
});

module.exports = { app };