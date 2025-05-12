import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, Relation } from "typeorm"
import { Product } from "./Product.js"
@Entity()
export class Farmer {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    email: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @OneToMany(() => Product, (product) => product.farmer)
    product: Product[]

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            products: this.product
        };
    }

}
