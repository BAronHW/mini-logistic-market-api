import { Repository } from "typeorm";
import { Farmer } from "../entity/Farmer.js";
import { AppDataSource } from "../data-source.js";
import { injectable } from "inversify";
import { Product } from "../entity/Product.js";

@injectable()
export class FarmerService {

    private farmerRepository: Repository<Farmer>;
    private productRepository: Repository<Product>;

    constructor(){
        this.farmerRepository = AppDataSource.getRepository(Farmer);
        this.productRepository = AppDataSource.getRepository(Product);
    }

    async getAllFarmers(): Promise<Farmer[]>{
        return await this.farmerRepository.find({relations: { 
            product: true 
        }})
    }

    async getSingleFarmer(farmerId: string): Promise<Farmer> {
        const singleFarmer = this.farmerRepository.createQueryBuilder()
        .select()
        .where('id = :id', { id: farmerId })
        .getOne()
        return singleFarmer
    }

    async createNewFarmer(email: string, name: string, products: Product[]): Promise<Farmer>{

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
        })

        await this.productRepository.save(productArray);

        savedFarmer.product = productArray;
        
        return savedFarmer;
    }

    async deleteSingleFarmerById(farmerId: number): Promise<Boolean>{
        await this.farmerRepository.createQueryBuilder()
        .delete()
        .from(Product)
        .where("id = :id", { farmerId })
        .execute();
        return true;
    }

    async getFarmersProduct(farmerId: number): Promise<Product[]> {
        const products = await this.productRepository.createQueryBuilder("product")
            .leftJoinAndSelect("product.farmer", "farmer")
            .where("farmer.id = :farmerId", { farmerId })
            .getMany();
            
        return products;
    }

    async updateSingleFarmerById(farmerId: number, email?: string, name?: string, products?: Product[]): Promise<Farmer> {
        const farmerToUpdate = await this.farmerRepository.createQueryBuilder()
        .select()
        .where("id = :id", { farmerId })
        .execute()
        
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

}