import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn, Relation } from "typeorm";
import { Product } from "./Product.js";

@Entity()
export class Tag {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @ManyToMany(() => Product, (product) => product.tags)
    products: Product[]

}