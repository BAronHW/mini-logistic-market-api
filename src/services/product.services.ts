import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Product } from "../entity/Product";
import { injectable } from "inversify";

@injectable()
export class ProductService {
    private productRepository: Repository<Product>;

    constructor() {
        this.productRepository = AppDataSource.getRepository(Product);
    }

    async getAllProducts(): Promise<Product[]> {
        return await this.productRepository.find();
    }
}