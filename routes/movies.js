const express = require('express');

const movieRouter = express.Router();
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const {
  createMovieValidation,
  deleteMovieValidation,
} = require('../middlewares/validation');

movieRouter.use(express.json());

movieRouter.get('/', getMovies);
movieRouter.post('/', createMovieValidation, createMovie);
movieRouter.delete('/:_id', deleteMovieValidation, deleteMovie);

module.exports = movieRouter;
