import { Module, MiddlewareConsumer } from '@nestjs/common';
import { Middleware } from '../middleware';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(Middleware)
      .forRoutes(
        'user/delete-user',
        'user/get-all-user',
        'user/get-by-email-user/:email',
        'user/get-by-id-user/:id',
        'user/update-user',
      );
  }
}
