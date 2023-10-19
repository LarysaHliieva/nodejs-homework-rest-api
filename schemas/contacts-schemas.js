const Joi = require("joi");

const contactAddUpdateSchema = Joi.object({
  name: Joi.string()
    .required()
    .max(30)
    .messages({ "any.required": "missing required name field" }),
  email: Joi.string()
    .email()
    .required()
    .messages({ "any.required": "missing required email field" }),
  phone: Joi.string()
    .required()
    .pattern(
      new RegExp(
        /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/
      )
    )
    .messages({
      "any.required": "missing required phone field",
      "string.pattern.base":
        "Phone number must be digits and can contain spaces, dashes, parentheses and can start with +",
    }),
});

module.exports = { contactAddUpdateSchema };
