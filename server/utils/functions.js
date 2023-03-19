const acquisitionModel = require("../models/acquisitionModel");
const userModel = require("../models/userModel");
const basketModel = require("../models/basketModel");
const withdrawalModel = require("../models/withdrawalModel");
const priceModel = require("../models/priceModel");

const WasteType = ["PLASTIC", "GLASS", "METALS", "ORGANIC", "PAPER", "MIXED"];

const putAcquisition = async ({
  userId,
  basketId,
  wasteName,
  wasteType,
  wasteWeight,
}) => {
  try {
    let user = await userModel.findById(userId);
    let basket = await basketModel.findById(basketId);
    let newFilling = basket.filling + wasteWeight;

    if (!Object.is(user, null) && !Object.is(basket, null)) {
      if (
        !Object.is(wasteName, undefined) &&
        !Object.is(wasteType, undefined) &&
        !Object.is(wasteWeight, undefined) &&
        !Object.is(wasteName, null) &&
        !Object.is(wasteType, null) &&
        !Object.is(wasteWeight, null) &&
        basket.type == wasteType.toUpperCase() && //if the type of waste is correct
        basket.dimension >= newFilling //if there is space in the trash basket
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
        await basketModel.findByIdAndUpdate(
          basketId,
          { filling: newFilling },
          {
            new: true,
          }
        );
      }
    }
  } catch (err) {
    console.error("🚀 ~ file: functions.js:59 ~ err:", err);
  }
};

const removeAcquisition = async ({ acquisitionId }) => {
  try {
    if (
      !Object.is(acquisitionId, undefined) &&
      !Object.is(acquisitionId, null)
    ) {
      await acquisitionModel.findByIdAndDelete(acquisitionId);
    }
  } catch (err) {
    console.error("🚀 ~ file: functions.js:63 ~ removeAcquisition ~ err:", err);
  }
};

const garbageCollection = async ({ userId, basketId }) => {
  try {
    let user = await userModel.findById(userId);
    let basket = await basketModel.findById(basketId);
    console.log(
      "🚀 ~ file: functions.js:77 ~ garbageCollection ~ basket:",
      basket,
      { wasteType: basket.type }
    );
    if (!Object.is(user, null) && !Object.is(basket, null)) {
      let price = await priceModel.findOne({ wasteType: basket.type });
      console.log(
        "🚀 ~ file: functions.js:78 ~ garbageCollection ~ price:",
        price.value
      );
      //create new garbage collection and update basket filling
      const newWithdrawal = new withdrawalModel({
        userId: userId,
        basketId: basketId,
        basketType: basket.type,
        wasteWeight: basket.filling,
        wasteValue: (basket.filling * price.value).toFixed(2),
        createdAt: new Date().toISOString(),
      });
      await newWithdrawal.save();
      await basketModel.findByIdAndUpdate(basket._id, { filling: 0 });
    }
  } catch (err) {
    console.error("🚀 ~ file: functions.js:75 ~ garbageCollection ~ err:", err);
  }
};

module.exports = {
  putAcquisition,
  removeAcquisition,
  garbageCollection,
};
