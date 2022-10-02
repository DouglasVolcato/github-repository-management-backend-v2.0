import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MongoDbConnection } from './database/connection/connect';
import { config } from 'dotenv';

async function bootstrap() {
  config();
  const app = await NestFactory.create(AppModule);
  MongoDbConnection.connectDb();
  await app.listen(3000, () => console.log('http://localhost:3000'));
}
bootstrap();
