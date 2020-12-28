const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema;

const Trip = new Schema(
  {
    members: [{ type: ObjectId, ref: "User" }],
    genderAllowed: {
      type: Number,
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    maxCapacity: {
      type: Number,
      default: 8,
    },
    minCapacity: {
      type: Number,
      required: true,
    },
    isFilled: {
      type: Number,
      default: 0,
    },
    memberCount: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trip", Trip);
