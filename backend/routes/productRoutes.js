import express from 'express'
import { getProducts , getProductById, deleteProduct } from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();


//URL starts with '/api/products'
router.route('/').get(getProducts)

router.route('/:id').get(getProductById)
                    .delete(protect, admin, deleteProduct)

export default router