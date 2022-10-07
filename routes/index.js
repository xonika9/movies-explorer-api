const express = require('express');

const router = express.Router();
const { login, createUser, logout } = require('../controllers/users');
const {
  signInValidation,
  signUpValidation,
} = require('../middlewares/validation');

const userRouter = require('./users');
const movieRouter = require('./movies');

const auth = require('../middlewares/auth');

const { NotFoundError } = require('../utils/ErrorCodes');
const { pageNotFoundMessage } = require('../utils/ErrorMessages');

router.use(express.json());

router.post('/signin', signInValidation, login);
router.post('/signup', signUpValidation, createUser);
router.use(auth);
router.use('/users', userRouter);
router.use('/movies', movieRouter);
router.get('/signout', logout);
router.use((req, res, next) => {
  next(new NotFoundError(pageNotFoundMessage));
});

module.exports = router;
