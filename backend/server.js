import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // Parse JSON body
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// CORS Configuration
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected Successfully');
    } catch (error) {
        console.error('MongoDB Connection Failed:', error);
        process.exit(1); // Exit process on failure
    }
};

// Health Check Route
app.get('/', (req, res) => {
    res.status(200).send('Server is running');
});

// API Routes
app.use('/api/auth', authRoutes);

// Start the Server
const PORT = process.env.PORT || 5001;

app.listen(PORT, async () => {
    await connectDB(); // Ensure DB connection before starting
    console.log(`Server is running on port ${PORT}`);
});
