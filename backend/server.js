import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db.js";
import authRoutes from "./auth.js";

dotenv.config();

// Connect to Database
connectDB();

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.get("/", (req, res) => {
    res.send("Server is running");
});

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
