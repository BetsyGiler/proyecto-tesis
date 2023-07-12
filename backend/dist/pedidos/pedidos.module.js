"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PedidosModule = void 0;
const common_1 = require("@nestjs/common");
const pedidos_service_1 = require("./pedidos.service");
const pedidos_controller_1 = require("./pedidos.controller");
const typeorm_1 = require("@nestjs/typeorm");
const pedidos_productos_entity_1 = require("./entities/pedidos-productos.entity");
const pedido_entity_1 = require("./entities/pedido.entity");
const user_service_1 = require("../user/user.service");
const user_entity_1 = require("../user/entities/user.entity");
let PedidosModule = class PedidosModule {
};
PedidosModule = __decorate([
    (0, common_1.Module)({
        controllers: [pedidos_controller_1.PedidosController],
        providers: [pedidos_service_1.PedidosService, user_service_1.UserService],
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                pedidos_productos_entity_1.PedidosProductos,
                pedido_entity_1.Pedido,
                user_entity_1.User,
            ]),
        ],
    })
], PedidosModule);
exports.PedidosModule = PedidosModule;
//# sourceMappingURL=pedidos.module.js.map