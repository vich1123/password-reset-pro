import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User.js";

dotenv.config();


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        const hashedPassword = await bcrypt.hash('include123', 10);
        const user = new User({
            email: 'vimalan0223@gmail.com',
            password: hashedPassword,
        });

        await user.save();
        console.log('Test user added successfully');
        mongoose.disconnect();
    })
    .catch((err) => console.error('Error connecting to MongoDB:', err));
