const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const priceSchema = new mongoose.Schema({
  wasteType: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
  },
});
module.exports = mongoose.model("Prices", priceSchema);
