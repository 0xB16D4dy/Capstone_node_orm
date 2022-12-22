const express = require('express');
const rootRoute = express.Router();
const userRoute = require('./userRoute');
const imgRoute = require('./imageRoute');

rootRoute.use('/user', userRoute);

rootRoute.use('/image', imgRoute);

module.exports = rootRoute;
