import { Router } from 'express';
import ProductController from '../controllers/ProductController.js';

const router = Router();
const productController = new ProductController();

router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

export default router;
