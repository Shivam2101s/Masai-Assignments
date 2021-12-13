const express = require("express");

const Seat = require("../models/seats.model");

const router = express.Router();

// post a seat

router.post("/", async (req, res) => {
  try {
    const seat = await Seat.create(req.body);

    res.status(201).send(seat);
  } catch (e) {
    res.status(500).json({ status: "Failed", status: e.message });
  }
});

// get all seats

router.get("/", async (req, res) => {
  try {
    const seats = await Seat.find().populate("show").lean().exec();

    res.send({ seats });
  } catch (e) {
    res.status(500).json({ status: "Failed", message: e.message });
  }
});

// get all available seats for a show 

router.get("/:id", async (req, res) => {
    try {
    
      const availability = await Seat.find({ "show": req.params.id }).populate("show").lean().exec();
  
      return res.status(200).json({availability });
    } catch (e) {
      return res.status(500).json({ status: "Failed", message: e.message });
    }
  });


// update seats

router.patch("/:id", async (req, res) => {
  try {
    const seat = await Seat.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();

    return res.status(201).send(seat);
  } catch (e) {
    return res.status(500).json({ status: "Failed", message: e.message });
  }
});

// delete a seat

router.delete("/:id", async (req, res) => {
  try {
    const seat = await Seat.findByIdAndDelete(req.params.id).lean().exec();

    return res.status(200).send(seat);
  } catch (e) {
    return res.status(500).json({ status: "Failed", message: e.message });
  }
});

module.exports = router;
