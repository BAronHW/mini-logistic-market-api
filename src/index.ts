import { App } from "./app";
import "reflect-metadata"
import { AppDataSource } from "./data-source";
import { Farmer } from "./entity/Farmer";
import { FarmerController } from "./controllers/farmerController";
import { FarmerService } from "./services/farmer.Services";
import { FarmerRouter } from "./routers";
import { Container } from "inversify";
import { container } from "./inversify.config";

AppDataSource.initialize()
  .then(() => {
    const farmerService = new FarmerService();
    const farmerController = new FarmerController(farmerService);
    const farmerRouter = new FarmerRouter(farmerController);
    const marketApp = new App(farmerRouter);
    
    marketApp.app.listen(3000, () => {
        console.log(`Server running on port 3000`);
    });
  })
  .catch(error => console.log("Error during Data Source initialization:", error));