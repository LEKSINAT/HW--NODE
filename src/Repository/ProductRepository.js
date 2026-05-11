import Product from '../Models/Product.js';

class ProductRepository {
  constructor(productModel = new Product()) {
    this.productModel = productModel;
  }

  async getAll() {
    return this.productModel.get();
  }

  async findById(id) {
    return this.productModel.find(id);
  }

  async create(productData) {
    return this.productModel.create(productData);
  }

  async update(id, productData) {
    return this.productModel.update(id, productData);
  }

  async delete(id) {
    return this.productModel.delete(id);
  }
}

export default ProductRepository;
