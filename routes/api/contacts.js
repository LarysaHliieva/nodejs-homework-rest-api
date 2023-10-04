const express = require("express");
const Joi = require("joi");

const contactsService = require("../../models/contacts.js");
const HttpError = require("../../helpers/index.js");

const router = express.Router();

const contactAddSchema = Joi.object({
  name: Joi.string()
    .required()
    .max(30)
    .messages({ "any.required": "missing required name" }),
  email: Joi.string()
    .email()
    .required()
    .messages({ "any.required": "missing required email" }),
  phone: Joi.string()
    .required()
    .pattern(
      new RegExp(
        /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/
      )
    )
    .messages({
      "any.required": "missing required phone",
      "string.pattern.base":
        "Phone number must be digits and can contain spaces, dashes, parentheses and can start with +",
    }),
});

const contactUpdateSchema = Joi.object({
  name: Joi.string().max(30),
  email: Joi.string().email(),
  phone: Joi.string()
    .pattern(
      new RegExp(
        /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/
      )
    )
    .messages({
      "string.pattern.base":
        "Phone number must be digits and can contain spaces, dashes, parentheses and can start with +",
    }),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.getContactById(contactId);
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.removeContact(contactId);
    if (!result) {
      throw HttpError(404);
    }
    res.json("contact deleted");
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactUpdateSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    if (!Object.keys(req.body).length) {
      throw HttpError(400, "missing fields");
    }

    const { contactId } = req.params;
    const result = await contactsService.updateContact(contactId, req.body);
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
