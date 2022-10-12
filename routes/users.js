const express = require('express');

const userRouter = express.Router();
const { getUser, updateUser } = require('../controllers/users');
const { updateUserValidation } = require('../middlewares/validation');

userRouter.use(express.json());

userRouter.get('/me', getUser);
userRouter.patch('/me', updateUserValidation, updateUser);

module.exports = userRouter;
