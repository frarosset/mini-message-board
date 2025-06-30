const newMessage = (text = "", user = "(anonymous)") => ({
  text,
  user,
  added: new Date(),
  id: crypto.randomUUID(),
});

const messages = [
  newMessage("Hello world!", "frarosset"),
  newMessage("Welcome to my Mini Message Board!", "frarosset"),
];

const getMessages = () => messages;
const getMessage = (id) => {
  const msg = messages.filter((msg) => {
    return msg.id === id;
  });

  return msg !== null ? msg[0] : null;
};
const addMessage = (text, user) => messages.push(newMessage(text, user));

module.exports = { getMessages, addMessage, getMessage };
