import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();
app.use(express.json());

const allowedOrigins = [
    process.env.CLIENT_URL,  // Netlify frontend URL
    "http://localhost:3000"  // Local development
];

app.use(cors({
    origin: allowedOrigins,
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// Root endpoint for API status
app.get("/", (req, res) => {
    res.send("API is running...");
});

// Rate limiter for security
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
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
