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
exports.ServicesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const service_entity_1 = require("./entities/service.entity");
let ServicesService = class ServicesService {
    constructor(serviceRepository) {
        this.serviceRepository = serviceRepository;
    }
    async create(createServiceDto) {
        return await this.serviceRepository.save(createServiceDto);
    }
    async findAll() {
        return await this.serviceRepository.find({
            where: {
                isActive: true
            }
        });
    }
    async findOne(id) {
        return await this.serviceRepository.findOne({
            where: {
                id: id,
                isActive: true
            }
        });
    }
    async update(id, updateServiceDto) {
        const record = await this.serviceRepository.findOne({
            where: {
                id: id,
                isActive: true
            }
        });
        if (!record) {
            throw new common_1.NotFoundException('Servicio no encontrado');
        }
        return await this.serviceRepository.update(id, updateServiceDto);
    }
    async remove(id) {
        return await this.serviceRepository.update(id, { isActive: false });
    }
};
ServicesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(service_entity_1.Service)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ServicesService);
exports.ServicesService = ServicesService;
//# sourceMappingURL=services.service.js.map