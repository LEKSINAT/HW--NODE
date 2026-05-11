import User from '../Models/User.js';

class UserRepository {
  constructor(userModel = new User()) {
    this.userModel = userModel;
  }

  async getAll() {
    return this.userModel.get();
  }

  async findById(id) {
    return this.userModel.find(id);
  }

  async create(userData) {
    return this.userModel.create(userData);
  }

  async update(id, userData) {
    return this.userModel.update(id, userData);
  }

  async delete(id) {
    return this.userModel.delete(id);
  }
}

export default UserRepository;
