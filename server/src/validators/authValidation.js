const Joi = require("joi");

const registerSchema = Joi.object({
  firstname: Joi.string().required().messages({
    "string.base": "First name must be text",
    "string.empty": "First name cannot be empty",
    "any.required": "First name is required",
  }),
  lastname: Joi.string().required().messages({
    "string.base": "Last name must be text",
    "string.empty": "Last name cannot be empty",
    "any.required": "Last name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address",
    "any.required": "Email is required",
  }),
  phone: Joi.string().allow("").optional(),
  nationality: Joi.string().allow("").optional(),
  birthday: Joi.date()
    .required()
    .max(new Date(new Date().setFullYear(new Date().getFullYear() - 13)))
    .messages({
      "date.base": "Birthday must be a valid date",
      "date.max": "User must be at least 13 years old",
      "any.required": "Birthday is required",
    }),
  role: Joi.string().valid("ADMIN", "STUDENT").default("STUDENT").messages({
    "any.only": "Role must be either ADMIN or STUDENT",
  }),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])"))
    .required()
    .messages({
      "string.pattern.base":
        "Password must contain at least 1 letter and 1 number",
      "string.min": "Password must be at least 8 characters long",
      "any.required": "Password is required",
    }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password is required",
  }),
});

module.exports = {
  registerSchema,
  loginSchema,
};
