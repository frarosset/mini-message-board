const newMessage = (text = "", user = "anonymous") => ({
  text,
  user,
  added: new Date(),
});

const messages = [
  newMessage("Hello world!", "frarosset"),
  newMessage("Welcome to my Mini Message Board!", "frarosset"),
];

const getMessages = () => messages;
const addMessage = (text, user) => messages.push(newMessage(text, user));

module.exports = { getMessages, addMessage };
