const express = require("express");

const Show = require("../models/shows.model");

const router = express.Router();

// post a show

router.post("/", async (req, res) => {
  try {
    const show = await Show.create(req.body);

    res.status(201).send(show);
  } catch (e) {
    res.status(500).json({status: "Failed" , status: e.message });
  }
});

// get all shows

router.get("/", async (req, res) => {
  try {
    const total_shows= await Show.find().count();  
    const shows = await Show.find().populate("movie").populate("screen").lean().exec();

    res.send({total_shows, shows });
  } catch (e) {
    res.status(500).json({ status: "Failed" , message: e.message});
  }
});

// get all shows for a particular movie 


router.get("/:id", async (req, res) => {
    try {
    
      const all_shows = await Show.find({ "movie": req.params.id }).populate("movie").populate("screen").lean().exec();
  
      return res.status(200).json({  all_shows });
    } catch (e) {
      return res.status(500).json({ status: "Failed", message: e.message });
    }
  });

// delete a show

router.delete("/:id", async (req, res) => {
  try {
    const show = await Show.findByIdAndDelete(req.params.id).lean().exec();

    return res.status(200).send(show);
  } catch (e) {
    return res.status(500).json({ status: "Failed" , message: e.message});
  }
});

module.exports = router;
