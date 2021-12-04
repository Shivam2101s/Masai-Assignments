require("dotenv").config();

const { check, validationResult } = require("express-validator");

const User = require("../models/user.model");

const jwt = require("jsonwebtoken");

const newToken = (user) => {
  return jwt.sign({ user: user }, process.env.JWT_ACCESS_KEY);
};

const signup = async (req, res) => {
  try {
    // validate name, email and password

    await check('name').isLength({min:3, max: 10 }).withMessage("Name is required and should have minimum 3 and maximum 10 characters").run(req); 
    await check('email').isEmail().withMessage("Email is required and mut be a valid email address").run(req);
    await check('password').isLength({ min: 6 }).withMessage("Password is required and should have minimum 6 characters").run(req);
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let newErrors = errors.array().map(({ msg, param, location }) => {
        return { [param]: msg };
      });
      return res.status(400).json({ errors: newErrors });
    }
  
     // check if the email provided is already exist

    let user = await User.findOne({ email: req.body.email }).lean().exec();

    // if it already exists, then throw an error

    if (user) {
      res
        .status(400)
        .json({
          status: "Failed",
          message: "Please provide a different email address",
        });
    }

    //else we will create the user and will hash the password as plain text is harmful

    user = await User.create(req.body);

    //we will create the token

    const token = newToken(user);

    // return the user and the token

    return res.status(201).json({ user, token });
  } catch (e) {
    return res.status(500).json({ status: "Failed", message: e.message });
  }
};

const signin = async (req, res) => {
  try {
     // validate name, email and password
     
    await check('email').isEmail().withMessage("Email is required and mut be a valid email address").run(req);
    await check('password').isLength({ min: 6 }).withMessage("Password is required and should have minimum 6 characters").run(req);
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let newErrors = errors.array().map(({ msg, param, location }) => {
        return { [param]: msg };
      });
      return res.status(400).json({ errors: newErrors });
    }

    // check if the email provided is already exist

    let user = await User.findOne({ email: req.body.email});

    // if user does not exist, then throw an error

    if (!user) {
      res
        .status(400)
        .json({
          status: "Failed",
          message: "Please provide correct email address and password.",
        });
    }

    // else we match the password

    
    const match = await user.checkPassword(req.body.password);
    // if it does not match then throw an error

    if (!match) {
      res
        .status(400)
        .json({
          status: "Failed",
          message: "Please provide correct email address and password.",
        });
    }

    //if it matches then we will create the token

    const token = newToken(user);

    // return the user and the token

    return res.status(201).json({ user, token });

  } catch (e) {
    return res.status(500).json({ status: "Failed", message: e.message });
  }
};

module.exports = { signup, signin };
