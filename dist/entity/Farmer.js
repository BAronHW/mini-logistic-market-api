var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Product } from "./Product.js";
let Farmer = class Farmer {
    id;
    name;
    email;
    createdAt;
    updatedAt;
    product;
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            products: this.product
        };
    }
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Farmer.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Farmer.prototype, "name", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Farmer.prototype, "email", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Farmer.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], Farmer.prototype, "updatedAt", void 0);
__decorate([
    OneToMany(() => Product, (product) => product.farmer),
    __metadata("design:type", Array)
], Farmer.prototype, "product", void 0);
Farmer = __decorate([
    Entity()
], Farmer);
export { Farmer };
//# sourceMappingURL=Farmer.js.map