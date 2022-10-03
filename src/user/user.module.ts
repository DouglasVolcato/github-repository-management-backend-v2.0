import { Module, MiddlewareConsumer } from '@nestjs/common';
import { Middleware } from 'src/middleware';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(Middleware).forRoutes('user/delete-user');
  }
}
