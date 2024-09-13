import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "",
  password: "",
  database: "mind",
  entities: ["src/models/*.ts"],
  logging: true,
  synchronize: true,
});
