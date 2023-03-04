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
  });
  return mongoose.model("Baskets", basketSchema);
};
