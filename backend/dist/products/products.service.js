"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const env_config_1 = require("../config/env.config");
const fs = require("fs");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("./entities/product.entity");
const uuid_1 = require("uuid");
let ProductsService = class ProductsService {
    constructor(productsService) {
        this.productsService = productsService;
    }
    async create(createProductDto) {
        const mainImage = createProductDto.imagenPrincipal;
        const imageDir = env_config_1.default.fileStorageDir;
        if (!fs.existsSync(imageDir)) {
            fs.mkdirSync(imageDir, { recursive: true });
        }
        let imageUrl;
        if (mainImage) {
            const extension = mainImage.originalName.split('.').pop();
            const fileName = `${(0, uuid_1.v4)()}.${extension}`;
            fs.writeFileSync(`${imageDir}${fileName}`, mainImage.buffer);
            const host = env_config_1.default.apiHost;
            const port = env_config_1.default.apiPort;
            const imageProtocol = host === 'localhost' ? 'http' : 'https';
            const imageHost = `www.${host}:${port}`;
            const imageEndpoint = `${imageProtocol}://${imageHost}/api/images/${fileName}`;
            imageUrl = imageEndpoint;
            console.log("Image url", imageUrl);
        }
        const createdProduct = await this.productsService.save(Object.assign(Object.assign({}, createProductDto), { imagenPrincipalUrl: imageUrl }));
        if (createdProduct) {
            return await this.productsService.findOne({
                where: {
                    id: createdProduct.id
                },
            });
        }
    }
    async findAll() {
        return await this.productsService.find({
            where: {
                isActive: true
            }
        });
    }
    async findOne(id) {
        return await this.productsService.findOne({
            where: {
                id: id,
                isActive: true
            }
        });
    }
    async update(id, updateProductDto) {
        const found = await this.productsService.findOne({
            where: {
                id: id,
                isActive: true
            }
        });
        if (!found) {
            throw new common_1.NotFoundException('Producto no existe');
        }
        return await this.productsService.save(Object.assign({ id }, updateProductDto));
    }
    async remove(id) {
        const found = await this.productsService.findOne({
            where: {
                id: id,
                isActive: true
            }
        });
        if (!found) {
            throw new common_1.NotFoundException('Producto no existe');
        }
        return await this.productsService.update(id, { isActive: false });
    }
};
ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductsService);
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map