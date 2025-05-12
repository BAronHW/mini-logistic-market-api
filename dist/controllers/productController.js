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
import { inject, injectable } from "inversify";
import { ProductService } from "../services/product.services.js";
let productController = class productController {
    productService;
    constructor(productService) {
        this.productService = productService;
    }
    getAllProducts = async (req, res) => {
        try {
            const allProducts = await this.productService.getAllProducts();
            res.status(200).json({ allProducts });
            return;
        }
        catch (error) {
            res.status(500).send({ message: 'Internal server error', error: error.message });
        }
    };
    getSingleProduct = async (req, res) => {
        try {
            const productId = parseInt(req.params.id);
            const singleProduct = await this.productService.getSingleProduct(productId);
            res.status(200).json({ singleProduct });
            return;
        }
        catch (error) {
            res.status(500).send({ message: 'Internal server error', error: error.message });
        }
    };
    deleteSingleProduct = async (req, res) => {
        try {
            const productId = parseInt(req.params.id);
            const deletedProd = await this.productService.deleteProduct(productId);
            res.status(200).json({ deletedProd });
            return;
        }
        catch (error) {
            res.status(500).send({ message: 'Internal server error', error: error.message });
        }
    };
    createProduct = async (req, res) => {
        try {
            const { name, description, price, farmerId } = req.body;
            const createdProduct = await this.productService.createProduct(name, description, price, farmerId);
            res.status(200).json({ createdProduct });
            return;
        }
        catch (error) {
            res.status(500).send({ message: 'Internal server error', error: error.message });
        }
    };
    updateProduct = async (req, res) => {
        try {
            const productId = parseInt(req.params.id);
            console.log(productId);
            const { name, description, price } = req.body;
            console.log(name, description, price);
            const updateProduct = await this.productService.updateProductById(productId, name, description, price);
            res.status(200).json({ updateProduct });
            return;
        }
        catch (error) {
            res.status(500).send({ message: 'Internal server error', error: error.message });
        }
    };
};
productController = __decorate([
    injectable(),
    __param(0, inject(ProductService)),
    __metadata("design:paramtypes", [ProductService])
], productController);
export { productController };
//# sourceMappingURL=productController.js.map