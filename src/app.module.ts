import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RepoModule } from './repo/repo.module';
import { SecurityKeyModule } from './security-key/security-key.module';

@Module({
  imports: [UserModule, AuthModule, RepoModule, SecurityKeyModule],
})
export class AppModule {}
