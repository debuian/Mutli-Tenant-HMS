// src\global\config\database\dataSource.ts
import { DataSource } from 'typeorm';
import { DatabaseConfig } from '../index';

const options = DatabaseConfig();
const dataSource = new DataSource({
  migrations: ['database/migrations/*{.ts,.js}'],
  ...options, //list of migrations that need to be loaded by TypeORM
});

module.exports = dataSource;
