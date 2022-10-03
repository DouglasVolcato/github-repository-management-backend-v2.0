import { userModel } from '../Schemas/user.Schema.js';

export class AuthRepository {
  static async getByEmail(userEmail) {
    return await userModel
      .findOne({ email: userEmail })
      .select('+password')
      .select('-securityKeys');
  }
  static async getById(userId) {
    return await userModel.findOne({ id: userId }).select('-securityKeys');
  }
}
