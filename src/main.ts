import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MongoDbConnection } from './database/connection/connect';
import { config } from 'dotenv';

async function bootstrap() {
  config();
  const app = await NestFactory.create(AppModule);
  MongoDbConnection.connectDb();
  const port = process.env.PORT || 3001;
  await app.listen(port, () => console.log('http://localhost:' + port));
}
bootstrap();
