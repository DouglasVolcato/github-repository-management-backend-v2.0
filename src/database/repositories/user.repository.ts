import { userModel } from '../Schemas/user.Schema.js';

export class UserRepository {
  async create(userBody) {
    return await userModel.create(userBody);
  }

  async getByEmail(userEmail) {
    return await userModel
      .findOne({ email: userEmail })
      .select('-securityKeys');
  }

  async getById(userId) {
    return await userModel.findOne({ id: userId });
  }

  async getAll() {
    return await userModel.find().select('-securityKeys');
  }

  async update(userId, userBody) {
    return await userModel
      .findOneAndUpdate({ id: userId }, userBody, {
        new: true,
      })
      .select('-securityKeys');
  }

  async delete(userId) {
    return await userModel
      .findOneAndDelete({ id: userId })
      .select('-securityKeys');
  }
}
