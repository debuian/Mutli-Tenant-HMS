//src\global\config\database\typeorm.config.ts
import { registerAs } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';

export default registerAs('databaseConfig', (): DataSourceOptions => {
  return {
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    username: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'Maiya_$0980', // Use environment variable for password
    database: process.env.POSTGRES_DATABASE || 'MTHMS',
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['database/migrations/*{.ts,.js}'], //list of migrations that need to be loaded by TypeORM
  };
});
