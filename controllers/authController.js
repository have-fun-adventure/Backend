const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const user = require("../models/user");
const auth = require("../middleware/auth");





router.get("/auth", auth, (req, res) => {
  res.send("authenticated");
});

router.post("/", user.findEmail, user.login, (req, res) => {
  if (!req.user) {
    res.status(400).send("invalid email or password");
  } else {

    console.log(req.user)
    const { email, name, id } = req.user;

    const token = jwt.sign({ email, name, id }, process.env.JWT_KEY || "Aisha");

    res.send({ token });
  }
});

router.post("/siginup", user.findEmail, user.create, (req, res) => {
  if (res.user) {
    res.status(400).send("user is already reigister");
  } else {
    const { email, name, id } = req.user;

    // const email = req.user.email ;
    // const name = req.user.name ;

    const token = jwt.sign({ email, name, id }, process.env.JWT_KEY);

    res.send({ token });
  }
});

module.exports = router;