import db from '../config/db.js';
import BaseModel from './BaseModel.js';

class User extends BaseModel {
  async get() {
    const [rows] = await db.execute('SELECT * FROM users');
    return rows;
  }

  async create(userData) {
    const { name } = userData;
    const [result] = await db.execute(
      'INSERT INTO users (name) VALUES (?)',
      [name]
    );

    return {
      id: result.insertId,
      name
    };
  }

  async update(id, userData) {
    const { name } = userData;
    const [result] = await db.execute(
      'UPDATE users SET name = ? WHERE id = ?',
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
      'DELETE FROM users WHERE id = ?',
      [id]
    );

    return result.affectedRows > 0;
  }

  async find(id) {
    const [rows] = await db.execute(
      'SELECT * FROM users WHERE id = ?',
      [id]
    );

    return rows[0] || null;
  }
}

export default User;
