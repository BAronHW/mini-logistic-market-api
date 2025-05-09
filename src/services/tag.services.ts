import { In, Repository } from "typeorm";
import { Tag } from "../entity/Tag";
import { AppDataSource } from "../data-source";
import { threadId } from "worker_threads";
import { Product } from "../entity/Product";
import { injectable } from "inversify";

@injectable()
export class TagService {
    private tagRepository: Repository<Tag>;
    private productRepository: Repository<Product>;
    constructor() {
        this.tagRepository = AppDataSource.getRepository(Tag)
        this.productRepository = AppDataSource.getRepository(Product)
    }

    public async createNewTag(name: string, description: string, productIdArray: number[]): Promise<Tag> {
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
            } catch (error) {
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

    public async getAllTags() {
        const allTags = await this.tagRepository
        .createQueryBuilder()
        .select()
        .getMany()

        return allTags;
    }

    public async getSingleTag(tagId) {
        const singleTag = await this.tagRepository
        .createQueryBuilder()
        .select()
        .where('id = :id', { id: tagId })
        .getOne()

        return singleTag
    }

    public async updateSingleTag(name: string, description: string, tagId: number, arrayOfProductId: number[]) {
        const tagToUpdate = await this.tagRepository
        .createQueryBuilder()
        .select()
        .where('id = :id', { id: tagId })
        .getOne()

        // const arrayOfProducts = await this.productRepository
        // .createQueryBuilder()
        // .select()
        // .where('product.id IN (:...ids)', { ids: arrayOfProductId })
        // .getMany()

        const arrayOfProd = await this.productRepository.findBy({
            id: In(arrayOfProductId)
        })

        tagToUpdate.description = description
        tagToUpdate.name = name
        tagToUpdate.products = arrayOfProd

        return this.tagRepository.save(tagToUpdate);
    }
}