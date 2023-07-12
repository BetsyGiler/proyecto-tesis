"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_controller_1 = require("./auth.controller");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../user/entities/user.entity");
const session_service_1 = require("./session.service");
const auth_service_1 = require("./auth.service");
const jwt_strategy_1 = require("./jwt.strategy");
const session_entity_1 = require("./entities/session.entity");
const admin_guard_1 = require("./guards/admin.guard");
const client_guard_1 = require("./guards/client.guard");
const nestjs_form_data_1 = require("nestjs-form-data");
const jwt_guard_1 = require("./guards/jwt.guard");
const user_service_1 = require("../user/user.service");
const jwtRegistration = jwt_1.JwtModule.registerAsync({
    imports: [],
    useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: process.env.JWT_EXPIRATION_TIME },
    }),
});
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        controllers: [auth_controller_1.AuthController],
        providers: [
            session_service_1.SessionService,
            auth_service_1.AuthService,
            admin_guard_1.AdminGuard,
            client_guard_1.ClientGuard,
            jwt_strategy_1.JwtStrategy,
            jwt_guard_1.JwtAuthGuard,
            user_service_1.UserService,
        ],
        imports: [
            typeorm_1.TypeOrmModule.forFeature([session_entity_1.Session, user_entity_1.User, session_entity_1.Session]),
            jwtRegistration,
            nestjs_form_data_1.NestjsFormDataModule,
        ],
        exports: [
            jwtRegistration,
            jwt_guard_1.JwtAuthGuard,
            admin_guard_1.AdminGuard,
            client_guard_1.ClientGuard,
        ]
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map