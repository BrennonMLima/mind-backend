import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "BrennonLima",
  password: "Brennon_123",
  database: "mind",
  entities: ["src/models/*.ts"],
  logging: false,
  synchronize: true,
});
