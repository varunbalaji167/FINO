const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv");
const cors = require("cors");

const userRoutes = require("./routes/userRoute");
const transactionRoutes = require("./routes/transactionRoute");
const budgetRoutes = require("./routes/budgetRoutes");
const goalRoutes = require("./routes/goalRoutes");
const tipsRoutes = require("./routes/tipsRoute");

const app = express();
env.config();

// CORS setup: allow both localhost and your Render frontend
app.use(
  cors({
    origin: [
      "http://localhost:5173", // Dev frontend
      "https://fino-bwmc.onrender.com", // Prod frontend
    ],
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/tips", tipsRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Atlas Database connected");
  })
  .catch((err) => {
    console.log(err);
  });
