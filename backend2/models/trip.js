import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Trip = new Schema(
  {
    members: {
      type: Array,
      required: true,
    },
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
