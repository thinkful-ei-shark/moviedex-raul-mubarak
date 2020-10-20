require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const movies = require('./movies-data.json');

console.log(process.env.API_TOKEN);

const app = express();

app.use(morgan('dev'));

app.use(function validateBearerToken(req, res, next) {
  const apiToken = process.env.API_TOKEN
  const authToken = req.get('Authorization')

  if (!authToken || authToken.split(' ')[1] !== apiToken) {
    return res.status(401).json({ error: 'Unauthorized request' })
  }
  // move to the next middleware
  next()
})

app.get('/movie', function handleGetMovies(req, res) {
  const { genre, country, avg_vote } = req.query;
  let results = movies;

  if(genre){
    results = results.filter(movie => movie.genre.toLowerCase().includes(genre.toLowerCase()));
  }

  if(country){
    results = results.filter(movie => movie.country.toLowerCase().includes(country.toLowerCase()));
  } 

  if(avg_vote){
    results = results.filter(movie => Number(movie.avg_vote) >= Number(avg_vote));
  }

  res.json(results); 
})

app.listen(8000, () => { 
  console.log('Server listening at http://localhost:8000');
})