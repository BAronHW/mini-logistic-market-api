import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Product } from "../entity/Product";
import { injectable } from "inversify";
import { Farmer } from "../entity/Farmer";


@injectable()
export class ProductService {
    private productRepository: Repository<Product>;
    private farmerRepository: Repository<Farmer>;

    constructor() {
        this.productRepository = AppDataSource.getRepository(Product);
        this.farmerRepository = AppDataSource.getRepository(Farmer);
    }

    async getAllProducts(): Promise<Product[]> {
        return await this.productRepository.find();
    }

    async getSingleProduct(productId): Promise<Product> {
        return await this.productRepository.findOneByOrFail({id: productId});
    }

    async deleteProduct(productId): Promise<boolean> {
        const deleteProduct = await this.productRepository.delete(productId)
        if(!deleteProduct){
            return false;
        }
        return true;
    }

    async createProduct(name: string, description: string, price: number, farmerId: number): Promise<Product> {
        const farmerWhoOwnsProd = await this.farmerRepository.findOneByOrFail({ id: farmerId });
        const createdProduct = new Product();
        createdProduct.name = name;
        createdProduct.description = description;
        createdProduct.price = price;
        createdProduct.farmer = farmerWhoOwnsProd;
        await this.productRepository.save(createdProduct);
        return createdProduct;
    }
}