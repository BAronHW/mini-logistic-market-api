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
import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import { FarmerRouter, productRouter, TagRouter, } from './routers/index.js';
import { inject, injectable } from 'inversify';
let App = class App {
    farmerRouter;
    productRouter;
    tagRouter;
    _app;
    constructor(farmerRouter, productRouter, tagRouter) {
        this.farmerRouter = farmerRouter;
        this.productRouter = productRouter;
        this.tagRouter = tagRouter;
        this._app = express();
        this.config();
    }
    config() {
        this._app.use(bodyParser.json());
        this._app.use(cors({
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: ['Content-Type', 'Authorization', 'AC-Request-Id']
        }));
        this.initRoutes();
    }
    initRoutes() {
        // not yet implemented
        this._app.use('/api/farmers', this.farmerRouter.router);
        this._app.use('/api/products', this.productRouter.router);
        this._app.use('/api/tags', this.tagRouter.router);
    }
    get app() {
        return this._app;
    }
};
App = __decorate([
    injectable(),
    __param(0, inject(FarmerRouter)),
    __param(1, inject(productRouter)),
    __param(2, inject(TagRouter)),
    __metadata("design:paramtypes", [FarmerRouter,
        productRouter,
        TagRouter])
], App);
export { App };
//# sourceMappingURL=app.js.map