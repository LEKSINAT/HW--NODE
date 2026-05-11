import BaseController from './BaseController.js';
import UserService from '../Services/UserService.js';

class UserController extends BaseController {
  constructor(userService = new UserService()) {
    super();
    this.userService = userService;
  }

  getUsers = async (req, res) => {
    try {
      const users = await this.userService.getUsers();
      return this.success(res, 'All users retrieved successfully', users);
    } catch (error) {
      return this.error(res, error.message, error.statusCode);
    }
  };

  getUserById = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await this.userService.getUserById(id);

      if (!user) {
        return this.error(res, 'User not found', 404);
      }

      return this.success(res, 'User detail retrieved successfully', user);
    } catch (error) {
      return this.error(res, error.message, error.statusCode);
    }
  };

  createUser = async (req, res) => {
    try {
      const createdUser = await this.userService.createUser(req.body);
      return this.success(res, 'User created successfully', createdUser, 201);
    } catch (error) {
      return this.error(res, error.message, error.statusCode);
    }
  };

  updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedUser = await this.userService.updateUser(id, req.body);

      if (!updatedUser) {
        return this.error(res, 'User not found', 404);
      }

      return this.success(res, 'User updated successfully', updatedUser);
    } catch (error) {
      return this.error(res, error.message, error.statusCode);
    }
  };

  deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await this.userService.deleteUser(id);

      if (!deleted) {
        return this.error(res, 'User not found', 404);
      }

      return this.success(res, 'User deleted successfully');
    } catch (error) {
      return this.error(res, error.message, error.statusCode);
    }
  };
}

export default UserController;
