import { Module } from '@nestjs/common';
import { SecurityKeyController } from './security-key.controller';
import { SecurityKeyService } from './security-key.service';

@Module({
  controllers: [SecurityKeyController],
  providers: [SecurityKeyService]
})
export class SecurityKeyModule {}
