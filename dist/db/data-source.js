"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "BrennonLima",
    password: "Brennon_123",
    database: "mind",
    entities: ["src/models/*.ts"],
    logging: true,
    synchronize: true,
});
