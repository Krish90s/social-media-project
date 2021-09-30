const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  name: { type: String, trim: true, required: true },
  photo: { type: String, required: true },
  comment: { type: String, required: true },
  created: { type: Date, default: Date.now },
  postedBy: { type: String },
});

const Comment = new mongoose.model("Comment", commentSchema);

exports.commentSchema = commentSchema;
exports.Comment = Comment;
