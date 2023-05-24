import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ORMConfig } from './config/database.config';
import { UserModule } from './modules/user/user.module';
import { WineModule } from './modules/wine/wine.module';

@Module({
  imports: [TypeOrmModule.forRoot(ORMConfig), UserModule, WineModule],
})
export class AppModule {}
