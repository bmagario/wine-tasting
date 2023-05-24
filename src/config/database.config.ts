import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
// import { User } from 'src/modules/user/domain/entities/user.entity';
// import { Wine } from '../modules/wine/domain/entities/wine.entity';
// import { WineTasting } from 'src/modules/wine/domain/entities/wine-tasting.entity';

export const ORMConfig: MysqlConnectionOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [`${__dirname}/**/*.entity{.ts,.js}`],
  synchronize: true,
};
