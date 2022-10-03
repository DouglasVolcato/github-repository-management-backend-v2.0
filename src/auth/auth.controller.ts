import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

interface loginBody {
  email: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: loginBody) {
    try {
      const { email, password } = body;

      if (!email || !password) {
        throw new Error('Invalid email or password.');
      }

      const foundUser = await this.authService.getByEmail(email);

      if (!foundUser) {
        throw new Error('Email not found.');
      }

      const verify = this.authService.verifyPassword(password, foundUser);

      const token = this.authService.generateToken(foundUser.id);

      if (verify === true) {
        return { token: token, userId: foundUser.id };
      } else {
        throw new Error('Wrong password.');
      }
    } catch (err) {
      return { message: 'There was an error in Login. ' + err };
    }
  }
}
