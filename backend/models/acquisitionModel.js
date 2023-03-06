const { Schema } = require("mongoose");
module.exports = (mongoose) => {
  const userSchema = new mongoose.Schema({
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
  });
  return mongoose.model("Acquisitions", userSchema);
};
