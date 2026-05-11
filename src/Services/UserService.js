import UserRepository from '../Repository/UserRepository.js';

class UserService {
  constructor(userRepository = new UserRepository()) {
    this.userRepository = userRepository;
  }

  async getUsers() {
    return this.userRepository.getAll();
  }

  async getUserById(id) {
    return this.userRepository.findById(id);
  }

  async createUser(userData) {
    const name = this.#validateName(userData?.name);
    return this.userRepository.create({ name });
  }

  async updateUser(id, userData) {
    const name = this.#validateName(userData?.name);
    return this.userRepository.update(id, { name });
  }

  async deleteUser(id) {
    return this.userRepository.delete(id);
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

export default UserService;
