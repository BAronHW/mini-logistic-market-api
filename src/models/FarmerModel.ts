import { Product } from "./ProductModel"
// maybe implement some DTO of some sort
export interface Farmer {

    name: string
    
    email: string

    products: Product[]

    updatedAt: Date

    createdAt: Date

}