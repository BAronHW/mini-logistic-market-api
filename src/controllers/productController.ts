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

    public getSingleProduct = async (req: Request, res: Response) => {
        const productId = parseInt(req.params.id);
        const singleProduct = await this.productService.getSingleProduct(productId);
        res.status(200).json({ singleProduct });
        return;
    }

    public deleteSingleProduct = async (req: Request, res: Response) => {
        const productId = parseInt(req.params.id);
        const deletedProd = await this.productService.deleteProduct(productId);
        res.status(200).json({ deletedProd });
        return;
    }

    public createProduct = async (req: Request, res: Response) => {
        const { name, description, price, farmer } = req.body;
        const createdProduct = await this.productService.createProduct(name, description, price, farmer);
        res.status(200).json({ createdProduct });
        return;
    }

}