const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../utils/ErrorCodes');
const { authorizationErrorMessage } = require('../utils/ErrorMessages');

const { NODE_ENV, JWT_SECRET } = process.env;
const { JWT_SECRET_DEV } = require('../utils/Config');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV,
    );
  } catch (err) {
    return next(new UnauthorizedError(authorizationErrorMessage));
  }
  req.user = payload;
  return next();
};

module.exports = auth;
