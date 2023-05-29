import { User } from 'src/modules/user/domain/entities/user.entity';
import { Wine } from '../modules/wine/domain/entities/wine.entity';
import { WineTasting } from 'src/modules/wine/domain/entities/wine-tasting.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const ORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  // entities: [`${__dirname}/**/modules/*/domain/entities/*.entity{.ts,.js}`],
  // autoLoadEntities: true,
  entities: [User, Wine, WineTasting],
  synchronize: true,
};
