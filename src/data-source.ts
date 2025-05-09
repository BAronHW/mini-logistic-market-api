import "reflect-metadata"
import { DataSource } from "typeorm"
import { Farmer } from "./entity/Farmer"
import { Product } from "./entity/Product"
import 'dotenv/config'
import { Tag } from "./entity/Tag"

export const AppDataSource = new DataSource({
    type: 'cockroachdb',
    host: process.env.DB_HOST || "cockroachdb",
    port: parseInt(process.env.DB_PORT) || 26257,
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "sampledb",
    synchronize: true,
    logging: true,
    entities: [Farmer, Product, Tag],
    migrations: ['src/migrations/*.ts'],
    migrationsTableName: '_migrations',
    subscribers: [],
    timeTravelQueries: false,
    ssl: false
})

console.log("Database connection config:", {
    host: process.env.DB_HOST || "cockroachdb",
    port: parseInt(process.env.DB_PORT || "26257"),
    database: process.env.DB_NAME || "defaultdb",
    username: process.env.DB_USER || "root",
    type: 'cockroachdb'
});
