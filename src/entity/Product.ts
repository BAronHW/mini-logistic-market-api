import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from "typeorm"
import { Farmer } from "./Farmer"
@Entity()
export class Product{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @Column("decimal", { precision: 10, scale: 2 })
    price: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(() => Farmer, (farmer) => farmer.product, {
        onDelete: 'CASCADE'
    })
    farmer: Farmer

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            price: this.price
        };
    }


}