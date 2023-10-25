const express = require("express");

const contactsController = require("../../controllers/contacts-controller.js");

const { isEmptyBody, isValidId } = require("../../middlewares/index.js");

const { validateBody } = require("../../decorators/index.js");

const {
  contactAddUpdateSchema,
  contactUpdateFavoriteSchema,
} = require("../../models/Contact.js");

const contactAddUpdateValidate = validateBody(contactAddUpdateSchema);
const contactUpdateFavoriteValidate = validateBody(contactUpdateFavoriteSchema);

const router = express.Router();

router.get("/", contactsController.getAll);

router.get("/:contactId", isValidId, contactsController.getById);

router.post("/", contactAddUpdateValidate, contactsController.add);

router.delete("/:contactId", isValidId, contactsController.deleteById);

router.put(
  "/:contactId",
  isValidId,
  isEmptyBody,
  contactAddUpdateValidate,
  contactsController.putById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  contactUpdateFavoriteValidate,
  contactsController.putById
);

module.exports = router;
