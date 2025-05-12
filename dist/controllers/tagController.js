var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { inject, injectable } from "inversify";
import { TagService } from "../services/tag.services.js";
let TagController = class TagController {
    tagService;
    constructor(tagService) {
        this.tagService = tagService;
    }
    createNewTag = async (req, res) => {
        try {
            const { name, description, productIdArray } = req.body;
            const newTag = await this.tagService.createNewTag(name, description, productIdArray);
            res.status(201).json({ newTag });
            return;
        }
        catch (error) {
            res.status(500).send({ message: 'Internal server error', error: error.message });
        }
    };
    getAllTags = async (req, res) => {
        try {
            const allTags = await this.tagService.getAllTags();
            res.status(200).json({ allTags });
            return;
        }
        catch (error) {
            res.status(500).send({ message: 'Internal server error', error: error.message });
        }
    };
    getSingleTag = async (req, res) => {
        try {
            const tagId = req.params.id;
            const singleTag = await this.tagService.getSingleTag(tagId);
            res.status(200).json({ singleTag });
            return;
        }
        catch (error) {
            res.status(500).send({ message: 'Internal server error', error: error.message });
        }
    };
    updateTag = async (req, res) => {
        try {
            const tagId = parseInt(req.params.id);
            const { name, description, arrayOfProductId } = req.body;
            console.log(name, description, arrayOfProductId);
            const updatedTag = await this.tagService.updateSingleTag(name, description, tagId, arrayOfProductId);
            res.status(200).json({ updatedTag });
            return;
        }
        catch (error) {
            res.status(500).send({ message: 'Internal server error', error: error.message });
        }
    };
};
TagController = __decorate([
    injectable(),
    __param(0, inject(TagService)),
    __metadata("design:paramtypes", [TagService])
], TagController);
export { TagController };
//# sourceMappingURL=tagController.js.map