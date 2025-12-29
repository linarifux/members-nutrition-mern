import express from 'express';
import {
  getProducts,
  getProductById,
} from '../controllers/productController.js';

const router = express.Router();

// Route: /api/products
router.route('/').get(getProducts);

// Route: /api/products/:id
router.route('/:id').get(getProductById);

export default router;