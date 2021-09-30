const users = require("./routes/users");
const posts = require("./routes/posts");
const auth = require("./routes/auth");
const forgotpassword = require("./routes/forgot-password");
const resetpassword = require("./routes/reset-password");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

require("dotenv").config();

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error :"));
db.once("open", function () {
  console.log("connected to database");
});

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/forgot-password", forgotpassword);
app.use("/api/reset-password", resetpassword);
app.use("/api/posts", posts);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port ${port}`));
