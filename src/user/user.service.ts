import { Injectable } from '@nestjs/common';
import User from '../entities/user.entity';
import { UserRepository } from '../database/repositories/user.repository';

@Injectable()
export class UserService {
  async create(userBody) {
    const user = new User(userBody);
    user.validate();
    return await UserRepository.create(user.getUser());
  }

  async delete(userId) {
    return await UserRepository.delete(userId);
  }

  async getAll() {
    return await UserRepository.getAll();
  }

  async getByEmail(userEmail) {
    return await UserRepository.getByEmail(userEmail);
  }

  async getById(userId) {
    return await UserRepository.getById(userId);
  }

  async update(userId, userBody, oldUserBody) {
    const userObj = new User(Object.assign(oldUserBody, userBody));
    return await UserRepository.update(userId, userObj.getUser());
  }
}
