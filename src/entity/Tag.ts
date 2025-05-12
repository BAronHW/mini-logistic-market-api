import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";

@Entity()
export class Tag {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    level: string

    @ManyToMany(() => Product, (product) => product.tags)
    products: Product[]

}