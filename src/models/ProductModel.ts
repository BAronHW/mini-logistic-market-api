import { Farmer } from "./FarmerModel.js"

export interface Product {
    
    name: string

    description: string
    
    price: number

    farmer: Farmer

    updatedAt: Date

}