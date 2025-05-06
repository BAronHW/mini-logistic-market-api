import { injectable } from "inversify";
import { FarmerService } from "../services/farmer.Services";
import { Request, Response } from "express";

@injectable()
export class FarmerController{
    private farmerService: FarmerService

    constructor(
        farmerService: FarmerService
    ){ 
        this.farmerService = farmerService
    }

    public getAllFarmers = async (req: Request, res: Response) => {
        const allFarmers = await this.farmerService.getAllFarmers();
        res.status(200).json({allFarmers: allFarmers})
        return
    }


}