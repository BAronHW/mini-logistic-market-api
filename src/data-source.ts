import "reflect-metadata"
import { DataSource } from "typeorm"
import { Farmer } from "./entity/Farmer"
import { Product } from "./entity/Product"
import 'dotenv/config'
import { Tag } from "./entity/Tag"

export default new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || "cockroachdb",
    port: parseInt(process.env.DB_PORT) || 26257,
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "sampledb",
    synchronize: false,
    logging: true,
    entities: [Farmer, Product, Tag],
    migrations: ['build/*{.ts,.js}'],
    migrationsTableName: '_migrations',
    subscribers: [],
    ssl: false
    
})

console.log("Database connection config:", {
    host: process.env.DB_HOST || "cockroachdb",
    port: parseInt(process.env.DB_PORT || "26257"),
    database: process.env.DB_NAME || "defaultdb",
    username: process.env.DB_USER || "root",
    type: 'cockroachdb'
});
