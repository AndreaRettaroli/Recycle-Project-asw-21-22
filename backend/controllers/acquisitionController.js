const acquisitionModel = require("../models/acquisitionModel");

exports.acquisitionList = async (req, res) => {
  try {
    const userId = req.query.userId;
    if (Object.is(userId, undefined) || Object.is(userId, null)) {
      let acquisitions = await acquisitionModel.find({});
      return res.status(200).json(acquisitions);
    } else {
      let acquisitions = await acquisitionModel.find({ userId: userId });
      return res.status(200).json(acquisitions);
    }
  } catch (err) {
    console.error(
      "🚀 ~ file: basketController.js:67 ~ exports.basketsList= ~ err:",
      err
    );
    return res.status(500).json({ error: "Internal server error" });
  }
};
