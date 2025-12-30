import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB from './config/db.js'; // Note the .js extension
import { notFound, errorHandler } from './middleware/errorMiddleware.js';


import productRoutes from './routes/productRoutes.js'; // <--- ADD THIS
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js'; // <--- Import
import uploadRoutes from './routes/uploadRoutes.js'



// Load env vars
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(express.json()); 
app.use(cors());         
app.use(helmet());       

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes); // <--- Add Route

// upload image
app.use('/api/upload', uploadRoutes)

// PayPal Config Route
app.get('/api/config/paypal', (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

// Error Handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});