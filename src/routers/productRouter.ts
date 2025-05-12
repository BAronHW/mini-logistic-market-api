import { Router } from "express";
import { productController } from "../controllers/productController.js";
import { inject, injectable } from "inversify";

@injectable()
export class productRouter{
    private readonly _router: Router;
    private productController: productController;

    constructor(
        @inject(productController)
        productController: productController
    ){
        this._router = Router({ strict: true });
        this.productController = productController;
        this.init()

    }

    private init() {
        this.router.get('/', this.productController.getAllProducts);
        this.router.get('/:id', this.productController.getSingleProduct);
        this.router.delete('/:id', this.productController.deleteSingleProduct);
        this.router.post('/', this.productController.createProduct);
        this.router.put('/:id', this.productController.updateProduct);
    }

    public get router(): Router {
        return this._router;
    }
}