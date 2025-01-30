const mongoose = require("mongoose");

const preOrderSchema = mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
      required: true,
    },
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Items",
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("PreOrder", preOrderSchema);
