"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.joiValidationSchema = void 0;
const Joi = require("joi");
exports.joiValidationSchema = Joi.object({
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().required(),
    DB_USER: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_NAME: Joi.string().required(),
    HASH_SALTS: Joi.number().required(),
    JWT_EXPIRATION_TIME: Joi.number().required(),
    JWT_REFRESH_EXPIRATION_TIME: Joi.number().required(),
    API_PORT: Joi.number().required(),
    API_HOST: Joi.string(),
});
//# sourceMappingURL=joi.config.js.map