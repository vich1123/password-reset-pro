import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";

dotenv.config();
const app = express();

const allowedOrigins = [
  "https://resett-password.netlify.app", 
  "http://localhost:3000",
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

connectDB();

// Routes
app.use("/api/auth", authRoutes);

// Default Route (to prevent "Cannot GET /")
app.get("/", (req, res) => {
  res.send("Password Reset API is running.");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
