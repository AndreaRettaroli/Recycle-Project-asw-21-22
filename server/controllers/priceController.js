const priceModel = require("../models/priceModel");

const WasteType = ["PLASTIC", "GLASS", "METALS", "ORGANIC", "PAPER", "MIXED"];

exports.createPrice = async (req, res) => {
  try {
    const { wasteType } = req.body;
    let price = await priceModel.find({ wasteType: wasteType });
    if (price.length > 0) {
      return res
        .status(409)
        .json({ error: "This waste type is registered yet" });
    } else {
      const newPrice = new priceModel({
        ...req.body,
        createdAt: new Date().toISOString(),
      });
      await newPrice.save();
      return res.status(200).json(newPrice);
    }
  } catch (err) {
    console.error(
      "🚀 ~ file: priceController.js:20 ~ exports.createPrice= ~ err:",
      err
    );
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.getPrice = async (req, res) => {
  try {
    const priceId = req.query.id;
    const wasteType = req.query.wasteType;
    let price = null;
    if (!Object.is(priceId, undefined)) {
      price = await priceModel.findById(priceId);
    } else if (
      !Object.is(wasteType, undefined) &&
      WasteType.includes(wasteType.toUpperCase())
    ) {
      price = await priceModel.find({ wasteType: wasteType });
    }
    if (Object.is(price, null) || price.length == 0) {
      return res.status(404).json({ error: "Price not found" });
    } else {
      return res.status(200).json(price);
    }
  } catch (err) {
    console.error(
      "🚀 ~ file: priceController.js:37 ~ exports.getPrice= ~ err:",
      err
    );
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.updatePrice = async (req, res) => {
  try {
    const priceId = req.query.id;
    const newPrice = { ...req.body, updatedAt: new Date().toISOString() };
    let price = await priceModel.findById(priceId);
    if (Object.is(price, null)) {
      return res.status(404).json({ error: "price not found" });
    }
    const updatedPrice = await priceModel.findByIdAndUpdate(priceId, newPrice, {
      new: true,
    }); //new true return new price
    return res.status(200).json(updatedPrice);
  } catch (err) {
    console.error(
      "🚀 ~ file: priceController.js:65 ~ exports.updatePrice= ~ err:",
      err
    );
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.deletePrice = async (req, res) => {
  try {
    const priceId = req.query.id;
    let price = await priceModel.findById(priceId);
    if (Object.is(price, null)) {
      return res.status(404).json({ error: "price not found" });
    }
    await priceModel.findByIdAndDelete(priceId);
    return res.status(200).json({ description: "price deleted" });
  } catch (err) {
    console.error(
      "🚀 ~ file: priceController.js:83 ~ exports.deletePrice ~ err:",
      err
    );
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.pricesList = async (req, res) => {
  try {
    let prices = await priceModel.find({});
    return res.status(200).json(prices);
  } catch (err) {
    console.error(
      "🚀 ~ file: priceController.js:95 ~ exports.pricesList= ~ err:",
      err
    );
  }
};
