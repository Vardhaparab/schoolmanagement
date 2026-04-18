const express  = require('express');
const schoolRoutes = require('../src/routes/schoolRoutes');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/',schoolRoutes);

module.exports = app;