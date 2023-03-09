const basketModel = require("../models/basketModel");

const MAXIMUM_BASKET_PER_USER = 5;

exports.createBasket = async (req, res) => {
  try {
    const { userId, type, dimension } = req.body;
    let baskets = await basketModel.find({ userId: userId });
    console.log(
      "🚀 ~ file: basketController.js:10 ~ exports.createBasket= ~ basket:",
      baskets
    );

    if (baskets.length < MAXIMUM_BASKET_PER_USER) {
      if (baskets.some((basket) => basket.type === type)) {
        return res
          .status(409)
          .json({ error: "This basket type already exist for this user" });
      } else {
        const newBasket = new basketModel({
          ...req.body,
          filling: 0.0,
          createdAt: new Date().toISOString(),
        });
        await newBasket.save();
        return res.status(200).json(newBasket);
      }
    } else {
      return res.status(409).json({ error: "Too much basket for this user" });
    }
  } catch (err) {
    console.error(
      "🚀 ~ file: basketController.js:15 ~ exports.getBasket= ~ err:",
      err
    );
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.getBasket = async (req, res) => {
  try {
    const basketId = req.query.id;
    let basket = await basketModel.findById(basketId);
    if (Object.is(basket, null)) {
      return res.status(404).json({ error: "Basket not found" });
    }
    return res.status(200).json(basket);
  } catch (err) {
    console.error(
      "🚀 ~ file: basketController.js:15 ~ exports.getBasket= ~ err:",
      err
    );
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateBasket = async (req, res) => {
  try {
    const basketId = req.query.id;
    const newBasket = { ...req.body, updatedAt: new Date().toISOString() };
    let basket = await basketModel.findById(basketId);
    if (Object.is(basket, null)) {
      return res.status(404).json({ error: "Basket not found" });
    }
    const updatedBasket = await basketModel.findByIdAndUpdate(
      basketId,
      newBasket,
      {
        new: true,
      }
    ); //new true return new basket
    return res.status(200).json(updatedBasket);
  } catch (err) {
    console.error(
      "🚀 ~ file: basketController.js:40 ~ exports.updateBasket= ~ err:",
      err
    );
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteBasket = async (req, res) => {
  try {
    const basketId = req.query.id;
    let basket = await basketModel.findById(basketId);
    if (Object.is(basket, null)) {
      return res.status(404).json({ error: "Basket not found" });
    }
    await basketModel.findByIdAndDelete(basketId);
    return res.status(200).json({ description: "Basket deleted" });
  } catch (err) {
    console.error(
      "🚀 ~ file: basketController.js:57 ~ exports.deleteBasket ~ err:",
      err
    );
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.basketsList = async (req, res) => {
  try {
    const userId = req.query.userId;
    console.log(
      "🚀 ~ file: basketController.js:103 ~ exports.basketsList= ~ userId:",
      userId
    );
    if (Object.is(userId, undefined) || Object.is(userId, null)) {
      let baskets = await basketModel.find({});
      return res.status(200).json(baskets);
    } else {
      let baskets = await basketModel.find({ userId: userId });
      return res.status(200).json(baskets);
    }
  } catch (err) {
    console.error(
      "🚀 ~ file: basketController.js:67 ~ exports.basketsList= ~ err:",
      err
    );
    return res.status(500).json({ error: "Internal server error" });
  }
};
