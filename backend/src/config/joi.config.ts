/**
 * this will help to validate the schema of required env variables
* NOTE: this import must not be converted into a traditional import
 */
import * as Joi from "joi";

export const joiValidationSchema = Joi.object({
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  HASH_SALTS: Joi.number().required(),

  JWT_EXPIRATION_TIME: Joi.number().required(),
  JWT_REFRESH_EXPIRATION_TIME: Joi.number().required(),

  API_PORT: Joi.number().required(),
});
