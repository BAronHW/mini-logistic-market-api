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
        return await this.farmerRepository.find()
    }

    // create a new farmer
    async createNewFarmer(email: string, name: string, products: Product[]){

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
    async deleteSingleFarmerById(farmerId: number) {
        const farmerToDelete = await this.farmerRepository.findOne({
            where: {
                id: farmerId
            }
        });
        if (!farmerToDelete) {
            throw new Error(`Farmer with farmerId: ${farmerId} does not exist`);
        }
        await this.productRepository.delete({ farmer: { id: farmerId } });
        await this.farmerRepository.delete(farmerId);
        return true;
    }

    // get farmers product
    async getFarmersProduct(farmerId: number) {
        const farmerById = await this.farmerRepository.findOneByOrFail({
            id: farmerId
        })
        return farmerById.product;
    }

    // update single farmer by id
    async updateSingleFarmerById(farmerId: number, email?: string, name?: string, products?: Product[]) {

        const farmerToUpdate = await this.farmerRepository
        .createQueryBuilder()
        .update(Farmer)
        .set({ email: email, name: name, product: products })
        .where("id = :id", { id: farmerId })
        .execute()
        return farmerToUpdate;
    }

}