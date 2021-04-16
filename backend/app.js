const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

const userRoute = require('./routes/userRoute');

const app = express();

mongoose.connect('mongodb+srv://DUM:Highjump210@spotter.ukh11.mongodb.net/SPOTTER?retryWrites=true&w=majority',
{ useNewUrlParser: true,
  useUnifiedTopology: true })
  .then(() => console.log('Connecté à MongoDB'))
  .catch(() => console.log('Non connecté à MongoDB'));

app.use(helmet());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

//app.use('/api/post', postRoute);
app.use('/api/auth', userRoute);

module.exports = app;