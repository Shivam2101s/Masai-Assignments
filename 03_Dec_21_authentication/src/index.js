const express = require('express');

const {signup , signin } = require('./controllers/auth.controller');

const postController = require('./controllers/post.controller');

const app = express();

app.use(express.json());

app.post('/signup',signup);
app.post('/signin', signin);

app.use("/post", postController);

module.exports = app;