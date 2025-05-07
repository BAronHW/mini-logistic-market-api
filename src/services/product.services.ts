import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Product } from "../entity/Product";
import { injectable } from "inversify";
import { Farmer } from "../entity/Farmer";


@injectable()
export class ProductService {
    private productRepository: Repository<Product>;

    constructor() {
        this.productRepository = AppDataSource.getRepository(Product);
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

    // update prod based on id
    // create a product
    /**
     * 
     * 
     * import { Farmer } from "./FarmerModel"
     
     export interface Product {
         
         name: string
     
         description: string
         
         price: number
     
         farmer: Farmer
     
         updatedAt: Date
     
     }
     */

    async createProduct(name: string, description: string, price: number, farmer?: Farmer): Promise<Product> {
        const createdProduct = new Product();
        createdProduct.name = name;
        createdProduct.description = description;
        createdProduct.price = price;
        createdProduct.farmer = farmer;
        return createdProduct;
    }
}