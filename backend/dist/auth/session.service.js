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
exports.SessionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const session_entity_1 = require("./entities/session.entity");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const jsonwebtoken_1 = require("jsonwebtoken");
const env_config_1 = require("../config/env.config");
let SessionService = class SessionService {
    constructor(sessionRepository, jwtService) {
        this.sessionRepository = sessionRepository;
        this.jwtService = jwtService;
    }
    async createRefreshToken(rtId, user, deviceFingerprint) {
        const payload = {
            userId: user.id,
        };
        const refreshToken = this.jwtService.sign(payload, {
            expiresIn: env_config_1.default.jwtRefreshExpirationTime,
            secret: env_config_1.default.refreshTokenSecret,
        });
        const session = this.sessionRepository.create({
            userId: user.id,
            refreshToken,
        });
        const createdSession = await this.sessionRepository.save(session);
        return createdSession.id;
    }
    async updateRefreshToken(rtId, userId) {
        const payload = {
            userId,
        };
        const refreshToken = this.jwtService.sign(payload, {
            expiresIn: env_config_1.default.jwtRefreshExpirationTime,
            secret: env_config_1.default.refreshTokenSecret,
        });
        await this.sessionRepository.update(rtId, {
            refreshToken,
        });
    }
    async createAccessToken(rtId, userId) {
        const payload = {
            rtId,
            userId
        };
        const accessToken = this.jwtService.sign(payload, {
            expiresIn: env_config_1.default.jwtExpirationTime,
            secret: env_config_1.default.accessTokenSecret,
        });
        return accessToken;
    }
    async checkRefreshToken(refreshToken, { session }) {
        const auxSession = session || await this.sessionRepository.findOne({
            where: {
                refreshToken,
            },
        });
        if (!auxSession) {
            throw new common_1.UnprocessableEntityException('Invalid refresh token');
        }
        const decodedToken = this.jwtService.verify(refreshToken, {
            secret: env_config_1.default.refreshTokenSecret,
            ignoreExpiration: true,
        });
        if (!decodedToken) {
            throw new common_1.UnprocessableEntityException('Invalid refresh token');
        }
        if (decodedToken.userId !== auxSession.userId) {
            throw new common_1.UnprocessableEntityException('Invalid refresh token');
        }
        const isExpired = decodedToken.exp * 1000 < Date.now();
        if (isExpired) {
            this.sessionRepository.delete(session.id);
            throw new jsonwebtoken_1.TokenExpiredError("Su sesión ha expirado", new Date(decodedToken.exp * 1000));
        }
        return !isExpired;
    }
    async checkAccessToken(accessToken) {
        const decodedToken = this.jwtService.verify(accessToken, {
            secret: env_config_1.default.accessTokenSecret,
            ignoreExpiration: true,
        });
        if (!decodedToken) {
            throw new common_1.UnprocessableEntityException('Invalid access token');
        }
        const { userId, rtId } = decodedToken;
        const session = await this.sessionRepository.findOne({
            where: { userId, id: rtId },
        });
        if (!session) {
            throw new common_1.UnprocessableEntityException('Invalid access token');
        }
        const isExpired = (decodedToken.exp * 1000) < Date.now();
        console.log("Token expired");
        if (isExpired) {
            const isRtValid = await this.checkRefreshToken(session.refreshToken, { session });
            if (!isRtValid) {
                throw new jsonwebtoken_1.TokenExpiredError("Su sesión ha expirado", new Date(decodedToken.exp * 1000));
            }
            await this.updateRefreshToken(rtId, userId);
            return await this.createAccessToken(rtId, userId);
        }
        return accessToken;
    }
    async decodeAccessToken(accessToken) {
        return this.jwtService.verify(accessToken, {
            secret: env_config_1.default.accessTokenSecret,
        });
    }
    async revokeSessionsByFingerprint(userId) {
        await this.sessionRepository.delete({
            userId
        });
    }
};
SessionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(session_entity_1.Session)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], SessionService);
exports.SessionService = SessionService;
//# sourceMappingURL=session.service.js.map