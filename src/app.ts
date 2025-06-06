import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors'
import { FarmerRouter, productRouter, TagRouter, } from './routers/index.js';
import { inject, injectable } from 'inversify';

@injectable()
export class App {
    private _app: express.Application;

    constructor(
        @inject(FarmerRouter) private farmerRouter: FarmerRouter,
        @inject(productRouter) private productRouter: productRouter,
        @inject(TagRouter) private tagRouter: TagRouter
        
    ){
        this._app = express()
        this.config();
    }

    private config(): void {
        this._app.use(bodyParser.json());
        this._app.use(cors({
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: ['Content-Type', 'Authorization', 'AC-Request-Id']
        }))
        this.initRoutes()
    }

    private initRoutes(): void {
        // not yet implemented
        this._app.use('/api/farmers',this.farmerRouter.router)
        this._app.use('/api/products', this.productRouter.router)
        this._app.use('/api/tags', this.tagRouter.router)
    }

    public get app(): express.Application{
        return this._app
    }
}