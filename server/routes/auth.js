const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/authMiddleware");
const mongoose = require("mongoose");
//const User = mongoose.model("User");
const User = require("../models/user");
require("dotenv").config();

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(422)
      .json({ error: "Please add all the required fields" });
  }

  try {
    const savedUser = await User.findOne({ email: email });
    if (savedUser) {
      return res
        .status(422)
        .json({ error: "User already exists with that email" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      email: email,
      password: hashedPassword,
    });

    await user.save();
    return res.status(201).json({ message: "Saved successfully" });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    var adminEmail = email;

    if (!email || !password) {
      return res.status(422).json({ error: "Please enter email and password" });
    }

    const savedUser = await User.findOne({ email: email });

    if (!savedUser) {
      return res.status(422).json({ error: "Invalid email or password" });
    }

    const doMatch = await bcrypt.compare(password, savedUser.password);

    if (doMatch) {
      let isAdmin = false;

      // Postavljanje isAdmin na true ako je email jednak 'admin@admin', samo za dodavanje admina
      if (adminEmail === "admin@admin") {
        isAdmin = true;
      }

      const token = jwt.sign(
        { _id: savedUser._id, isAdmin: isAdmin },
        process.env.JWT_SECRET
      );

      const { _id, name, email, fullName, description, image } = savedUser;

      // Slanje tokena na klijentsku stranu
      res.json({
        token,
        user: { _id, name, email, fullName, isAdmin, description, image },
      });
    } else {
      return res.status(422).json({ error: "Invalid email or password" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
