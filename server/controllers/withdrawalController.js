const withdrawalModel = require("../models/withdrawalModel");

exports.withdrawalList = async (req, res) => {
  try {
    const userId = req.query.userId;
    const basketId = req.query.basketId;
    const basketType = req.query.basketType;
    if (!Object.is(userId, undefined) || !Object.is(userId, null)) {
      let withdrawals = await withdrawalModel.find({ userId: userId });
      return res.status(200).json(withdrawals);
    } else if (!Object.is(basketId, undefined) || !Object.is(basketId, null)) {
      let withdrawals = await withdrawalModel.find({ basketId: basketId });
      return res.status(200).json(withdrawals);
    } else if (
      !Object.is(basketType, undefined) ||
      !Object.is(basketType, null)
    ) {
      let withdrawals = await withdrawalModel.find({ basketType: basketType });
      return res.status(200).json(withdrawals);
    } else {
      let withdrawals = await withdrawalModel.find({});
      return res.status(200).json(withdrawals);
    }
  } catch (err) {
    console.error(
      "🚀 ~ file: basketController.js:67 ~ exports.basketsList= ~ err:",
      err
    );
    return res.status(500).json({ error: "Internal server error" });
  }
};
