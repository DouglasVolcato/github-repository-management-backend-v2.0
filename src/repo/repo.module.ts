import { Module, MiddlewareConsumer } from '@nestjs/common';
import { RepoController } from './repo.controller';
import { RepoService } from './repo.service';
import { Middleware } from 'src/middleware';

@Module({
  controllers: [RepoController],
  providers: [RepoService],
})
export class RepoModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(Middleware)
      .forRoutes(
        'repo/create-repository',
        'repo/delete-repository/:name',
        'repo/get-all-repository',
        'repo/update-repository/:name',
      );
  }
}
