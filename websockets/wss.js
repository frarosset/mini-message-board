const WebSocket = require("ws");
const { broadcast } = require("./broadcast.js");
const {
  getUpdatedDataForMessageList,
} = require("../controllers/indexController.js");

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

  // Currently, the server broadcasts the updated message list HTML
  // (along with a timestamp) to all connected clients on a periodic
  // interval. A future update will optimize this by broadcasting
  // only when the message list has changed.

  const writeMessage = async () => {
    const data = await getUpdatedDataForMessageList();
    broadcast(wss, data);
  };

  setInterval(writeMessage, 10000);
}

module.exports = initWebSocket;
