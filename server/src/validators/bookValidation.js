const Joi = require("joi");

const createBookSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  summary: Joi.string().allow("").optional(),
  publicationYear: Joi.number()
    .integer()
    .min(1000)
    .max(new Date().getFullYear())
    .required()
    .messages({
      "number.min": "Publication year must be a 4-digit number",
      "number.max": "Publication year cannot be in the future",
    }),
});

const updateBookSchema = Joi.object({
  title: Joi.string(),
  author: Joi.string(),
  summary: Joi.string().allow("").optional(),
  publicationYear: Joi.number()
    .integer()
    .min(1000)
    .max(new Date().getFullYear()),
}).min(1);

module.exports = {
  createBookSchema,
  updateBookSchema,
};
