import { Injectable } from '@nestjs/common';
import SecurityKey from '../entities/securityKey.entity';
import { SecurityKeyRepository } from '../database/repositories/securityKey.repository';

@Injectable()
export class SecurityKeyService {
  async create(userEmail, arrKeys) {
    const arr = [];

    for (const key of arrKeys) {
      const newKey = new SecurityKey(key);
      newKey.validate();
      arr.push({ ...newKey.getKey() });
    }

    const data = await SecurityKeyRepository.addKeys(userEmail, arr);
    return data;
  }

  async editPassword(userEmail, newPassword) {
    return await SecurityKeyRepository.editPassword(userEmail, newPassword);
  }

  async getAll(userEmail) {
    const keys = await SecurityKeyRepository.getKeys(userEmail);
    return keys.securityKeys;
  }
}
