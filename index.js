const argv = require("yargs").argv;
const contactsOperations = require("./contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contacts = await contactsOperations.listContacts();
      console.log(contacts);
      break;

    case "get":
      const contact = await contactsOperations.getContactById(id);
      if (!contact) {
        throw new Error(`Contact with id=${id} not found`);
      }
      console.log(contact);
      break;

    case "add":
      const newContact = await contactsOperations.addContact(
        name,
        email,
        phone
      );
      if (!newContact) {
        throw new Error(`Contact with phone: ${phone} has already`);
      }
      console.log(newContact);
      break;

    case "remove":
      const removedContact = contactsOperations.removeContact(id);
      if (!removedContact) {
        throw new Error(`Contact with id=${id} not found`);
      }
      console.log(removedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
