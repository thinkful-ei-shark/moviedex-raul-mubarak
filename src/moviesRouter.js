const express = require('express');
// const logger = require('./logger');
const movies = require('./movies-data.json');
// const { v4: uuid } = require('uuid');
// const { PORT } = require('./config');

const moviesRouter = express.Router();
// const bodyParser = express.json();

moviesRouter
  .route('/movie')
  .get((req, res) => {
    const { genre, country, avg_vote } = req.query;
    let results = movies;
  
    if (genre) {
      results = results.filter((movie) =>
        movie.genre.toLowerCase().includes(genre.toLowerCase())
      );
    }
  
    if (country) {
      results = results.filter((movie) =>
        movie.country.toLowerCase().includes(country.toLowerCase())
      );
    }
  
    if (avg_vote) {
      results = results.filter(
        (movie) => Number(movie.avg_vote) >= Number(avg_vote)
      );
    }
  
    res.json(results);
  });
  
module.exports = moviesRouter;
