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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pedido = void 0;
const typeorm_1 = require("typeorm");
const pedidos_productos_entity_1 = require("./pedidos-productos.entity");
let Pedido = class Pedido {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Pedido.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Pedido.prototype, "usuarioId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Pedido.prototype, "fechaCreacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Pedido.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => pedidos_productos_entity_1.PedidosProductos, (pp) => pp.pedido, {
        eager: true, cascade: true
    }),
    __metadata("design:type", Array)
], Pedido.prototype, "pedidosProductos", void 0);
Pedido = __decorate([
    (0, typeorm_1.Entity)('Pedidos')
], Pedido);
exports.Pedido = Pedido;
//# sourceMappingURL=pedido.entity.js.map