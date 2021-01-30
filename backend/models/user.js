const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { v1: uuidv1 } = require("uuid");
const crypto = require("crypto");

const { ObjectId } = Schema;

const User = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      trim: 32,
      unique: true,
    },
    bio: {
      type: String,
      default: "",
    },
    encrypted_password: {
      type: String,
      required: true,
      minlength: 8,
    },
    salt: {
      type: String,
    },
    image: {
      type: String,
    },
    trips: [{ type: ObjectId, ref: "Trip" }],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

/**
 * Generates 'salt' for the user and encryptes the plain text password.
 */
User.virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv1();
    this.encrypted_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

/**
 * 'Authenticate': Resash password and check for equality of hashes
 * 'securePassword': Hash the plain text password and store the salt and the
 * encrypted password in the database.
 */
User.methods = {
  authenticate: function (plainPassword) {
    return this.securePassword(plainPassword) === this.encrypted_password;
  },
  securePassword: function (plainPassword) {
    console.log(plainPassword);
    console.log(this.salt);
    if (!plainPassword) return "";
    try {
      const secret = this.salt;
      return crypto
        .createHmac("sha256", secret)
        .update(plainPassword)
        .digest("hex");
    } catch (err) {
      console.log(err);
      return "";
    }
  },
};

module.exports = mongoose.models.User || mongoose.model("User", User);
