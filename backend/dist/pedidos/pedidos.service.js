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
exports.PedidosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const pedido_entity_1 = require("./entities/pedido.entity");
let PedidosService = class PedidosService {
    constructor(pedidosService) {
        this.pedidosService = pedidosService;
    }
    async create(userId, createPedidoDto) {
        return await this.pedidosService.save(Object.assign(Object.assign({}, createPedidoDto), { usuarioId: userId }));
    }
    async findAll() {
        return await this.pedidosService.find({
            order: {
                fechaCreacion: 'DESC'
            },
            where: {
                isActive: true,
            }
        });
    }
    findOne(id) {
        return `This action returns a #${id} pedido`;
    }
    update(id, updatePedidoDto) {
        return `This action updates a #${id} pedido`;
    }
    async remove(id) {
        return this.pedidosService.update(id, {
            isActive: false
        });
    }
};
PedidosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(pedido_entity_1.Pedido)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PedidosService);
exports.PedidosService = PedidosService;
//# sourceMappingURL=pedidos.service.js.map