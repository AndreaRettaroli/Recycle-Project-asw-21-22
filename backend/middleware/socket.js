const onTest = (socket, client) => (data) => {
  console.log("Test Test test", data);
};
// This function is responsible for the websocket event registration on all lock commands
exports.socketHandler = (socket) => {
  socket.on("connection", (client) => {
    console.log("🚀 ~ file: socket.js:4 ~ socket.on ~ client:", client.id);
    client.on("test", onTest(socket, client));
  });
  return socket;
};
