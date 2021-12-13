const express = require("express");

const Screen = require("../models/screen.model");

const router = express.Router();

// post a screen

router.post("/", async (req, res) => {
  try {
    const screen = await Screen.create(req.body);

    res.status(201).send(screen);
  } catch (e) {
    res.status(500).json({ status: "Failed" , status: e.message });
  }
});

// get all screens

router.get("/", async (req, res) => {
  try {
    const screens = await Screen.find().populate("theater").lean().exec();

    res.send({ screens });
  } catch (e) {
    res.status(500).json({ status: "Failed" , message: e.message});
  }
});

// delete a screen

router.delete("/:id", async (req, res) => {
  try {
    const screen = await Screen.findByIdAndDelete(req.params.id).lean().exec();

    return res.status(200).send(screen);
  } catch (e) {
    return res.status(500).json({ status: "Failed" , message: e.message });
  }
});

module.exports = router;
