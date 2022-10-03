import { userModel } from '../Schemas/user.Schema.js';

export class SecurityKeyRepository {
  static async addKeys(userEmail, arrKeys) {
    return await userModel
      .findOneAndUpdate(
        { email: userEmail },
        { securityKeys: [...arrKeys] },
        { new: true },
      )
      .select('-securityKeys');
  }

  static async getKeys(userEmail) {
    return await userModel.findOne({ email: userEmail });
  }

  static async editPassword(userEmail, newPassword) {
    return await userModel
      .findOneAndUpdate(
        { email: userEmail },
        { password: newPassword },
        { new: true },
      )
      .select('-securityKeys');
  }
}
