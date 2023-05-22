// main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Sequelize } from 'sequelize-typescript';
import databaseConfig from './config/database.config';

import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const sequelize = new Sequelize(databaseConfig);
  await sequelize.sync();

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
