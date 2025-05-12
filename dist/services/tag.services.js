var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { In } from "typeorm";
import { Tag } from "../entity/Tag.js";
import { AppDataSource } from "../data-source.js";
import { Product } from "../entity/Product.js";
import { injectable } from "inversify";
let TagService = class TagService {
    tagRepository;
    productRepository;
    constructor() {
        this.tagRepository = AppDataSource.getRepository(Tag);
        this.productRepository = AppDataSource.getRepository(Product);
    }
    async createNewTag(name, description, productIdArray) {
        // given a name and desc and an array of productid's
        // create the new tag and then attatch it to the product based on array of productid's
        const newTag = new Tag();
        newTag.name = name;
        newTag.description = description;
        const savedTag = await this.tagRepository.save(newTag);
        const updatePromises = productIdArray.map(async (prodId) => {
            try {
                const productWithThisId = await this.productRepository
                    .createQueryBuilder("product")
                    .leftJoinAndSelect("product.tags", "tags")
                    .where("product.id = :id", { id: prodId })
                    .getOne();
                if (!productWithThisId.tags) {
                    productWithThisId.tags = [];
                }
                productWithThisId.tags.push(savedTag);
                return this.productRepository.save(productWithThisId);
            }
            catch (error) {
                console.error(`Error updating product ${prodId}:`, error);
                return null;
            }
        });
        await Promise.all(updatePromises);
        return this.tagRepository.findOne({
            where: { id: savedTag.id },
            relations: ["products"]
        });
    }
    async getAllTags() {
        const allTags = await this.tagRepository
            .createQueryBuilder()
            .select()
            .getMany();
        return allTags;
    }
    async getSingleTag(tagId) {
        const singleTag = await this.tagRepository
            .createQueryBuilder()
            .select()
            .where('id = :id', { id: tagId })
            .getOne();
        return singleTag;
    }
    async updateSingleTag(name, description, tagId, arrayOfProductId) {
        const tagToUpdate = await this.tagRepository
            .createQueryBuilder()
            .select()
            .where('id = :id', { id: tagId })
            .getOne();
        // const arrayOfProducts = await this.productRepository
        // .createQueryBuilder()
        // .select()
        // .where('product.id IN (:...ids)', { ids: arrayOfProductId })
        // .getMany()
        const arrayOfProd = await this.productRepository.findBy({
            id: In(arrayOfProductId)
        });
        tagToUpdate.description = description;
        tagToUpdate.name = name;
        tagToUpdate.products = arrayOfProd;
        return this.tagRepository.save(tagToUpdate);
    }
};
TagService = __decorate([
    injectable(),
    __metadata("design:paramtypes", [])
], TagService);
export { TagService };
//# sourceMappingURL=tag.services.js.map