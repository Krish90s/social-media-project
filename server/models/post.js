const { commentSchema } = require("./comment");
const mongoose = require("mongoose");

const Post = new mongoose.model(
  "Post",
  new mongoose.Schema({
    text: { type: String, required: "Text is Required" },
    photo: { type: String, required: "Photo is Required" },
    likes: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
    comments: [commentSchema],
    postedBy: { type: mongoose.Schema.ObjectId, ref: "User" },
    userPhoto: { type: String, required: true },
    userName: { type: String, required: true },
    created: { type: Date, default: Date.now },
  })
);

exports.Post = Post;
