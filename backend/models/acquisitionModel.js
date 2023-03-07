const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const acquisitionSchema = new mongoose.Schema({
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
  wasteName: {
    type: String,
    required: true,
  },
  wasteType: {
    type: String,
    required: true,
  },
  wasteWeight: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});
module.exports = mongoose.model("Acquisitions", acquisitionSchema);
