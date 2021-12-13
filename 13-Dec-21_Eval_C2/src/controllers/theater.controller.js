const express = require('express')

const Theater = require("../models/theater.model")

const router = express.Router()

// post a theater

router.post("/", async (req, res) => {
    try {
      const theater = await Theater.create(req.body);
  
      res.status(201).send(theater);
    } catch (e) {
      res.status(500).json({ status: "Failed" , status: e.message });
    }
  });

  // get all theaters
  
  router.get("/", async (req, res) => {
    try {
      const theaters = await Theater.find().lean().exec();
  
      res.send({ theaters });
    } catch (e) {
      res.status(500).json({ status: "Failed" , message: e.message});
    }
  });

  // delete a theater

  router.delete("/:id", async (req, res) => {
    try {
      const theater = await Theater.findByIdAndDelete(req.params.id).lean().exec();
  
      return res.status(200).send(theater);
    } catch (e) {
      return res.status(500).json({ status: "Failed" , message: e.message});
    }
  });  

  module.exports = router;