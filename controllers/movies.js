const Movie = require('../models/movie');
const {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} = require('../utils/ErrorCodes');
const {
  badRequestMessage,
  forbiddenMovieDeleteMessage,
  movieNotFoundMessage,
} = require('../utils/ErrorMessages');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .populate('owner')
    .then((movies) => res.send({ data: movies }))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => Movie.populate(movie, { path: 'owner' }))
    .then((movie) => res.send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(badRequestMessage));
      }
      return next(err);
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(movieNotFoundMessage);
      }

      if (movie.owner._id.toString() !== req.user._id) {
        throw new ForbiddenError(forbiddenMovieDeleteMessage);
      }
      Movie.findByIdAndDelete(req.params._id)
        .then((deletedMovie) => res.send({ data: deletedMovie }))
        .catch((err) => {
          if (err.name === 'CastError') {
            return next(new BadRequestError(badRequestMessage));
          }
          return next(err);
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError(badRequestMessage));
      }
      return next(err);
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
