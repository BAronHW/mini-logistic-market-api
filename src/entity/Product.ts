import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, ManyToMany, JoinTable } from "typeorm"
import { Farmer } from "./Farmer"
import { Tag } from "./Tag"
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