import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MongoDbConnection } from './database/connection/connect';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { config } from 'dotenv';
config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  MongoDbConnection.connectDb();

  const config = new DocumentBuilder()
    .setTitle('Repository Management API')
    .setDescription('Repository management service for Github repositories.')
    .setVersion('2.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT || 3001;
  await app.listen(port, () => console.log('http://localhost:' + port));
}
bootstrap();
