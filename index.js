const express = require('express');
const mongoose = require('mongoose');
const app = express();
const routes = require('./routes');
const db = require('./config/connection');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

debug.once('open', () => {
    app.listen(process.env.PORT || 3001, () => {
        console.log(`API server running on port ${process.env.PORT || 3001}`);
    });
});