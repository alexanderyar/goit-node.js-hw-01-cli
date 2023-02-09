const {nanoid} = require("nanoid")
const fs = require("fs/promises");

const path = require("path");

const contactsPath = path.join(__dirname, "/db/contacts.json");


async function listContacts() {
    const data = await fs.readFile(`${contactsPath}`);

    // console.log(JSON.parse(data))
    return JSON.parse(data)
}

// checking if listContacts() works properly. added console.log before return in the func body
// listContacts()



async function getContactById(contactId) {
    
    // to find a contact by id we have to get all the contacts first and turn it into an object
   const data = await listContacts()

    // finding eligible id
    const result = data.find(contact => contactId === contact.id);
    
    // if result is "undefind" ( = false) then we return "null" which is a standard database response
    // console.log(result)
    return result || null;
}

// checking if getContactById() works properly. added console.log before return in the func body
// getContactById("5")


async function removeContact(contactId) {

    // getting all the contacts from a given JSON file
    const data = await listContacts();

    // using the func getContactById in order to get contact info for return 
    const deletedContact = await getContactById(contactId);

    // if  getContactById(contactId) returns null we exit from the func because data.filter below will crush
    if (!deletedContact) return "there is no such a contact";

    // immutable way to get a new array without deleted contact
    const newData = data.filter(contact => contact.id !== contactId);

    // writing newData to the JSON
    await fs.writeFile(contactsPath, JSON.stringify(newData, null, 2))

    //check
    // console.log(deletedContact)

    return deletedContact;
}

// checking if getContactById() works properly. added console.log before return in the func body
// removeContact("5")


async function addContact(name, email, phone) {

    // getting all the contacts from a given JSON file
    const data = await listContacts();
    // console.log(data)

    const newContact = { name, email, phone, id: nanoid() };

   
    const dataNew =  [...data, newContact]


    // !!!!!don't write anything to th DB before you TESTED everything inside the func!!!!!
    await fs.writeFile(contactsPath, JSON.stringify(dataNew, null, 2))

    return newContact;
}

    // addContact("Darryl Lindenbach", "darry@darry.com", "1230981023")



module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}