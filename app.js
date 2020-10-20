const express = require('express');
const morgan = require('morgan');
const movies = require('./movie-data.json');

const app = express();

app.use(morgan('common'));

app.get('/movie', (req, res) => {
  const { genre, country, avg_vote } = req.query;
  let results = movies;

  if(genre){
    results = results.filter(movie => movie.genre.toLowerCase().contains(genre.toLowerCase()));
  }

  if(country){
    results = results.filter(movie => movie.country.toLowerCase().contains(country.toLowerCase()));
  } 

  if(avg_vote){
    results = results.filter(movie => Number(movie.avg_vote) >= Number(avg_vote));
  }

  res.json(results); 
})

app.listen(8000, () => { 
  console.log('Server listening at http://localhost:8000');
})