const Joi = require("joi");

const registerSchema = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().allow("").optional(),
  nationality: Joi.string().allow("").optional(),
  birthday: Joi.date()
    .required()
    .max(new Date(new Date().setFullYear(new Date().getFullYear() - 13)))
    .messages({
      "date.max": "User must be at least 13 years old",
    }),
  role: Joi.string().valid("ADMIN", "STUDENT").default("STUDENT"),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])"))
    .required()
    .messages({
      "string.pattern.base":
        "Password must contain at least 1 letter and 1 number",
      "string.min": "Password must be at least 8 characters long",
    }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = {
  registerSchema,
  loginSchema,
};
