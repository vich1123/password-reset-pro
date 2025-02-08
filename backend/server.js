import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();
app.use(express.json());

// Fix CORS Issue
const allowedOrigins = [
    process.env.CLIENT_URL,  // This will fetch the frontend URL from .env
    "http://localhost:3000" // Allow local development
];

app.use(cors({
    origin: allowedOrigins,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    allowedHeaders: "Content-Type,Authorization",
}));

// Rate limiting for security
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,  // 15 minutes
    max: 100,  // Allow 100 requests per IP
    message: "Too many requests from this IP, please try again later",
});
app.use("/api/auth/forgot-password", limiter);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log(" MongoDB Connected"))
  .catch(err => console.error(" MongoDB Connection Error:", err));

app.use("/api/auth", authRoutes);

// Fix PORT issue on Render
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
