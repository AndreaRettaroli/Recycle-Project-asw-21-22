const { Schema } = require("mongoose");
module.exports = (mongoose) => {
  const basketSchema = new mongoose.Schema({
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    dimension: {
      type: Number,
      required: true,
    },
    filling: {
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
  return mongoose.model("Baskets", basketSchema);
};
