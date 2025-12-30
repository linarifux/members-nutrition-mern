import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js'; 

const router = express.Router();

router.route('/')
  .get(getProducts)
  .post(protect, admin, createProduct); // <--- Admin Only

router.route('/:id')
  .get(getProductById)
  .put(protect, admin, updateProduct)   // <--- Admin Only
  .delete(protect, admin, deleteProduct); // <--- Admin Only

export default router;