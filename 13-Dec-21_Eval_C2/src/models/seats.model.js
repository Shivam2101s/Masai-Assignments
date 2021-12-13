const { Schema, model } = require("mongoose");

const seatsSchema = new Schema(
  {
    available_seats: { type: Number, required: true },
    show: {
      type: Schema.Types.ObjectId,
      ref: "shows",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("seats", seatsSchema);
