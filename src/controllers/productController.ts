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
        try {
            const allProducts = await this.productService.getAllProducts();
            res.status(200).json({ allProducts });
            return;

        }catch(error) {
            res.status(500).send({ message: 'Internal server error', error: error.message });   
        }
        
    }

    public getSingleProduct = async (req: Request, res: Response) => {
        try {
            const productId = parseInt(req.params.id);
            const singleProduct = await this.productService.getSingleProduct(productId);
            res.status(200).json({ singleProduct });
            return;
        }catch(error){
            res.status(500).send({ message: 'Internal server error', error: error.message });
        }
        
    }

    public deleteSingleProduct = async (req: Request, res: Response) => {
        try {
            const productId = parseInt(req.params.id);
            const deletedProd = await this.productService.deleteProduct(productId);
            res.status(200).json({ deletedProd });
            return;
        }catch(error){
            res.status(500).send({ message: 'Internal server error', error: error.message });
        }
        
    }

    public createProduct = async (req: Request, res: Response) => {
        try {
            const { name, description, price, farmerId } = req.body;
            const createdProduct = await this.productService.createProduct(name, description, price, farmerId);
            res.status(200).json({ createdProduct });
            return;    
        }catch(error){
            res.status(500).send({ message: 'Internal server error', error: error.message });
        }
        
    }

    public updateProduct = async (req: Request, res: Response) => {
        try{
            const productId = parseInt(req.params.id);
            console.log(productId);
            const { name, description, price } = req.body;
            console.log(name, description, price)
            const updateProduct = await this.productService.updateProductById(productId, name, description, price);
            res.status(200).json({ updateProduct });
            return;
        }catch(error) {
            res.status(500).send({ message: 'Internal server error', error: error.message });
        }
    }

} 