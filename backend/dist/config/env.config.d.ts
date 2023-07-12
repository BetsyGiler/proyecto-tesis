declare const environment: {
    dbHost: string;
    dbPort: string;
    dbUser: string;
    dbPassword: string;
    dbName: string;
    accessTokenSecret: string;
    refreshTokenSecret: string;
    cryptoKey: string;
    hashSalts: number;
    jwtExpirationTime: number;
    jwtRefreshExpirationTime: number;
    fileStorageDir: string;
    apiHost: string;
    apiPort: string;
};
export default environment;
