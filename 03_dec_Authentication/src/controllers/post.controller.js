const express = require('express');

const Post = require("../models/post.model");

const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.post('/', authenticate ,async (req, res) => {
    try {
       const user = req.user;
       
       const post = await Post.create({
           title: req.body.title,
           body: req.body.body,
           user: user.user._id,
       })
      
       return res.status(200).json({post});
    }catch (e) {
    return res.status(500).json({ status: "Failed", message: e.message });
  }
});

router.get("/" ,authenticate, async (req, res) => {
    try {
      const posts = await Post.find().lean().exec();
  
      return res.status(200).json({ posts });
    } catch (e) {
      return res.status(500).json({ status: "Failed", message: e.message });
    }
  });
  
  module.exports = router;