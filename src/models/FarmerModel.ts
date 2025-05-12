import { Product } from "./ProductModel.js"
// maybe implement some DTO of some sort
export interface Farmer {

    name: string
    
    email: string

    products: Product[]

    updatedAt: Date

    createdAt: Date

}