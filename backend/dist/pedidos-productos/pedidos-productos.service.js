"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PedidosProductosService = void 0;
const common_1 = require("@nestjs/common");
let PedidosProductosService = class PedidosProductosService {
    create(createPedidosProductoDto) {
        return 'This action adds a new pedidosProducto';
    }
    findAll() {
        return `This action returns all pedidosProductos`;
    }
    findOne(id) {
        return `This action returns a #${id} pedidosProducto`;
    }
    update(id, updatePedidosProductoDto) {
        return `This action updates a #${id} pedidosProducto`;
    }
    remove(id) {
        return `This action removes a #${id} pedidosProducto`;
    }
};
PedidosProductosService = __decorate([
    (0, common_1.Injectable)()
], PedidosProductosService);
exports.PedidosProductosService = PedidosProductosService;
//# sourceMappingURL=pedidos-productos.service.js.map