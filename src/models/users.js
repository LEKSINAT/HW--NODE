import db from '../config/db.js';

class UserModel {
  static async getAllUsers() {
    const [rows] = await db.execute('SELECT * FROM users');
    return rows;
  }

  static async getUserById(id) {
    const [rows] = await db.execute(
      'SELECT * FROM users WHERE id = ?',
      [id]
    );

    return rows[0] || null;
  }

  static async createUser(userData) {
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

  static async updateUser(id, userData) {
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

  static async deleteUser(id) {
    const [result] = await db.execute(
      'DELETE FROM users WHERE id = ?',
      [id]
    );

    return result.affectedRows > 0;
  }
}

export default UserModel;
