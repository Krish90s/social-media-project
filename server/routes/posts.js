const { Post } = require("../models/post");
const { User } = require("../models/user");
const auth = require("../middleware/auth");
const _ = require("lodash");
const express = require("express");
const router = express.Router();
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

router.post("/new/:userId", auth, upload.single("photo"), async (req, res) => {
  let post = new Post();

  post.text = req.body.text;
  post.photo = req.file.filename;
  post.postedBy = req.params.userId;
  post.userName = req.body.userName;
  post.userPhoto = req.body.userPhoto;
  post.likes = [];
  post.comments = [];

  post = await post.save();
  res.send(post);
});

router.get("/by/:userId", auth, async (req, res) => {
  try {
    let posts = await Post.find({ postedBy: req.params.userId })
      .populate("comments.postedBy", "_id name")
      .populate("postedBy", "_id name")
      .sort("-created")
      .exec();
    res.send(posts);
  } catch (error) {
    return res.status(400).send("error Occured");
  }
});

router.get("/feed/:userId", auth, async (req, res) => {
  let user = await User.findById(req.params.userId);
  let following = user.following;
  following.push(user._id);

  let posts = await Post.find({ postedBy: { $in: user.following } })
    .sort("-created")
    .exec();
  res.send(posts);
});

router.put("/like", auth, async (req, res) => {
  try {
    let result = await Post.findByIdAndUpdate(
      req.body.postId,
      { $push: { likes: req.body.userId } },
      { new: true }
    );
    res.send(result);
  } catch (error) {
    return res.status(400).send("error Occured");
  }
});

router.put("/unlike", auth, async (req, res) => {
  try {
    let result = await Post.findByIdAndUpdate(
      req.body.postId,
      { $pull: { likes: req.body.userId } },
      { new: true }
    );
    res.send(result);
  } catch (err) {
    return res.status(400).send("error Occured");
  }
});

router.put("/comment", auth, async (req, res) => {
  let comment = {
    name: req.body.name,
    photo: req.body.photo,
    comment: req.body.comment,
    postedBy: req.body.postedBy,
  };
  let result = await Post.findByIdAndUpdate(
    req.body.postId,
    { $push: { comments: comment } },
    { new: true }
  );

  res.send(result);
});

router.put("/uncomment", auth, async (req, res) => {
  let comment = req.body.comment;
  try {
    let result = await Post.findByIdAndUpdate(
      req.body.postId,
      { $pull: { comments: { _id: comment._id } } },
      { new: true }
    )
      .populate("comments.postedBy", "_id name")
      .populate("postedBy", "_id name")
      .exec();
    res.send(result);
  } catch (err) {
    return res.status(400).send("error Occured");
  }
});

router.delete("/:id", auth, async (req, res) => {
  const post = await Post.findByIdAndRemove(req.params.id);
  if (!post) return res.status(404).send("Post not Found");
  res.send(post);
});

module.exports = router;
