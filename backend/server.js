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
    origin: allowedOrigins, // Allow only your frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow cookies, authentication headers
  })
);

app.use(express.json());

connectDB();

// Routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
