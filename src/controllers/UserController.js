import BaseController from './BaseController.js';
import UserModel from '../models/users.js';

class UserController extends BaseController {
  getUsers = async (req, res) => {
    try {
      const users = await UserModel.getAllUsers();
      return this.success(res, 'All users retrieved successfully', users);
    } catch (error) {
      return this.error(res, error.message);
    }
  };

  getUserById = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await UserModel.getUserById(id);

      if (!user) {
        return this.error(res, 'User not found', 404);
      }

      return this.success(res, 'User detail retrieved successfully', user);
    } catch (error) {
      return this.error(res, error.message);
    }
  };

  createUser = async (req, res) => {
    try {
      const { name } = req.body;

      if (!name || !name.trim()) {
        return this.error(res, 'Name is required', 400);
      }

      const createdUser = await UserModel.createUser({ name: name.trim() });
      return this.success(res, 'User created successfully', createdUser, 201);
    } catch (error) {
      return this.error(res, error.message);
    }
  };

  updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;

      if (!name || !name.trim()) {
        return this.error(res, 'Name is required', 400);
      }

      const updatedUser = await UserModel.updateUser(id, { name: name.trim() });

      if (!updatedUser) {
        return this.error(res, 'User not found', 404);
      }

      return this.success(res, 'User updated successfully', updatedUser);
    } catch (error) {
      return this.error(res, error.message);
    }
  };

  deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await UserModel.deleteUser(id);

      if (!deleted) {
        return this.error(res, 'User not found', 404);
      }

      return this.success(res, 'User deleted successfully');
    } catch (error) {
      return this.error(res, error.message);
    }
  };
}

export default UserController;
