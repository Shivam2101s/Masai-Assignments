require("dotenv").config();

const User = require("../models/user.model");

const jwt = require("jsonwebtoken");

const newToken = (user) => {
  return jwt.sign({ user: user }, process.env.JWT_ACCESS_KEY);
};

const register = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email }).lean().exec();
    
    if (user) {
      res.status(400).json({
        status: "Failed",
        message: "Please provide a different email address",
      });
    }

    user = await User.create(req.body);

    const token = newToken(user);

    return res.status(201).json({ user, token });
  } catch (e) {
    return res.status(500).json({ status: "Failed", message: e.message });
  }
};

const login = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user) {
      res.status(400).json({
        status: "Failed",
        message: "Please provide correct email address and password.",
      });
    }

    const match = await user.checkPassword(req.body.password);

    if (!match) {
      res.status(400).json({
        status: "Failed",
        message: "Please provide correct email address and password.",
      });
    }

    const token = newToken(user);

    return res.status(201).json({ user, token });
  } catch (e) {
    return res.status(500).json({ status: "Failed", message: e.message });
  }
};

module.exports = { register, login };
