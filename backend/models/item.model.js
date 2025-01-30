const mongoose = require("mongoose");

const itemSchema = mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrls: {
      type: Array,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Items", itemSchema);
