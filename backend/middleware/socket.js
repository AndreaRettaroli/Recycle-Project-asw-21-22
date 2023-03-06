const userModel = require("../models/userModel");
const basketModel = require("../models/basketModel");
const acquisitionModel = require("../models/acquisitionModel");

const WasteType = [
  "PLASTIC",
  "GLASS",
  "ALUMINIUM",
  "ORGANIC",
  "PAPER",
  "UNDIFFERENTIATED",
];

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
 *  basketId="14023aac471e5c26eccd26sd",
 *  wasteName="Bottle",
 *  wasteType="PLASTIC",
 *  wasteWeight=0.2, //in kg
 * }
 * also will produce createdAt and an id
 */
const onPut = (socket, client) => async (data) => {
  const { userId, basketId, wasteName, wasteType, wasteWeight } = data;
  let user = await userModel.findById(userId);
  let basket = await basketModel.findById(basketId);
  let newFilling = basket.filling + wasteWeight;
  if (!Object.is(user, null) && !Object.is(basket, null)) {
    if (
      !Object.is(wasteName, null) &&
      !Object.is(wasteType, null) &&
      !Object.is(wasteWeight, null) &&
      WasteType.includes(wasteType.toUpperCase()) && //if the type of waste is correct
      basket.dimension <= newFilling //if there is space in the trash basket
    ) {
      const newAcquisition = new acquisitionModel({
        userId: userId,
        basketId: basketId,
        wasteName: wasteName,
        wasteType: wasteType,
        wasteWeight: wasteWeight,
        createdAt: new Date().toISOString(),
      });
      await newAcquisition.save();
      await acquisitionModel.findByIdAndUpdate(
        basketId,
        { ...basket, filling: newFilling },
        {
          new: true,
        }
      );
    }
  }
};
/**
 * This function catch the events for remove trash in a user trash basket
 *  example of  data = {
 *  transactionId="33023aac471e5c26eccd26bd",
 * }
 */
const onRemove = (socket, client) => async (data) => {
  const { transactionId } = data;
  if (!Object.is(transactionId, null)) {
    await acquisitionModel.findByIdAndDelete(transactionId);
  }
};
/**
 * This function catch the events for claer a user trash basket
 * example of  data = {
 *  userId="64023aac471e5c26eccd26bd",
 *  basketID="14023aac471e5c26eccd26sd",
 * }
 */
const onClear = (socket, client) => async (data) => {
  const { userId, basketId } = data;
  let user = await userModel.findById(userId);
  let basket = await basketModel.findById(basketId);
  if (!Object.is(user, null) && !Object.is(basket, null)) {
    //create new garbage collection and update basket filling
  }
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
