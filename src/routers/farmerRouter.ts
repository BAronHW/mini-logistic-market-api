import { Router } from "express";
import { FarmerController } from "../controllers/farmerController.js";
import { inject } from "inversify";

export class FarmerRouter{
    private readonly _router: Router;
    private farmerController: FarmerController;

    constructor(
        @inject(FarmerController)
        farmerController: FarmerController
    ){
        this._router = Router({ strict: true });
        this.farmerController = farmerController;
        this.init();
    }

    private init(): void {
        this.router.get('/', this.farmerController.getAllFarmers);
        this.router.post('/', this.farmerController.createNewFarmer);
        this.router.delete('/:id', this.farmerController.deleteExistingFarmer);
        this.router.get('/:id', this.farmerController.getSingleFarmer);
        this.router.put('/:id', this.farmerController.updateExistingFarmer);
    }

    public get router(): Router {
        return this._router;
    }
}