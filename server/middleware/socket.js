const userModel = require("../models/userModel");
const basketModel = require("../models/basketModel");
const acquisitionModel = require("../models/acquisitionModel");

const Utils = require("../utils/functions");

const WasteType = ["PLASTIC", "GLASS", "METALS", "ORGANIC", "PAPER", "MIXED"];

const PUT_TRASH = "put_trash";
const REMOVE_TRASH = "remove_trash";
const CLEAR_TRASH = "clear_trash";

/**
 * This function catch the events for put trash into a user trash basket
 * example of  data = {
 *   "userId":"64023aac471e5c26eccd26bd",
 *   "basketId":"6407403eb6505fe776812ffb",
 *   "wasteName":"Bottle",
 *   "wasteType":"PLASTIC",
 *   "wasteWeight":0.2
 * }
 * also will produce createdAt and an id
 */
const onPut = (socket, client) => async (data) => {
  console.log("🚀 ~ file: socket.js:36 ~ onPut ~ data:", data);
  await Utils.putAcquisition(data);
};
/**
 * This function catch the events for remove trash in a user trash basket
 *  example of  data = {
 *  acquisitionId:"33023aac471e5c26eccd26bd",
 * }
 */
const onRemove = (socket, client) => async (data) => {
  await Utils.removeAcquisition(data);
};
/**
 * This function catch the events for claer a user trash basket
 * example of  data = {
 *  userId:"64023aac471e5c26eccd26bd",
 *  basketId:"14023aac471e5c26eccd26sd",
 * }
 */
const onClear = (socket, client) => async (data) => {
  await Utils.garbageCollection(data);
};
// This function is responsible for the websocket event registration on all lock commands
exports.socketHandler = (socket) => {
  socket.on("connection", (client) => {
    client.on(PUT_TRASH, onPut(socket, client));
    client.on(REMOVE_TRASH, onRemove(socket, client));
    client.on(CLEAR_TRASH, onClear(socket, client));
  });
  return socket;
};
