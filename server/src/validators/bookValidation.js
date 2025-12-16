const Joi = require("joi");

const createBookSchema = Joi.object({
  title: Joi.string().required().messages({
    "string.base": "Title must be text",
    "string.empty": "Title cannot be empty",
    "any.required": "Title is required",
  }),
  author: Joi.string().required().messages({
    "string.base": "Author must be text",
    "string.empty": "Author cannot be empty",
    "any.required": "Author is required",
  }),
  summary: Joi.string().allow("").optional().messages({
    "string.base": "Summary must be text",
  }),
  publicationYear: Joi.number()
    .integer()
    .min(1000)
    .max(new Date().getFullYear())
    .required()
    .messages({
      "number.base": "Publication year must be a number",
      "number.integer": "Publication year must be a whole number",
      "number.min": "Publication year must be after 1000",
      "number.max": "Publication year cannot be in the future",
      "any.required": "Publication year is required",
    }),
});

const updateBookSchema = Joi.object({
  title: Joi.string().messages({
    "string.base": "Title must be text",
    "string.empty": "Title cannot be empty",
  }),
  author: Joi.string().messages({
    "string.base": "Author must be text",
    "string.empty": "Author cannot be empty",
  }),
  summary: Joi.string().allow("").optional().messages({
    "string.base": "Summary must be text",
  }),
  publicationYear: Joi.number()
    .integer()
    .min(1000)
    .max(new Date().getFullYear())
    .messages({
      "number.base": "Publication year must be a number",
      "number.integer": "Publication year must be a whole number",
      "number.min": "Publication year must be after 1000",
      "number.max": "Publication year cannot be in the future",
    }),
}).min(1);

module.exports = {
  createBookSchema,
  updateBookSchema,
};
