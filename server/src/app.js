const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

// routers

const restaurantsRoute = require('./routes/Restaurants');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/restaurants', restaurantsRoute);

module.exports = app;
