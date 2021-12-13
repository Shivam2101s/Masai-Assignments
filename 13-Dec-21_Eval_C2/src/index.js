const express = require('express');

const {register, login} = require("./controllers/auth.controller")

const movieController = require("./controllers/movie.controller");

const theaterController = require("./controllers/theater.controller")

const screenController = require("./controllers/screen.controller");

const showController = require("./controllers/shows.controller")

const seatController = require("./controllers/seat.controller")

const app = express();

app.use(express.json());

app.post("/register", register);
app.post("/login", login);

app.use("/movies", movieController);
app.use("/theaters", theaterController);
app.use("/screen", screenController);
app.use("/shows", showController);
app.use("/seat", seatController);

module.exports= app;