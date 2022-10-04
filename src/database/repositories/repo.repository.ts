import { userModel } from '../schemas/user.schema';

export class RepoRepository {
  static async create(userId, repoBody) {
    return await userModel
      .findOneAndUpdate(
        { id: userId },
        { $push: { repositories: repoBody } },
        { new: true },
      )
      .select('-securityKeys');
  }

  static async getAll(userId) {
    return await userModel.findOne({ id: userId }).select('-securityKeys');
  }

  static async update(userId, nameRepo, repoBody) {
    await userModel
      .findOneAndUpdate(
        { id: userId },
        { $pull: { repositories: { name: nameRepo } } },
      )
      .select('-securityKeys');

    return await userModel
      .findOneAndUpdate(
        { id: userId },
        { $push: { repositories: repoBody } },
        { new: true },
      )
      .select('-securityKeys');
  }

  static async delete(userId, nameRepo) {
    return await userModel
      .findOneAndUpdate(
        { id: userId },
        { $pull: { repositories: { name: nameRepo } } },
      )
      .select('-securityKeys');
  }
}
