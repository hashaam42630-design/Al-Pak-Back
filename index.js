import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'; // Added CORS

import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';

dotenv.config();

// Note: Ensure your Railway Variable is named MONGO to match process.env.MONGO
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB! 🚀');
  })
  .catch((err) => {
    console.log('Database connection error:', err);
  });

const app = express();

// Middleware
app.use(cors()); // Allows your Vercel frontend to access this API
app.use(express.json({ limit: '10mb' }));

// Routes
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);

// Error Handling Middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// START THE SERVER
// We removed the 'if' statement so it runs in BOTH local and production
const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}!`);
});

export default app;