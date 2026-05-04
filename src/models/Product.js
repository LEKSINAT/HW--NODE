import db from '../config/db.js';
import BaseModel from './BaseModel.js';

class Product extends BaseModel {
  async get() {
    const [rows] = await db.execute('SELECT * FROM products');
    return rows;
  }

  async create(productData) {
    const { name } = productData;
    const [result] = await db.execute(
      'INSERT INTO products (name) VALUES (?)',
      [name]
    );

    return {
      id: result.insertId,
      name
    };
  }

  async update(id, productData) {
    const { name } = productData;
    const [result] = await db.execute(
      'UPDATE products SET name = ? WHERE id = ?',
      [name, id]
    );

    if (result.affectedRows === 0) {
      return null;
    }

    return {
      id: Number(id),
      name
    };
  }

  async delete(id) {
    const [result] = await db.execute(
      'DELETE FROM products WHERE id = ?',
      [id]
    );

    return result.affectedRows > 0;
  }

  async find(id) {
    const [rows] = await db.execute(
      'SELECT * FROM products WHERE id = ?',
      [id]
    );

    return rows[0] || null;
  }
}

export default Product;
