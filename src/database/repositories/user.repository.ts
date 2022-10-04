import { userModel } from '../schemas/user.schema';

export class UserRepository {
  static async create(userBody) {
    return await userModel.create(userBody);
  }

  static async getByEmail(userEmail) {
    return await userModel
      .findOne({ email: userEmail })
      .select('-securityKeys');
  }

  static async getById(userId) {
    return await userModel.findOne({ id: userId });
  }

  static async getAll() {
    return await userModel.find().select('-securityKeys');
  }

  static async update(userId, userBody) {
    return await userModel
      .findOneAndUpdate({ id: userId }, userBody, {
        new: true,
      })
      .select('-securityKeys');
  }

  static async delete(userId) {
    return await userModel
      .findOneAndDelete({ id: userId })
      .select('-securityKeys');
  }
}
