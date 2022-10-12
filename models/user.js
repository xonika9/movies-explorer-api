const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { UnauthorizedError } = require('../utils/ErrorCodes');
const { wrongEmailOrPasswordMessage } = require('../utils/ErrorMessages');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: true,
    },
    email: {
      type: String,
      validate: {
        validator(email) {
          return validator.isEmail(email);
        },
        message: 'Enter a valid email',
      },
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { versionKey: false },
);

userSchema.methods.toJSON = function hidePassword() {
  const user = this.toObject();
  delete user.password;
  return user;
};

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password,
) {
  return this.findOne({ email })
    .select('+password')
    .orFail(() => {
      throw new UnauthorizedError(wrongEmailOrPasswordMessage);
    })
    .then((user) => bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        throw new UnauthorizedError(wrongEmailOrPasswordMessage);
      }
      return user;
    }));
};

module.exports = mongoose.model('user', userSchema);
