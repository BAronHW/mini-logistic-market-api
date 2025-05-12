import "reflect-metadata";
import { DataSource } from "typeorm";
import { Farmer } from "./entity/Farmer.js";
import { Product } from "./entity/Product.js";
import 'dotenv/config.js';
import { Tag } from "./entity/Tag.js";
export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || "cockroachdb",
    port: parseInt(process.env.DB_PORT) || 26257,
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "sampledb",
    synchronize: true,
    logging: false,
    entities: [Farmer, Product, Tag],
    migrations: [],
    migrationsTableName: '_migrations',
    subscribers: [],
    ssl: false
});
console.log("Database connection config:", {
    host: process.env.DB_HOST || "cockroachdb",
    port: parseInt(process.env.DB_PORT || "26257"),
    database: process.env.DB_NAME || "defaultdb",
    username: process.env.DB_USER || "root",
    type: 'cockroachdb'
});
//# sourceMappingURL=data-source.js.map