const NODE_ENV = 'development';
const PORT = 3000;
const MONGO_URI_DEV = 'mongodb://localhost:27017/moviesdb';
const JWT_SECRET_DEV = 'MqjiymdLHnGs3khJ3axdy7LeGTF9JBXCsEnzqqpA';
const SALT_ROUNDS = '10';

module.exports = {
  NODE_ENV,
  PORT,
  MONGO_URI_DEV,
  JWT_SECRET_DEV,
  SALT_ROUNDS,
};
