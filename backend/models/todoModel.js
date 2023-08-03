const mongoose = require("mongoose");

const todoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "This field is required."],
    },
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model("Todo", todoSchema);
