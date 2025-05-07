import { Farmer } from "./FarmerModel"

export interface Product {
    
    name: string

    description: string
    
    price: number

    farmer: Farmer

    updatedAt: Date

}