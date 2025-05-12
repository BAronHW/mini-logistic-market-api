var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Farmer } from "../entity/Farmer.js";
import { AppDataSource } from "../data-source.js";
import { injectable } from "inversify";
import { Product } from "../entity/Product.js";
let FarmerService = class FarmerService {
    farmerRepository;
    productRepository;
    constructor() {
        this.farmerRepository = AppDataSource.getRepository(Farmer);
        this.productRepository = AppDataSource.getRepository(Product);
    }
    async getAllFarmers() {
        return await this.farmerRepository.find({ relations: {
                product: true
            } });
    }
    async getSingleFarmer(farmerId) {
        const singleFarmer = this.farmerRepository.createQueryBuilder()
            .select()
            .where('id = :id', { id: farmerId })
            .getOne();
        return singleFarmer;
    }
    async createNewFarmer(email, name, products) {
        const newFarmer = new Farmer();
        newFarmer.email = email;
        newFarmer.name = name;
        const savedFarmer = await this.farmerRepository.save(newFarmer);
        const productArray = products.map((product) => {
            const newProduct = new Product();
            newProduct.name = product.name;
            newProduct.price = product.price;
            newProduct.description = product.description;
            newProduct.farmer = savedFarmer;
            return newProduct;
        });
        await this.productRepository.save(productArray);
        savedFarmer.product = productArray;
        return savedFarmer;
    }
    async deleteSingleFarmerById(farmerId) {
        await this.farmerRepository.createQueryBuilder()
            .delete()
            .from(Product)
            .where("id = :id", { farmerId })
            .execute();
        return true;
    }
    async getFarmersProduct(farmerId) {
        const products = await this.productRepository.createQueryBuilder("product")
            .leftJoinAndSelect("product.farmer", "farmer")
            .where("farmer.id = :farmerId", { farmerId })
            .getMany();
        return products;
    }
    async updateSingleFarmerById(farmerId, email, name, products) {
        const farmerToUpdate = await this.farmerRepository.createQueryBuilder()
            .select()
            .where("id = :id", { farmerId })
            .execute();
        if (email !== undefined) {
            farmerToUpdate.email = email;
        }
        if (name !== undefined) {
            farmerToUpdate.name = name;
        }
        await this.farmerRepository.save(farmerToUpdate);
        if (products && products.length > 0) {
            const productRepository = this.productRepository;
            // Fix: Use createQueryBuilder for more complex conditions
            await productRepository.createQueryBuilder()
                .delete()
                .from(Product)
                .where("farmerId = :farmerId", { farmerId })
                .execute();
            const newProducts = products.map(productData => {
                const product = new Product();
                product.name = productData.name;
                product.description = productData.description;
                product.price = productData.price;
                product.farmer = farmerToUpdate;
                return product;
            });
            await productRepository.save(newProducts);
            farmerToUpdate.product = newProducts;
        }
        return farmerToUpdate;
    }
};
FarmerService = __decorate([
    injectable(),
    __metadata("design:paramtypes", [])
], FarmerService);
export { FarmerService };
//# sourceMappingURL=farmer.services.js.map