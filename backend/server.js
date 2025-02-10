import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";

dotenv.config();
const app = express();

// Allowed Frontend URLs
const allowedOrigins = [
    process.env.CLIENT_URL,
    "http://localhost:3000",
    "https://password-reset-pro.netlify.app"
];

// CORS Configuration
app.use(cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());

// Fix Strict Query Warning
mongoose.set("strictQuery", true);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log(" MongoDB Connected Successfully");
}).catch(err => {
    console.error(" MongoDB Connection Error:", err);
});

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
