// require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
// const cookieParser = require('cookie-parser');
// const { errors } = require('celebrate');
// const cors = require('cors');
// const router = require('./routes/index');
// const errorHandler = require('./middlewares/error');
// const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();

// app.use(
//   cors({
//     origin: ['http://localhost:3000', 'http://x9-mesto.nomoredomains.sbs', 'https://x9-mesto.nomoredomains.sbs'],
//     credentials: true,
//   }),
// );

// app.use(requestLogger);

app.use(express.json());
// app.use(cookieParser());
// app.use('/', router);

// app.use(errorLogger);

// app.use(errors());
// app.use(errorHandler);

async function main() {
  await mongoose.connect('mongodb://localhost:27017/movexdb', {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });
  await app.listen(PORT);

  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
}

main();
