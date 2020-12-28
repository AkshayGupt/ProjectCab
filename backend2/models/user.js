const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {ObjectId} =Schema;

const User = new Schema(
  {
    googleId: {
      type: String,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    image: {
      type: String,
    },
    trips:[
      { type : ObjectId,
         ref: 'Trip' 
      }],
    createdAt:{
      type:Date,
      default:Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", User);
