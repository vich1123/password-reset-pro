import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import nodemailer from "nodemailer";
import crypto from "crypto";
import dotenv from "dotenv";
import asyncHandler from "express-async-handler";

dotenv.config();
const router = express.Router();

// REGISTER ROUTE
router.post("/register", asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Register error:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
}));

// LOGIN ROUTE
router.post("/login", asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        console.error("User not found:", email);
        return res.status(401).json({ message: "Invalid credentials" });
    }

    console.log("Stored Hashed Password in DB:", user.password);
    console.log("Entered Password:", password);

    try {
        // Ensure password is a plain string, not hashed
        if (password.startsWith("$2a$")) {
            console.error("Entered password is already hashed, skipping bcrypt.compare.");
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password Match Status:", isMatch);

        if (!isMatch) {
            console.error("Password does not match!");
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        console.log("Login successful, token generated");

        res.status(200).json({ token, message: "Login successful" });
    } catch (error) {
        console.error("Error during password comparison:", error);
        res.status(500).json({ message: "Server error" });
    }
}));


// FORGOT PASSWORD ROUTE
router.post("/forgot-password", asyncHandler(async (req, res) => {
    const { email } = req.body;
    
    console.log("Forgot password request received for email:", email);
    
    const user = await User.findOne({ email });

    if (!user) {
        console.error("User not found for forgot password:", email);
        return res.status(404).json({ message: "User not found" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 3600000;
    await user.save();

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    console.log("Reset Link Sent:", resetLink);

    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Password Reset Request",
            text: `Click here to reset your password: ${resetLink}`,
        });

        res.status(200).json({ message: "Reset email sent" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "Failed to send reset email" });
    }
}));

// RESET PASSWORD ROUTE
router.post("/reset-password/:token", asyncHandler(async (req, res) => {
    const { password } = req.body;
    const { token } = req.params;

    const user = await User.findOne({
        resetToken: token,
        resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
        console.error("Invalid or expired reset token:", token);
        return res.status(400).json({ message: "Invalid or expired token" });
    }

    console.log("Existing stored hashed password before reset:", user.password);
    console.log("New password before hashing:", password);

    // Ensure password is not already hashed
    if (password.startsWith("$2a$")) {
        console.error("Password is already hashed! Skipping hashing step.");
        return res.status(400).json({ message: "Invalid password reset process" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("New hashed password:", hashedPassword);

    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpiry = null;
    await user.save();

    // Verify stored hash
    const updatedUser = await User.findById(user._id);
    console.log("Stored Hashed Password in DB after reset:", updatedUser.password);

    res.json({ message: "Password successfully reset!" });
}));


export default router;
