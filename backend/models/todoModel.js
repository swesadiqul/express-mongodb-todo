const mongoose = require("mongoose");

const todoSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "This field is required."],
    },
    title: {
      type: String,
      required: [true, "This field is required."],
    },
    description: {
      type: String,
      required: [true, "This field is required."],
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model("Todo", todoSchema);
