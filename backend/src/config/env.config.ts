/**
 * This file is intendent to handle all environment 
 * variables so we must retrieve data from here instead
 * of querying [process.env] directly since this way
 * the risk of misspelling words is drastically reduced
 */

const environment = {
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,

  accessTokenSecret: 'test', // uuid.v4(), // a secure approach to sign JWTs
  refreshTokenSecret: 'test', // uuid.v4(),
  cryptoKey: 'it-has-to-change', // TODO:
  hashSalts: Number(process.env.HASH_SALTS),
  jwtExpirationTime: Number(process.env.JWT_EXPIRATION_TIME),
  jwtRefreshExpirationTime: Number(process.env.JWT_REFRESH_EXPIRATION_TIME),

  apiHost: process.env.API_HOST ?? 'localhost',
  apiPort: process.env.API_PORT
};

export default environment;
