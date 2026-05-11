import BaseController from './BaseController.js';
import ProductService from '../Services/ProductService.js';

class ProductController extends BaseController {
  constructor(productService = new ProductService()) {
    super();
    this.productService = productService;
  }

  getProducts = async (req, res) => {
    try {
      const products = await this.productService.getProducts();
      return this.success(res, 'All products retrieved successfully', products);
    } catch (error) {
      return this.error(res, error.message, error.statusCode);
    }
  };

  getProductById = async (req, res) => {
    try {
      const { id } = req.params;
      const product = await this.productService.getProductById(id);

      if (!product) {
        return this.error(res, 'Product not found', 404);
      }

      return this.success(res, 'Product detail retrieved successfully', product);
    } catch (error) {
      return this.error(res, error.message, error.statusCode);
    }
  };

  createProduct = async (req, res) => {
    try {
      const createdProduct = await this.productService.createProduct(req.body);
      return this.success(res, 'Product created successfully', createdProduct, 201);
    } catch (error) {
      return this.error(res, error.message, error.statusCode);
    }
  };

  updateProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedProduct = await this.productService.updateProduct(id, req.body);

      if (!updatedProduct) {
        return this.error(res, 'Product not found', 404);
      }

      return this.success(res, 'Product updated successfully', updatedProduct);
    } catch (error) {
      return this.error(res, error.message, error.statusCode);
    }
  };

  deleteProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await this.productService.deleteProduct(id);

      if (!deleted) {
        return this.error(res, 'Product not found', 404);
      }

      return this.success(res, 'Product deleted successfully');
    } catch (error) {
      return this.error(res, error.message, error.statusCode);
    }
  };
}

export default ProductController;
