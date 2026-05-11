import ProductRepository from '../Repository/ProductRepository.js';

class ProductService {
  constructor(productRepository = new ProductRepository()) {
    this.productRepository = productRepository;
  }

  async getProducts() {
    return this.productRepository.getAll();
  }

  async getProductById(id) {
    return this.productRepository.findById(id);
  }

  async createProduct(productData) {
    const name = this.#validateName(productData?.name);
    return this.productRepository.create({ name });
  }

  async updateProduct(id, productData) {
    const name = this.#validateName(productData?.name);
    return this.productRepository.update(id, { name });
  }

  async deleteProduct(id) {
    return this.productRepository.delete(id);
  }

  #validateName(name) {
    if (!name || !name.trim()) {
      throw this.#createError('Name is required', 400);
    }

    return name.trim();
  }

  #createError(message, statusCode) {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
  }
}

export default ProductService;
