const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const withdrawalSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  basketId: {
    type: Schema.Types.ObjectId,
    ref: "Baskets",
    required: true,
  },
  basketType: {
    type: String,
    required: true,
  },
  wasteWeight: {
    type: Number,
    required: true,
  },
  wasteValue: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});
module.exports = mongoose.model("Withdrawals", withdrawalSchema);
