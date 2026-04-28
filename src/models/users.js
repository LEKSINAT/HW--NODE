import db from '../config/db.js';

class UserModel {
  static async getAllUsers() {
    const [rows] = await db.execute('SELECT * FROM users');
    return rows;
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
    const params = [name, id];
    const [result] = await db.execute(
      'UPDATE users SET name = ? WHERE id = ?',
      params
    );

    return result;
  }

  static async deleteUser(id) {
    const [result] = await db.execute(
      'DELETE FROM users WHERE id = ?',
      [id]
    );

    return result;
  }
}

export default UserModel;
