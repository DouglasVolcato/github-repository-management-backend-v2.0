import { Controller, Post, Body } from '@nestjs/common';
import { SecurityKeyService } from './security-key.service';
import { hashSync, compareSync } from 'bcryptjs';

interface createSecurityKeyBody {
  keys: string[];
  email: string;
}

interface recoverPassword {
  email: string;
  password: string;
  keys: string[];
}

@Controller('security')
export class SecurityKeyController {
  constructor(private readonly securityKeyService: SecurityKeyService) {}

  @Post('/create-security-keys')
  async createSecurityKey(@Body() body: createSecurityKeyBody) {
    try {
      const userEmail = body.email;
      const keysBody = body.keys;

      if (!userEmail || !keysBody) {
        throw new Error('Invalid request.');
      }

      if (keysBody.length !== 3) {
        throw new Error('Create 3 security keys.');
      }

      if (keysBody[0] === keysBody[1] || keysBody[1] === keysBody[2]) {
        throw new Error('The keys must be different.');
      }

      const foundKeys = await this.securityKeyService.getAll(userEmail);

      if (foundKeys.length === 3) {
        throw new Error('Security keys already registered for this id.');
      }

      const newKeys = await this.securityKeyService.create(userEmail, [
        ...keysBody,
      ]);

      if (!newKeys) {
        throw new Error('Error in creating security keys.');
      }

      return newKeys;
    } catch (err) {
      return { message: 'Error creating security keys. ' + err };
    }
  }

  @Post('get-security-key-references')
  async getAllSecurityKeyReferences(@Body() body: { email: string }) {
    try {
      const userEmail = body.email;

      if (!userEmail) {
        throw new Error('Invalid id in request.');
      }

      const refList = await this.securityKeyService
        .getAll(userEmail)
        .then((data) => data.map((item) => item.reference));

      if (!refList) {
        throw new Error('Security key reference list is empty.');
      }

      return refList;
    } catch (err) {
      return { message: 'Error getting secutity key reference list. ' + err };
    }
  }

  @Post('recover-password')
  async editPasswordByEmailController(@Body() body: recoverPassword) {
    try {
      const userEmail = body.email;
      const newPassword = body.password;
      const keys = body.keys;

      if (!userEmail || !newPassword || !keys) {
        throw new Error('Missing fields in request.');
      }

      if (newPassword.length < 6) {
        throw new Error('The password must have, at least, 6 characters.');
      }

      if (keys[0] === keys[1] || keys[1] === keys[2]) {
        throw new Error('The keys must be different.');
      }

      const foundKeys = await this.securityKeyService
        .getAll(userEmail)
        .then((data) => data.map((item) => item.key));

      if (!foundKeys) {
        throw new Error('Security keys not found for this email.');
      }

      for (const key of keys) {
        let count = 0;

        for (const foundKey of foundKeys) {
          if (compareSync(key, foundKey) === true) {
            count++;
          }
        }
        if (count === 0) {
          throw new Error('Wrong key(s).');
        }
      }

      const editedUser = await this.securityKeyService.editPassword(
        userEmail,
        hashSync(newPassword, 10),
      );

      if (!foundKeys) {
        throw new Error('User not found.');
      }

      return editedUser;
    } catch (err) {
      return { message: 'There was an error updating password. ' + err };
    }
  }
}
