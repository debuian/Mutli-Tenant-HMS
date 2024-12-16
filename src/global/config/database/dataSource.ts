// src\global\config\database\dataSource.ts
import { DataSource } from 'typeorm';
import { DatabaseConfig } from '../index';

const options = DatabaseConfig();
const dataSource = new DataSource(options);

module.exports = dataSource;
