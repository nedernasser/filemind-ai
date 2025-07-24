import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.use(bodyParser.json({ limit: '10mb' }));
  await app.listen(3000);
  console.log('🚀 Backend listening on http://localhost:3000');
}
bootstrap().catch((err) => {
  console.error('Error starting the server:', err);
  process.exit(1);
});
