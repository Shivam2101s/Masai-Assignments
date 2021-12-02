const express = require("express");

const { body, validationResult } = require("express-validator");

const User = require("../models/user.model");

const router = express.Router();

router.post("/", body("first_name").isLength({min : 3, max :10}).withMessage("First name is required and has to be atleast 3 and maximum 10 characters long"),
body("last_name").isLength({min : 3, max :10}).withMessage("Last name is required and has to be atleast 3 and maximum 10 characters long"),
body("email").custom(async (value) => {
  const isEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
  
  if(!isEmail) {
    throw new Error("Email is required and should be a valid email");
  }
  const listOfDomains = ["gmail.com","yahoo.com"];
  const email = value.split("@")
  if(!listOfDomains.includes(email[1])) {
    throw new Error("We do not accept emails from this domain");
  } 
   const userByEmail = await User.findOne({ email: value }).lean().exec();
   if(userByEmail) {
     throw new Error("Please try with a different email address")
   }
   return true;
 }), 
 body("pincode").custom( (value) => {
  const isNumber = /^[0-9]*$/.test(value)
  if(!isNumber || value <= 100000 ) {
    throw new Error("Pincode is required and should be exactly 6 numbers");
  }
  return true;
}),
body("age").custom( (value) => {
  const isNumber = /^[0-9]*$/.test(value)
  if(!isNumber || value >= 100 || value <= 0) {
    throw new Error("Age is required and should be between 1 and 100.");
  }
  return true;
}),
body("gender").custom( (value) => {
  if(value != "Male" && value != "Female" && value != "Others") {
    throw new Error("Gender is required and should be either Male, Female or Others")
  }
  return true;
}),


async (req, res) => {
//   console.log(body("name"));
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let newErrors = errors.array().map(({ msg, param, location }) => {
      return { [param]: msg };
    });
    return res.status(400).json({ errors: newErrors });
  }

  try {
    const user = await User.create(req.body);

    return res.status(201).json({ user });
  } catch (e) {
    return res.status(500).json({ status: "Failed", message: e.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find().lean().exec();

    return res.status(200).json({ users });
  } catch (e) {
    return res.status(500).json({ status: "Failed", message: e.message });
  }
});

module.exports = router;
