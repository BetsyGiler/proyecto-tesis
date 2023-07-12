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
exports.CreateUserDto = void 0;
const class_validator_1 = require("class-validator");
const nestjs_form_data_1 = require("nestjs-form-data");
class CreateUserDto {
}
__decorate([
    (0, class_validator_1.IsString)({ message: "El nombre es obligatorio y debe ser un string" }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "nombre", void 0);
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: "El email es obligatorio y debe ser un string" }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "La ciudad debe ser un string" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "ciudad", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "El barrio debe ser un string" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "barrio", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "El numero de telefono debe ser un string" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "numeroTelefono", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "El peovincia debe ser un string" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "provincia", void 0);
__decorate([
    (0, class_validator_1.IsStrongPassword)({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    }, { message: "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo" }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, nestjs_form_data_1.IsFile)(),
    (0, nestjs_form_data_1.MaxFileSize)(1e6, { message: "El archivo debe ser menor a 1 MB" }),
    (0, nestjs_form_data_1.HasMimeType)(['image/jpeg', 'image/png']),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", nestjs_form_data_1.MemoryStoredFile)
], CreateUserDto.prototype, "imagenPerfil", void 0);
exports.CreateUserDto = CreateUserDto;
//# sourceMappingURL=create-user.dto.js.map