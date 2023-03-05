const PUT_TRASH = "put_trash";
const REMOVE_TRASH = "remove_trash";
const CLEAR_TRASH_BIN = "clear_trash";

const onTest = (socket, client) => (data) => {
  console.log("Test Test test", data);
};
/**
 * This function catch the events for put trash into a user trash basket
 * example of  data = {
 *  userId="64023aac471e5c26eccd26bd",
 *  basketID="14023aac471e5c26eccd26sd",
 *  wasteName="Bottle",
 *  wasteType="PLASTIC",
 *  wasteWeight=0.2, //in kg
 * }
 * also will produce createdAt and an id
 */
const onPut = (socket, client) => (data) => {
  console.log("Test Test test", data);
};
/**
 * This function catch the events for remove trash in a user trash basket
 *  example of  data = {
 *  transactionId="33023aac471e5c26eccd26bd",
 * }
 */
const onRemove = (socket, client) => (data) => {
  console.log("Test Test test", data);
};
/**
 * This function catch the events for claer a user trash basket
 * example of  data = {
 *  userId="64023aac471e5c26eccd26bd",
 *  basketID="14023aac471e5c26eccd26sd",
 * }
 */
const onClear = (socket, client) => (data) => {
  console.log("Test Test test", data);
};
// This function is responsible for the websocket event registration on all lock commands
exports.socketHandler = (socket) => {
  socket.on("connection", (client) => {
    console.log("🚀 ~ file: socket.js:4 ~ socket.on ~ client:", client.id);
    client.on("test", onTest(socket, client));
    client.on(PUT_TRASH, onPut(socket, client));
    client.on(REMOVE_TRASH, onRemove(socket, client));
    client.on(CLEAR_TRASH, onClear(socket, client));
  });
  return socket;
};
