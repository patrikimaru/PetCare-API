const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('express-async-errors');
require('dotenv').config();
require('colors');

const app = express();
const PORT = process.env.PORT || 3001;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected'.green))
  .catch((err) => console.log(err.red));

app.use(bodyParser.json());
app.use(cors());

app.use('/api/appointments', require('./routers/appointmentRouter'));
app.use('/api/users', require('./routers/userRouter'));

app.use((err, req, res, next) => {
  console.error('Error:'.red, err);
  res.status(500).json({ error: err });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`.blue);
});
