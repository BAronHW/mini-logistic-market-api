var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { AppDataSource } from "../data-source.js";
import { Product } from "../entity/Product.js";
import { injectable } from "inversify";
import { Farmer } from "../entity/Farmer.js";
let ProductService = class ProductService {
    productRepository;
    farmerRepository;
    constructor() {
        this.productRepository = AppDataSource.getRepository(Product);
        this.farmerRepository = AppDataSource.getRepository(Farmer);
    }
    async getAllProducts() {
        return await this.productRepository.find({ relations: {
                tags: true
            } });
    }
    async getSingleProduct(productId) {
        return await this.productRepository.findOneByOrFail({ id: productId });
    }
    async deleteProduct(productId) {
        const deleteProduct = await this.productRepository.delete(productId);
        if (!deleteProduct) {
            return false;
        }
        return true;
    }
    async createProduct(name, description, price, farmerId) {
        const farmerWhoOwnsProd = await this.farmerRepository.createQueryBuilder().select().where("id = :id", { id: farmerId }).execute();
        const createdProduct = new Product();
        createdProduct.name = name;
        createdProduct.description = description;
        createdProduct.price = price;
        createdProduct.farmer = farmerWhoOwnsProd;
        await this.productRepository.save(createdProduct);
        return createdProduct;
    }
    async updateProductById(productId, name, description, price) {
        console.log('here');
        const productToUpdate = await this.productRepository
            .createQueryBuilder()
            .select('product')
            .from(Product, 'product')
            .where('product.id = :id', { id: productId })
            .getOne();
        productToUpdate.name = name;
        productToUpdate.description = description;
        productToUpdate.price = price;
        const savedUpdatedFarmer = await this.productRepository.save(productToUpdate);
        console.log(savedUpdatedFarmer);
        return savedUpdatedFarmer;
    }
};
ProductService = __decorate([
    injectable(),
    __metadata("design:paramtypes", [])
], ProductService);
export { ProductService };
//# sourceMappingURL=product.services.js.map