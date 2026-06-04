const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");

dotenv.config();

// Connect MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.send("Job Board API Running...");
});

// Auth Routes
app.use("/api/auth", authRoutes);

// Job Routes
app.use("/api/jobs", jobRoutes);

// Application Routes
app.use("/api/applications", applicationRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});