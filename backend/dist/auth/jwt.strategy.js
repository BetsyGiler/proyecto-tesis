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
exports.JwtStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const typeorm_1 = require("@nestjs/typeorm");
const passport_jwt_1 = require("passport-jwt");
const env_config_1 = require("../config/env.config");
const session_entity_1 = require("./entities/session.entity");
const typeorm_2 = require("typeorm");
const common_1 = require("@nestjs/common");
const session_service_1 = require("./session.service");
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt') {
    constructor(sessionRepository, sessionService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            passReqToCallback: true,
            secretOrKey: env_config_1.default.accessTokenSecret,
        });
        this.sessionRepository = sessionRepository;
        this.sessionService = sessionService;
    }
    async validate(req, payload) {
        const bearerToken = req.headers['authorization'].split(' ')[1];
        let accessToken;
        try {
            accessToken = await this.sessionService.checkAccessToken(bearerToken);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
        if (!accessToken) {
            throw new common_1.UnauthorizedException("Invalid access token");
        }
        const session = await this.sessionRepository.findOne({
            where: {
                id: payload.rtId,
            },
        });
        if (!session) {
            throw new common_1.UnauthorizedException("Inactive session");
        }
        return {
            session,
            accessToken,
        };
    }
};
JwtStrategy = __decorate([
    __param(0, (0, typeorm_1.InjectRepository)(session_entity_1.Session)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        session_service_1.SessionService])
], JwtStrategy);
exports.JwtStrategy = JwtStrategy;
//# sourceMappingURL=jwt.strategy.js.map