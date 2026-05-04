import BaseController from './BaseController.js';
import Product from '../models/Product.js';

class ProductController extends BaseController {
  constructor() {
    super();
    this.productModel = new Product();
  }

  getProducts = async (req, res) => {
    try {
      const products = await this.productModel.get();
      return this.success(res, 'All products retrieved successfully', products);
    } catch (error) {
      return this.error(res, error.message);
    }
  };

  getProductById = async (req, res) => {
    try {
      const { id } = req.params;
      const product = await this.productModel.find(id);

      if (!product) {
        return this.error(res, 'Product not found', 404);
      }

      return this.success(res, 'Product detail retrieved successfully', product);
    } catch (error) {
      return this.error(res, error.message);
    }
  };

  createProduct = async (req, res) => {
    try {
      const { name } = req.body;

      if (!name || !name.trim()) {
        return this.error(res, 'Name is required', 400);
      }

      const createdProduct = await this.productModel.create({
        name: name.trim()
      });

      return this.success(res, 'Product created successfully', createdProduct, 201);
    } catch (error) {
      return this.error(res, error.message);
    }
  };

  updateProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;

      if (!name || !name.trim()) {
        return this.error(res, 'Name is required', 400);
      }

      const updatedProduct = await this.productModel.update(id, {
        name: name.trim()
      });

      if (!updatedProduct) {
        return this.error(res, 'Product not found', 404);
      }

      return this.success(res, 'Product updated successfully', updatedProduct);
    } catch (error) {
      return this.error(res, error.message);
    }
  };

  deleteProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await this.productModel.delete(id);

      if (!deleted) {
        return this.error(res, 'Product not found', 404);
      }

      return this.success(res, 'Product deleted successfully');
    } catch (error) {
      return this.error(res, error.message);
    }
  };
}

export default ProductController;
