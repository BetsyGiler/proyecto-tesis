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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../user/entities/user.entity");
const session_service_1 = require("./session.service");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const env_config_1 = require("../config/env.config");
const fs = require("fs");
const uuid_1 = require("uuid");
let AuthService = class AuthService {
    constructor(userRepository, sessionService) {
        this.userRepository = userRepository;
        this.sessionService = sessionService;
    }
    async register(user) {
        const { imagenPerfil, password } = user;
        const imagePath = '/app/backend/fileStorage/';
        const host = env_config_1.default.apiHost;
        const port = env_config_1.default.apiPort;
        if (!fs.existsSync(imagePath)) {
            fs.mkdirSync(imagePath, { recursive: true });
        }
        const splittedFileName = imagenPerfil === null || imagenPerfil === void 0 ? void 0 : imagenPerfil.originalName.split('.');
        let imageName;
        try {
            const extension = splittedFileName[splittedFileName.length - 1];
            imageName = `${(0, uuid_1.v4)()}.${extension}`;
        }
        catch (e) {
            console.error(e);
        }
        if (imageName) {
            fs.writeFileSync(`${imagePath}${imageName}`, imagenPerfil.buffer);
        }
        const hashedPassword = bcrypt.hashSync(password, env_config_1.default.hashSalts);
        delete user.imagenPerfil;
        const imageProtocol = host === 'localhost' ? 'http' : 'https';
        const imageHost = `www.${host}:${port}`;
        const imageEndpoint = `${imageProtocol}://${imageHost}/api/images/${imageName}`;
        const newUser = this.userRepository.create(Object.assign(Object.assign({}, user), { imagenPerfil: imageEndpoint, password: hashedPassword, rol: 'cliente' }));
        let createdUser;
        try {
            createdUser = await this.userRepository.save(newUser);
        }
        catch (e) {
            console.error(e);
            if (e.code === '23505' && e.detail.includes('email')) {
                throw new common_1.BadRequestException({
                    error: 'El correo ya existe',
                    detail: e.detail,
                });
            }
            throw e;
        }
        const sessionId = await this.sessionService.createRefreshToken(null, createdUser, createdUser.id);
        const accessToken = await this.sessionService.createAccessToken(sessionId, newUser.id);
        delete createdUser.password;
        return {
            user: createdUser,
            accessToken,
        };
    }
    async login(user) {
        const { email, password } = user;
        const userFound = await this.userRepository.findOne({
            where: { email },
        });
        if (!userFound) {
            throw new common_1.NotFoundException("Credenciales incorrectas");
        }
        const isPasswordCorrect = bcrypt.compareSync(password, userFound.password);
        if (!isPasswordCorrect) {
            throw new common_1.NotFoundException("Credenciales incorrectas");
        }
        await this.sessionService.revokeSessionsByFingerprint(userFound.id);
        const sessionId = await this.sessionService.createRefreshToken(null, userFound, userFound.id);
        const accessToken = await this.sessionService.createAccessToken(sessionId, userFound.id);
        delete userFound.password;
        return {
            user: userFound,
            accessToken,
        };
    }
    async checkSession(guardOutput) {
        const userId = guardOutput.session.userId;
        const user = await this.userRepository.findOne({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.NotFoundException("Credenciales incorrectas");
        }
        delete user.password;
        return {
            user,
            accessToken: guardOutput.accessToken,
        };
    }
    async logout(guardOutput) {
        const { userId } = guardOutput.session;
        await this.sessionService.revokeSessionsByFingerprint(userId);
        return {
            accessToken: null,
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        session_service_1.SessionService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map