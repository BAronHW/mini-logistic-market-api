import { Repository } from "typeorm";
import { Farmer } from "../entity/Farmer";
import { AppDataSource } from "../data-source";
import { injectable } from "inversify";
import { Product } from "../entity/Product";

@injectable()
export class FarmerService {

    private farmerRepository: Repository<Farmer>;
    private productRepository: Repository<Product>;

    constructor(){
        this.farmerRepository = AppDataSource.getRepository(Farmer);
        this.productRepository = AppDataSource.getRepository(Product);
    }

    // get all farmers
    async getAllFarmers(): Promise<Farmer[]>{
        return await this.farmerRepository.find({relations: { product: true }})
    }

    async getSingleFarmer(farmerId: number): Promise<Farmer> {
        return await this.farmerRepository.findOne({ where: { id: farmerId }, relations: { product: true } })
    }

    // create a new farmer
    async createNewFarmer(email: string, name: string, products: Product[]): Promise<Farmer>{

        // map over the products array and create new products entry in the db

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

    // delete single farmer by id
    async deleteSingleFarmerById(farmerId: number): Promise<Boolean>{
        const farmerToDelete = await this.farmerRepository.findOne({
            where: {
                id: farmerId
            }
        });
        if (!farmerToDelete) {
            throw new Error(`Farmer with farmerId: ${farmerId} does not exist`);
        }

        await this.farmerRepository.delete(farmerId);
        return true;
    }

    // get farmers product
    async getFarmersProduct(farmerId: number): Promise<Product[]> {
        const farmerById = await this.farmerRepository.findOneByOrFail({
            id: farmerId
        })
        return farmerById.product;
    }

    // update single farmer by id
    async updateSingleFarmerById(farmerId: number, email?: string, name?: string, products?: Product[]): Promise<Farmer> {
        const farmerToUpdate = await this.farmerRepository.findOneByOrFail({
            id: farmerId
        });
        
        if (email !== undefined) {
            farmerToUpdate.email = email;
        }
        
        if (name !== undefined) {
            farmerToUpdate.name = name;
        }
        
        await this.farmerRepository.save(farmerToUpdate);
        
        if (products && products.length > 0) {
            const productRepository = this.productRepository;
            
            await productRepository.delete({ farmer: { id: farmerId } });
            
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