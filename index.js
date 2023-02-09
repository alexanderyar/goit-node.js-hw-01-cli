// importing Commander for cli experience
const { Command } = require("commander");
const program = new Command();

// importing ALL the functions from contacts.js
const contacts = require("./contacts")

// file settings for Commander
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");


program.parse(process.argv);

const argv = program.opts();

console.log(argv)


async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
          const allContacts = await contacts.listContacts();
          console.table(allContacts)
      break;

    case "get":
          const byId = await contacts.getContactById(id)
          console.log(byId)
      break;

    case "add":
          const addingContact = await contacts.addContact( name, email, phone )
          console.log(addingContact)
      break;

    case "remove":
          const removedContact = await contacts.removeContact(id)
          console.log(removedContact)
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);