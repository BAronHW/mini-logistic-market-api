import { inject, injectable } from "inversify";
import { TagService } from "../services/tag.services.js";
import { Request, Response } from "express";

@injectable()
export class TagController {
    private tagService: TagService;
    constructor(
        @inject(TagService)
        tagService: TagService
    ) {
        this.tagService = tagService;
    }

    public createNewTag = async (req: Request, res: Response) => {
        try {
            const { name, description, productIdArray } = req.body;
            const newTag = await this.tagService.createNewTag(name, description, productIdArray);
            res.status(201).json({ newTag })
            return;
        } catch(error: any) {
            res.status(500).send({ message: 'Internal server error', error: error.message });
        }
    }

    public getAllTags = async (req: Request, res: Response) => {
        try {
            const allTags = await this.tagService.getAllTags();
            res.status(200).json({ allTags })
            return;
        } catch(error: any){
            res.status(500).send({ message: 'Internal server error', error: error.message });
        }
    }

    public getSingleTag = async (req: Request, res: Response) => {
        try {
            const tagId = req.params.id;
            const singleTag = await this.tagService.getSingleTag(tagId);
            res.status(200).json({ singleTag })
            return;
        } catch(error) {
            res.status(500).send({ message: 'Internal server error', error: error.message });
        }
    }

    public updateTag = async (req: Request, res: Response) => {
        try{
            const tagId = parseInt(req.params.id);
            const { name, description, arrayOfProductId } = req.body;
            console.log(name, description, arrayOfProductId);
            const updatedTag = await this.tagService.updateSingleTag(name, description, tagId, arrayOfProductId);
            res.status(200).json({ updatedTag });
            return;
        }catch(error: any) {
            res.status(500).send({ message: 'Internal server error', error: error.message });
        }
    }
}