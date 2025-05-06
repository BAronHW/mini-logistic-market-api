import "reflect-metadata"
import { DataSource } from "typeorm"
import { Farmer } from "./entity/Farmer"
import { Product } from "./entity/Product"

export const AppDataSource = new DataSource({
    type: "cockroachdb",
    host: "localhost",
    port: 26257,
    username: "root",
    password: "",
    database: "defaultdb",
    synchronize: true,
    logging: false,
    entities: [Farmer, Product],
    migrations: [],
    subscribers: [],
    timeTravelQueries: false
})
