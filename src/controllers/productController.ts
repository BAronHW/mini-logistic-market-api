import { inject, injectable } from "inversify";
import { ProductService } from "../services/product.services";
import { Request, Response } from "express";

@injectable()
export class productController{
    private productService: ProductService;
    constructor(
        @inject(ProductService)
        productService: ProductService
    ){
        this.productService = productService;
    }

    public getAllProducts = async (req: Request, res: Response) => {
        const allProducts = await this.productService.getAllProducts();
        res.status(200).json({ allProducts });
        return;
    }
}