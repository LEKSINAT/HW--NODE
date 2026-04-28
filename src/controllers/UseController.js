import UserModel from '../models/users.js';

class UserController {
  async getUsers(req, res) {
    try {
      const users = await UserModel.getAllUsers();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async createUser(req, res) {
    try {
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({ error: 'Name is required' });
      }

      const createdUser = await UserModel.createUser({ name });
      return res.status(201).json(createdUser);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({ error: 'Name is required' });
      }

      const result = await UserModel.updateUser(id, { name });

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.status(200).json({ id: Number(id), name });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const result = await UserModel.deleteUser(id);

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default UserController;
