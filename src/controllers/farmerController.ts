import { inject, injectable } from "inversify";
import { FarmerService } from "../services/farmer.services";
import { Request, Response } from "express";
import { error } from "console";

@injectable()
export class FarmerController{
    private farmerService: FarmerService

    constructor(
        @inject(FarmerService)
        farmerService: FarmerService
    ){ 
        this.farmerService = farmerService
    }

    public getAllFarmers = async (req: Request, res: Response) => {
        const allFarmers = await this.farmerService.getAllFarmers();
        res.status(200).json({allFarmers: allFarmers});
        return
    }
    
    public getSingleFarmer = async (req: Request, res: Response) => {
        try{
            const id  = parseInt(req.params.id)
            const farmer = await this.farmerService.getSingleFarmer(id)
            res.status(200).json({ farmer });
            return;
        }catch(error){
            throw new Error(error)
        }
    }

    public createNewFarmer = async (req: Request, res: Response) => {
        const { email, name, products } = req.body;
        const newFarmer = await this.farmerService.createNewFarmer(email, name, products);
        res.status(201).json({ newFarmer });
        return;
    }

    public deleteExistingFarmer = async (req: Request, res: Response) => {
        const farmerToDeleteId = parseInt(req.params.id);
        await this.farmerService.deleteSingleFarmerById(farmerToDeleteId);
        res.status(200).json({ message: "Farmer deleted successfully" });
        return;
    }

}