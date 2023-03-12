/**
 * this will help to validate the schema of required env variables
* NOTE: this import must not be converted into a traditional import
 */
import * as Joi from "joi";

export const joiValidationSchema = Joi.object({
  DB_HOST: Joi.string().default('localhost'),
  DB_PORT: Joi.number().default(3306),
  DB_USER: Joi.string().default('root'),
  DB_PASSWORD: Joi.string().default('olyndha'),
  DB_NAME: Joi.string().default('tesisolyndha'),

  JWT_SECRET: Joi.string().default('olyndha'),
  JWT_EXPIRATION_TIME: Joi.string().default('1d'),

  API_PORT: Joi.number().default(8000),
});
