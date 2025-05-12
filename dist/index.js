import { App } from "./app.js";
import "reflect-metadata";
import { AppDataSource } from "./data-source.js";
import { FarmerController } from "./controllers/farmerController.js";
import { FarmerService } from "./services/farmer.services.js";
import { FarmerRouter, productRouter, TagRouter } from "./routers/index.js";
import { Container } from "inversify";
import { productController } from "./controllers/productController.js";
import { ProductService } from "./services/product.services.js";
import 'dotenv/config.js';
import { TagController } from "./controllers/tagController.js";
import { TagService } from "./services/tag.services.js";
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
//# sourceMappingURL=index.js.map