const express = require("express");

const Movie = require("../models/movie.model");

const upload = require("../middlewares/uploads");

const authenticate = require("../middlewares/authenticate");

const router = express.Router();

// post a movie

router.post(
  "/",
  authenticate,
  upload.single("poster_url"),
  async (req, res) => {
    try {
      const user = req.user;

      const movie = await Movie.create({
        name: req.body.name,
        actors: req.body.actors,
        languages: req.body.languages,
        directors: req.body.directors,
        poster_url: req.file.path,
        user: user.user._id,
      });

      return res.status(201).json({ movie });
    } catch (e) {
      return res.status(500).json({ status: "Failed", message: e.message });
    }
  }
);

// get movies of particular actor

router.get("/:name", async (req, res) => {
  try {
    const Movies_found = await Movie.find({ actors: req.params.name }).count();

    const movies = await Movie.find({ actors: req.params.name }).lean().exec();

    return res.status(200).json({ Movies_found, movies });
  } catch (e) {
    return res.status(500).json({ status: "Failed", message: e.message });
  }
});

// get all movies

router.get("/", async (req, res) => {
  try {
    const Movies_found = await Movie.find().count();
    const movies = await Movie.find().lean().exec();

    return res.status(200).json({ Movies_found, movies });
  } catch (e) {
    return res.status(500).json({ status: "Failed", message: e.message });
  }
});

// delete a movie

router.delete("/:id", authenticate, async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id).lean().exec();

    return res.status(200).send(movie);
  } catch (e) {
    return res.status(500).json({ status: "Failed" , message: e.message});
  }
});

module.exports = router;
