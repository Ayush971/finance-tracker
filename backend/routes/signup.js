const express = require("express");
const user = require("../models/user");

const router = express.Router();

router.post("/add-user", async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);
  const newUser = new user.User({
    username,
    email,
    password,
  });

  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }
    await newUser.save();
    return res.status(200).json({ message: "record saved" });
  } catch (error) {
    res.status(500).json({ messgae: "Server Error" });
  }
});

router.get("/get-users", async (req, res) => {
  try {
    const users = await user.User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Sevrer Error" });
  }
});


module.exports = { loginRouter: router };
