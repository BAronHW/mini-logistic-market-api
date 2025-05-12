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
import { productController } from "../controllers/productController.js";
import { inject, injectable } from "inversify";
let productRouter = class productRouter {
    _router;
    productController;
    constructor(productController) {
        this._router = Router({ strict: true });
        this.productController = productController;
        this.init();
    }
    init() {
        this.router.get('/', this.productController.getAllProducts);
        this.router.get('/:id', this.productController.getSingleProduct);
        this.router.delete('/:id', this.productController.deleteSingleProduct);
        this.router.post('/', this.productController.createProduct);
        this.router.put('/:id', this.productController.updateProduct);
    }
    get router() {
        return this._router;
    }
};
productRouter = __decorate([
    injectable(),
    __param(0, inject(productController)),
    __metadata("design:paramtypes", [productController])
], productRouter);
export { productRouter };
//# sourceMappingURL=productRouter.js.map