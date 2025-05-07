import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors'
import { FarmerRouter } from './routers';
import { inject, injectable } from 'inversify';

@injectable()
export class App {
    private _app: express.Application;

    constructor(
        @inject(FarmerRouter)
        private farmerRouter: FarmerRouter
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
    }

    public get app(): express.Application{
        return this._app
    }
}