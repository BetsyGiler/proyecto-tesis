"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const environment = {
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
    accessTokenSecret: 'test',
    refreshTokenSecret: 'test',
    cryptoKey: 'it-has-to-change',
    hashSalts: Number(process.env.HASH_SALTS),
    jwtExpirationTime: Number(process.env.JWT_EXPIRATION_TIME),
    jwtRefreshExpirationTime: Number(process.env.JWT_REFRESH_EXPIRATION_TIME),
    fileStorageDir: (_a = process.env.FILE_STORAGE_DIR) !== null && _a !== void 0 ? _a : '/app/backend/fileStorage/',
    apiHost: (_b = process.env.API_HOST) !== null && _b !== void 0 ? _b : 'localhost',
    apiPort: process.env.API_PORT
};
exports.default = environment;
//# sourceMappingURL=env.config.js.map