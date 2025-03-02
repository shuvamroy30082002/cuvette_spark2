const express = require("express");
const router = express.Router();
const User = require("../models/user.model.js");
const Profile = require("../models/profile.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/auth.js");

// register user
router.post("/register", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  if (!firstname || !lastname || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are Required" });
  }

  try {
    const exist = await User.findOne({ email });
    if (exist) {
      return res
        .status(400)
        .json({ success: false, message: "User Already Exist" });
    }

    const hashPass = await bcrypt.hash(password, 10);
    const newUser = await User({
      firstname,
      lastname,
      email,
      password: hashPass,
    });

    const newProfile = await Profile.create({ userId: newUser._id });

    newUser.profile = newProfile._id;

    await newUser.save();
    res.status(200).json({ success: true, message: "Register Succesfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Interval Server Error !" });
  }
});

// login user
router.post("/login", async (req, res) => {
  const { emailOrusername, password } = req.body;

  if (!emailOrusername || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All Fields are Required !" });
  }

  try {
    const exist = await User.findOne({
      $or: [{ email: emailOrusername }, { username: emailOrusername }],
    });

    if (!exist) {
      return res
        .status(404)
        .json({ success: false, message: "User Not found! Please Register" });
    }

    const samePass = await bcrypt.compare(password, exist.password);
    if (!samePass) {
      return res
        .status(500)
        .json({ success: false, message: "Wrong Username OR Password !" });
    }

    const payload = {
      id: exist._id,
      firstname: exist.firstname,
      lastname: exist.lastname,
      category: exist.category,
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "12hr",
    });

    // destructure safely userdetails
    const { password: hashPass, ...userDetails } = exist._doc;

    res.status(200).json({
      success: true,
      message: "Login succesfully !",
      token,
      user: userDetails,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Interval Server Error !" });
  }
});

// update category and username
router.patch("/category", authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const { category, username } = req.body;
  const newUsername = username.toLowerCase();
  try {
    const exist = await User.findById(userId);
    if (!exist) {
      return res
        .status(400)
        .json({ success: false, message: "user not found" });
    }

    // If username is provided and different from the current one, check uniqueness
    if (newUsername && newUsername !== exist.username) {
      const usernameExists = await User.findOne({ username: newUsername });
      if (usernameExists) {
        return res
          .status(400)
          .json({ success: false, message: "Username already taken" });
      }
    }

    await User.findByIdAndUpdate(userId, {
      category,
      username: newUsername,
    });

    return res
      .status(200)
      .json({ success: true, message: "Category & Username Added" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Interval Server Error !" });
  }
});

router.get("/getuser", authMiddleware, async (req, res) => {
  const userId = req.user.id;
  try {
    const exist = await User.findById(userId);
    if (!exist) {
      return res
        .status(400)
        .json({ success: false, message: "user not found" });
    }

    // const samePass = await bcrypt.compare(password, exist.password);
    return res
      .status(200)
      .json({
        firstname: exist.firstname,
        lastname: exist.lastname,
        email: exist.email,
        password: exist.password,
      });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Interval Server Error !" });
  }
});

// update user
router.patch("/update", authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const { firstname, lastname, email, password } = req.body;
  try {
    const exist = await User.findById(userId);
    if (!exist) {
      return res
        .status(400)
        .json({ success: false, message: "user not found" });
    }

    const samePass = await bcrypt.compare(password, exist.password);
    if (!samePass) {
      return res
        .status(500)
        .json({ success: false, message: "Wrong Password !" });
    }

    await User.findByIdAndUpdate(userId, {
      firstname,
      lastname,
      email,
      password,
    });

    return res
      .status(200)
      .json({ success: true, message: "Your Details Updated Successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Interval Server Error !" });
  }
});

module.exports = router;
