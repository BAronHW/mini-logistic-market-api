import { Product } from "./ProductModel"

export interface Farmer {

    name: string
    
    email: string

    products: Product[]

    updatedAt: Date


}