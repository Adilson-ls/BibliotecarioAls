import * as Joi from 'joi';

const validationSchema = Joi.object({
  PORT: Joi.number().default(3333),
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  DATABASE_URL: Joi.string().required(),
  SAML_ENTRY_POINT: Joi.string().required(),
  SAML_ISSUER: Joi.string().required(),
  SAML_CALLBACK_URL: Joi.string().required(),
  SAML_CERT: Joi.string().optional(),
  SAML_PRIVATE_KEY: Joi.string().optional()
});

export default validationSchema;
