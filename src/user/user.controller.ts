import {
  Controller,
  Post,
  Body,
  Delete,
  Get,
  Param,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';

interface bodyUserCreation {
  name: string;
  email: string;
  password: string;
  photo: string;
}

interface bodyUserUpdate {
  name?: string;
  email?: string;
  password?: string;
  photo?: string;
  userId: string;
}

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

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

      const foundUser = await this.userService.getByEmail(userBody.email);

      if (foundUser) {
        throw new Error('Email already exists in database.');
      }

      const newUser = await this.userService.create(userBody);

      if (!newUser) {
        throw new Error('Error creating user.');
      }

      return newUser;
    } catch (err) {
      return { message: 'Error creating user. ' + err };
    }
  }

  @Delete('delete-user')
  async deleteUser(@Body() body: { userId: string }) {
    try {
      const userId = body.userId;

      if (!userId) {
        throw new Error('There is no id in request.');
      }
      const deletedUser = await this.userService.delete(userId);

      if (!deletedUser) {
        throw new Error('User not found to delete.');
      }

      return deletedUser;
    } catch (err) {
      return { message: 'Error deleting user. ' + err };
    }
  }

  @Get('get-all-user')
  async getAllUser() {
    try {
      const userList = await this.userService.getAll();

      if (!userList) {
        throw new Error('There are no users to show.');
      }

      return userList;
    } catch (err) {
      return { message: 'Error getting users. ' + err };
    }
  }

  @Get('get-by-email-user/:email')
  async getUserByEmail(@Param('email') email: string) {
    try {
      const userEmail = email;

      if (!userEmail) {
        throw new Error('Invaid email in request.');
      }

      const foundUser = await this.userService.getByEmail(userEmail);

      if (!foundUser) {
        throw new Error('User not found.');
      }

      return foundUser;
    } catch (err) {
      return { message: 'Error getting user. ' + err };
    }
  }

  @Get('get-by-id-user/:id')
  async getUserById(@Param('id') id: string) {
    try {
      const userId = id;

      if (!userId) {
        throw new Error('Invaid email in request.');
      }

      const foundUser = await this.userService.getById(userId);

      if (!foundUser) {
        throw new Error('User not found.');
      }

      return foundUser;
    } catch (err) {
      return { message: 'Error getting user. ' + err };
    }
  }

  @Put('update-user')
  async updateUser(@Body() body: bodyUserUpdate) {
    try {
      const userId = body.userId;
      const userBody = body;

      if (!userId || !userBody) {
        throw new Error('Incomplete request.');
      }

      if (userBody.password !== undefined && userBody.password) {
        if (userBody.password.length < 6) {
          throw new Error('The password must have, at least, 6 characters.');
        }
      }

      const foundUser = await this.userService.getById(userId);

      const updatedUser = await this.userService.update(
        userId,
        userBody,
        foundUser,
      );

      if (!updatedUser) {
        throw new Error('User not updated.');
      }

      return updatedUser;
    } catch (err) {
      return { message: 'Error updating user. ' + err };
    }
  }
}
