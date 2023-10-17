const express = require("express");

const contactsController = require("../../controllers/contacts-controller.js");

const { isEmptyBody } = require("../../middlewares/index.js");

const { validateBody } = require("../../decorators/index.js");

const { contactAddUpdateSchema } = require("../../schemas/contacts-schemas.js");

const contactAddUpdateValidate = validateBody(contactAddUpdateSchema);

const router = express.Router();

router.get("/", contactsController.getAll);

router.get("/:contactId", contactsController.getById);

router.post("/", contactAddUpdateValidate, contactsController.add);

router.delete("/:contactId", contactsController.deleteById);

router.put(
  "/:contactId",
  isEmptyBody,
  contactAddUpdateValidate,
  contactsController.putById
);

module.exports = router;
