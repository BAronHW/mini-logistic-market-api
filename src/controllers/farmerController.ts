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
        try {
            const allFarmers = await this.farmerService.getAllFarmers();
            res.status(200).json({allFarmers: allFarmers});
            return
        } catch (error: any) {
            console.log(error);
            res.status(500).send({ message: 'Internal server error', error: error.message });
        }
        
    }
    
    public getSingleFarmer = async (req: Request, res: Response) => {
        try{
            const id  = parseInt(req.params.id)
            const farmer = await this.farmerService.getSingleFarmer(id)
            res.status(200).json({ farmer });
            return;
        }catch(error){
            console.log(error);
            res.status(500).send({ message: 'Internal server error', error: error.message });
        }
    }

    public createNewFarmer = async (req: Request, res: Response) => {
        try {
            const { email, name, products } = req.body;
            const newFarmer = await this.farmerService.createNewFarmer(email, name, products);
            res.status(201).json({ newFarmer });
            return;   
        }catch (error: any){
            console.log(error);
            res.status(500).send({ message: 'Internal server error', error: error.message });
        }
    }

    public deleteExistingFarmer = async (req: Request, res: Response) => {
        try {
            const farmerToDeleteId = parseInt(req.params.id);
            await this.farmerService.deleteSingleFarmerById(farmerToDeleteId);
            res.status(200).json({ message: "Farmer deleted successfully" });
            return;    
        }catch(error: any) {
            console.log(error);
            res.status(500).send({ message: 'Internal server error', error: error.message });
        }
    }

    public updateExistingFarmer = async (req: Request, res: Response) => {
        try {
            const farmerToUpdate = parseInt(req.params.id);
            const { name, email, products } = req.body;
            const updatedFarmer = await this.farmerService.updateSingleFarmerById(farmerToUpdate, email, name, products)
            res.status(200).json({ updatedFarmer });
            return;
        }catch(error: any) {
            console.log(error);
            res.status(500).send({ message: 'Internal server error', error: error.message });
        }
    }

}