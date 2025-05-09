import { App } from "./app";
import "reflect-metadata"
import { AppDataSource } from "./data-source";
import { Farmer } from "./entity/Farmer";
import { FarmerController } from "./controllers/farmerController";
import { FarmerService } from "./services/farmer.services";
import { FarmerRouter, productRouter, TagRouter } from "./routers";
import { Container } from "inversify";
import { container } from "./inversify.config";
import { productController } from "./controllers/productController";
import { ProductService } from "./services/product.services";
import 'dotenv/config';
import { TagController } from "./controllers/tagController";
import { TagService } from "./services/tag.services";

AppDataSource.initialize()
  .then(() => {
    const container = new Container();
    container.bind(FarmerService).toSelf();
    container.bind(FarmerController).toSelf();
    container.bind(FarmerRouter).toSelf();
    container.bind(ProductService).toSelf();
    container.bind(productController).toSelf();
    container.bind(productRouter).toSelf();
    container.bind(TagService).toSelf();
    container.bind(TagController).toSelf();
    container.bind(TagRouter).toSelf();
    container.bind(App).toSelf();
    
    const application = container.get(App);
    
    application.app.listen(process.env.PORT || 3000, () => {
        console.log(`Server running on port ${process.env.PORT || 3000}`);
    });
  })
  .catch(error => console.log("Error during Data Source initialization:", error));