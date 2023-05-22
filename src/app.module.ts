import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { WineModule } from './modules/wine/wine.module';
import databaseConfig from './config/database.config';

@Module({
  imports: [SequelizeModule.forRoot(databaseConfig), WineModule],
})
export class AppModule {}
