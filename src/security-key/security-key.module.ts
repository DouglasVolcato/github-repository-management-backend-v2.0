import { Module, MiddlewareConsumer } from '@nestjs/common';
import { SecurityKeyController } from './security-key.controller';
import { SecurityKeyService } from './security-key.service';
import { Middleware } from '../middleware';

@Module({
  controllers: [SecurityKeyController],
  providers: [SecurityKeyService],
})
export class SecurityKeyModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(Middleware).forRoutes('security/create-security-keys');
  }
}
