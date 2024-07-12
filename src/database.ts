// src/database.ts
import {db_host,db_name,db_port,db_password,db_user,db_schema} from "./config";
import { Sequelize } from 'sequelize';

export default new Sequelize({
  dialect: 'postgres',
  host: db_host,
  port: db_port,
  database: db_name,
  username: db_user,
  password: db_password,
  schema: db_schema
});

