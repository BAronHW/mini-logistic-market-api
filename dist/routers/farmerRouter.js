var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Router } from "express";
import { FarmerController } from "../controllers/farmerController.js";
import { inject } from "inversify";
let FarmerRouter = class FarmerRouter {
    _router;
    farmerController;
    constructor(farmerController) {
        this._router = Router({ strict: true });
        this.farmerController = farmerController;
        this.init();
    }
    init() {
        this.router.get('/', this.farmerController.getAllFarmers);
        this.router.post('/', this.farmerController.createNewFarmer);
        this.router.delete('/:id', this.farmerController.deleteExistingFarmer);
        this.router.get('/:id', this.farmerController.getSingleFarmer);
        this.router.put('/:id', this.farmerController.updateExistingFarmer);
    }
    get router() {
        return this._router;
    }
};
FarmerRouter = __decorate([
    __param(0, inject(FarmerController)),
    __metadata("design:paramtypes", [FarmerController])
], FarmerRouter);
export { FarmerRouter };
//# sourceMappingURL=farmerRouter.js.map