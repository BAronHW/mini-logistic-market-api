var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { inject, injectable } from "inversify";
import { FarmerService } from "../services/farmer.services.js";
let FarmerController = class FarmerController {
    farmerService;
    constructor(farmerService) {
        this.farmerService = farmerService;
    }
    getAllFarmers = async (req, res) => {
        try {
            const allFarmers = await this.farmerService.getAllFarmers();
            res.status(200).json({ allFarmers: allFarmers });
            return;
        }
        catch (error) {
            console.log(error);
            res.status(500).send({ message: 'Internal server error', error: error.message });
        }
    };
    getSingleFarmer = async (req, res) => {
        try {
            const id = req.params.id;
            const farmer = await this.farmerService.getSingleFarmer(id);
            res.status(200).json({ farmer });
            return;
        }
        catch (error) {
            console.log(error);
            res.status(500).send({ message: 'Internal server error', error: error.message });
        }
    };
    createNewFarmer = async (req, res) => {
        try {
            const { email, name, products } = req.body;
            const newFarmer = await this.farmerService.createNewFarmer(email, name, products);
            res.status(201).json({ newFarmer });
            return;
        }
        catch (error) {
            console.log(error);
            res.status(500).send({ message: 'Internal server error', error: error.message });
        }
    };
    deleteExistingFarmer = async (req, res) => {
        try {
            const farmerToDeleteId = parseInt(req.params.id);
            await this.farmerService.deleteSingleFarmerById(farmerToDeleteId);
            res.status(200).json({ message: "Farmer deleted successfully" });
            return;
        }
        catch (error) {
            console.log(error);
            res.status(500).send({ message: 'Internal server error', error: error.message });
        }
    };
    updateExistingFarmer = async (req, res) => {
        try {
            const farmerToUpdate = parseInt(req.params.id);
            const { name, email, products } = req.body;
            const updatedFarmer = await this.farmerService.updateSingleFarmerById(farmerToUpdate, email, name, products);
            res.status(200).json({ updatedFarmer });
            return;
        }
        catch (error) {
            console.log(error);
            res.status(500).send({ message: 'Internal server error', error: error.message });
        }
    };
};
FarmerController = __decorate([
    injectable(),
    __param(0, inject(FarmerService)),
    __metadata("design:paramtypes", [FarmerService])
], FarmerController);
export { FarmerController };
//# sourceMappingURL=farmerController.js.map