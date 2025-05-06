import { Router } from "express";
import { FarmerController } from "../controllers/farmerController";

export class FarmerRouter{
    private readonly _router: Router;
    private farmerController: FarmerController;

    constructor(farmerController: FarmerController){
        this._router = Router({ strict: true });
        this.farmerController = farmerController;
        this.init();
    }

    private init(): void{
        this.router.get('/', this.farmerController.getAllFarmers);
    }

    public get router(): Router {
        return this._router;
    }
}