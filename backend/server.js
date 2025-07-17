const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const habitRoutes = require("./routes/habitRoutes");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/habits", habitRoutes);

// Database
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Databse Connected");
    app.listen(PORT, () => console.log(`Server running on  port ${PORT}`));
  })
  .catch((err) => console.error(err));
