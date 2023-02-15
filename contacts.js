const { nanoid } = require("nanoid");
const fs = require("fs/promises");

const path = require("path");

const contactsPath = path.join(__dirname, "/db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(`${contactsPath}`);

  return JSON.parse(data);
}

async function getContactById(contactId) {
  const data = await listContacts();

  const result = data.find((contact) => contactId === contact.id);

  return result || null;
}

async function removeContact(contactId) {
  const data = await listContacts();

  const deletedContact = await getContactById(contactId);

  if (!deletedContact) return "there is no such a contact";

  const newData = data.filter((contact) => contact.id !== contactId);

  await fs.writeFile(contactsPath, JSON.stringify(newData, null, 2));

  return deletedContact;
}

async function addContact(name, email, phone) {
  const data = await listContacts();

  const newContact = { name, email, phone, id: nanoid() };

  const dataNew = [...data, newContact];

  await fs.writeFile(contactsPath, JSON.stringify(dataNew, null, 2));

  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
