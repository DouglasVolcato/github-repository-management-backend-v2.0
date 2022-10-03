import { Injectable } from '@nestjs/common';
import { AuthRepository } from 'src/database/repositories/auth.repository';
import bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  async getByEmail(userEmail) {
    return AuthRepository.getByEmail(userEmail);
  }

  async getById(userId) {
    return AuthRepository.getById(userId);
  }

  verifyPassword(password, user) {
    const result = bcrypt.compareSync(password, user.password);
    return result === true ? true : false;
  }

  generateToken(userId) {
    return jwt.sign({ id: userId }, process.env.SECRET, {
      expiresIn: 86400,
    });
  }
}
