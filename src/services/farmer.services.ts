import { Repository } from "typeorm";
import { Farmer } from "../entity/Farmer";
import { AppDataSource } from "../data-source";
import { injectable } from "inversify";

@injectable()
export class FarmerService {

    private farmerRepository: Repository<Farmer>;

    constructor(){
        this.farmerRepository = AppDataSource.getRepository(Farmer);
    }

    async getAllFarmers(): Promise<Farmer[]>{
        return await this.farmerRepository.find()
    }

    async createNewFarmer(email: string, name: string){
        const newFarmer = new Farmer();
        newFarmer.email = email;
        newFarmer.name = name;
        await this.farmerRepository.save(newFarmer);
        return 
    }

    async deleteSingleFarmerById(farmerId: number) {
        const farmerToDelete = await this.farmerRepository.findOneByOrFail({
            id: farmerId
        })
        await this.farmerRepository.delete(farmerToDelete);
    }

}