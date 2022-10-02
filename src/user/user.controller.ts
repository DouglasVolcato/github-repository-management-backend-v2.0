import { Controller, Post, Body } from '@nestjs/common';
import User from '../entities/user.entity';
import { UserRepository } from '../database/repositories/user.repository';

interface bodyUserCreation {
  name: string;
  email: string;
  password: string;
  photo: string;
}

@Controller('user')
export class UserController {
  @Post('create-user')
  async createUser(@Body() body: bodyUserCreation) {
    try {
      const userBody = body;

      if (!userBody) {
        throw new Error('There is no body in request.');
      }

      if (userBody.password.length < 6) {
        throw new Error('The password must have, at least, 6 characters.');
      }

      const user = new User(userBody);
      user.validate();
      const newUser = await UserRepository.create(user.getUser());

      if (!newUser) {
        throw new Error('Error creating user.');
      }

      return newUser;
    } catch (err) {
      return { message: 'Error creating user. ' + err };
    }
  }
}
