import * as dotenv from "dotenv";
dotenv.config();
import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST,
  port: 5432,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  logging: true,
  entities: [],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/migration/**/*.ts"],
});
