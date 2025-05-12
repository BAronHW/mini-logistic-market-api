import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, ManyToMany, JoinTable, Relation } from "typeorm"
import { Farmer } from './Farmer.js';
import { Tag } from "./Tag.js";
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
    farmer: Relation<Farmer>

    @ManyToMany(() => Tag, (tag) => tag.products)
    @JoinTable()
    tags: Tag[]

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            price: this.price
        };
    }
    
}