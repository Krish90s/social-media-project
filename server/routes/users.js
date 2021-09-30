const { User, validate } = require("../models/user");
const auth = require("../middleware/auth");
const _ = require("lodash");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/svg+xml",
  ];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({
  storage: storage,
  limites: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter,
});

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id)
    .select("-password")
    .populate("following", "_id name")
    .populate("followers", "_id name")
    .exec();
  res.send(user);
});

router.get("/:id", auth, async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).send("User not Found");
  res.send(user);
});

router.get("/find-people/:id", auth, async (req, res) => {
  let user = await User.findById(req.params.id).select("-password");
  let following = user.following;
  following.push({ name: user.name, photo: user.photo, userId: user._id });

  let followIds = [];
  following.map((f) => followIds.push(f.userId));

  try {
    let users = await User.find({ _id: { $nin: followIds } }).select(
      "-password"
    );
    res.send(users);
  } catch (err) {
    return res.status(400).send("Something Went Wrong");
  }
});

router.get("/people/:id", auth, async (req, res) => {
  let user = await User.findById(req.params.id).select("-password");
  if (!user) return res.status(404).send("User not Found");
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered");

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = jwt.sign(
    { _id: user._id, name: user.name, sub: user.email },
    process.env.JWT_KEY
  );

  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(_.pick(user, ["_id", "name", "email"]));
});

router.put(
  "/profile-setup/:id",
  auth,
  upload.single("photo"),
  async (req, res) => {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        livesIn: req.body.livesIn,
        about: req.body.about,
        gender: req.body.gender,
        dateOfBirth: req.body.dateOfBirth,
        photo: req.file.filename,
      },
      { new: true }
    );

    if (!user) return res.status(404).send("User not Found");
    user.livesIn = req.body.livesIn;
    user.about = req.body.about;
    user.gender = req.body.gender;
    user.dateOfBirth = req.body.dateOfBirth;
    user.photo = req.file.filename;

    res.send("Profile Setup SuccessFul");
  }
);

router.put("/follow", auth, async (req, res) => {
  let from = await User.findById(req.body.userId).select("-password");
  let to = await User.findById(req.body.followId).select("-password");

  let following = { name: to.name, photo: to.photo, userId: to._id };
  let follower = { name: from.name, photo: from.photo, userId: from._id };

  await User.findByIdAndUpdate(
    req.body.userId,
    {
      $push: { following: following },
    },
    { new: true }
  );

  let result = await User.findByIdAndUpdate(
    req.body.followId,
    { $push: { followers: follower } },
    { new: true }
  );

  res.send(result);
});

router.put("/unfollow", auth, async (req, res) => {
  // let from = await User.findById(req.body.userId).select("-password");
  // let to = await User.findById(req.body.unfollowId).select("-password");

  await User.findByIdAndUpdate(
    { _id: req.body.userId },
    {
      $pull: { following: { userId: req.body.unfollowId } },
    }
  );

  let result = await User.findByIdAndUpdate(
    { _id: req.body.unfollowId },
    { $pull: { followers: { userId: req.body.userId } } },
    { new: true }
  ).exec();

  res.send(result);
});

module.exports = router;
