import { userModel } from '../schemas/user.schema';

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
