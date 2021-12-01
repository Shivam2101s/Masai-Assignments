const express = require("express");

const sendMail = require("../utils/send_mail");

const User = require("../models/user.model");

const router = express.Router();

// --------------------USER CRUD --------------------

router.get("/", async (req, res) => {
  try {
    const page = +req.query.page || 1;
    const size = +req.query.size || 2;

    const skip = (page - 1) * size;

    const users = await User.find().skip(skip).limit(size).lean().exec();

    const totalPages = Math.ceil((await User.find().countDocuments()) / size);

    return res.status(200).json({ users, totalPages });
  } catch (e) {
    return res.status(500).json({ status: "Failed", message: e.message });
  }
});

const admin_arr = [
    "admin1@gmail.com",
    "admin2@gmail.com",
    "admin3@gmail.com",
    "admin4@gmail.com",
    "admin5@gmail.com",
  ];

const admin_string = admin_arr.join(",");

router.post("/", async (req, res) => {
    try {
        const user = await User.create(req.body);
        sendMail(
            "me@gmail.com",
            `${req.body.email}`,
            `Welcome to ABC system ${req.body.first_name} ${req.body.last_name}`,
            `Hi ${req.body.first_name},  Please confirm your email address`,
            `<h1>Hi ${req.body.first_name},  Please confirm your email address</h1>`,
        ); 

        sendMail(
            "me@gmail.com",
             admin_string,
             `${req.body.first_name} ${req.body.last_name} has registered with us`,
             `Please welcome ${req.body.first_name} ${req.body.last_name}`,
             `<h1>Please welcome ${req.body.first_name} ${req.body.last_name}</h1>`,

        );

        return res.status(200).json({user});
    } catch (e) {
        return res.status(500).json({ status: "Failed", message: e.message });
      }
});

module.exports = router;
