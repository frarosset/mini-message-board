const WebSocket = require("ws");
const { broadcast } = require("./broadcast.js");
const {
  getUpdatedDataForMessageList,
} = require("../controllers/indexController.js");
const notifier = require("../events/notifier.js");

function initWebSocket(server) {
  // This connection is designed to notify connected clients about
  // new messages sent to the server, not to receive messages
  // from clients.

  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    console.log(`Client connected (tot: ${wss.clients.size})`);

    ws.on("close", () => {
      console.log(`Client disconnected (tot: ${wss.clients.size})`);
    });

    ws.on("error", (error) => {
      console.error("WebSocket error:", error);
    });
  });

  // The server emits updated message list HTML (with a timestamp) to
  // all connected clients only when the database is modified, enabling
  // efficient real-time syncing. This is implemented via a custom EventEmitter.

  const writeMessage = async () => {
    const data = await getUpdatedDataForMessageList();
    broadcast(wss, data);
  };
  notifier.on("db-updated", writeMessage);
}

module.exports = initWebSocket;
