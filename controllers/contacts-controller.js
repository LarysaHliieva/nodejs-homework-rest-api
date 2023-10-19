const contactsService = require("../models/contacts.js");
const HttpError = require("../helpers/index.js");
const { ctrlWrapper } = require("../decorators/index.js");

const getAll = async (req, res) => {
  const result = await contactsService.listContacts();
  res.json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsService.getContactById(contactId);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const add = async (req, res) => {
  const result = await contactsService.addContact(req.body);
  res.status(201).json(result);
};

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsService.removeContact(contactId);
  if (!result) {
    throw HttpError(404);
  }
  res.json({ message: "contact deleted" });
};

const putById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsService.updateContact(contactId, req.body);

  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  putById: ctrlWrapper(putById),
};
