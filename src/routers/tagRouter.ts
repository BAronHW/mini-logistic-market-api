import { inject, injectable } from "inversify";
import { productController } from "../controllers/productController";
import { Router } from "express";
import { TagController } from "../controllers/tagController";

@injectable()
export class TagRouter {
    private tagController: TagController;
    private readonly _router: Router;

    constructor(
        @inject(TagController)
        tagController
    ) {
        this._router = Router({ strict: true });
        this.tagController = tagController;
        this.init();
    }

    private init(){
        this.router.post('/', this.tagController.createNewTag);
        this.router.get('/', this.tagController.getAllTags);
        this.router.put('/:id', this.tagController.updateTag);
        this.router.get('/:id', this.tagController.getSingleTag)
    }

    public get router(): Router{
        return this._router;
    }
}