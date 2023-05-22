import { SequelizeOptions } from 'sequelize-typescript';

const databaseConfig: SequelizeOptions = {
  dialect: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  username: process.env.DB_USERNAME || 'your_username',
  password: process.env.DB_PASSWORD || 'your_password',
  database: process.env.DB_DATABASE || 'wine_taster_db',
  models: [__dirname + '/../**/*.entity{.ts,.js}'],
};

export default databaseConfig;
