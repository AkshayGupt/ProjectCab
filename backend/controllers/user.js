const User = require("../models/User");
const fs = require("fs");
const formidable = require("formidable");
const crypto = require("crypto");

/**
 * Encrypt the plain text password using pre-defined salt.
 * @param {string} salt - Secret for password hashing
 * @param {string} plainPassword - Plain text password
 */
const passwordHashing = (salt, plainPassword) => {
  try {
    return crypto
      .createHmac("sha256", salt)
      .update(plainPassword)
      .digest("hex");
  } catch (err) {
    // console.log(err);
    return "";
  }
};

/**
 * Get User by ID
 */
exports.getUserById = (req, res) => {
  const userID = req.query.userId;
  User.findById(userID)
    .lean()
    .populate("trips", "members")
    .exec((err, user) => {
      if (err) {
        return res.status(400).json({ error: "Cannot fetch user" });
      } else {
        delete user.encrypted_password;
        delete user.salt;
        delete user.updatedAt;
        return res.status(200).json(user);
      }
    });
};

exports.updateUserBio = (req, res) => {
  const userId = req.query.userId;
  const newBio = req.body.bio;
  User.findByIdAndUpdate(userId, { bio: newBio }, function (err, docs) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    } else {
      return res.status(200).json({
        message: "Successfully Updated",
      });
    }
  });
};

/**
 * Update User DP.
 * Converts image to binary data to store in mongodb
 * @param {string} req - User DP
 * @param {JSON} res - 400 , if error occurs; else 200 status
 */
exports.updateUserDP = (req, res) => {
  const userID = req.query.userId;

  var form = new formidable.IncomingForm();
  form.keepExtensions = true;

  // console.log("HELLO");

  form.parse(req, (err, fields, file) => {
    if (err) {
      // console.log(err);
      return res.status(400).json({
        error: "Some Error Occured. Cannot uplaod image at this time.",
      });
    } else {
      const newImage = file.image;
      User.findById(userID).exec((err, user) => {
        if (err) {
          return res
            .status(400)
            .json({ error: "Some error occured! Cannot update the DP now." });
        } else {
          if (
            newImage.type !== "image/jpeg" &&
            newImage.type !== "image/jpg" &&
            newImage.type !== "image/png"
          ) {
            return res
              .status(400)
              .json({ error: "Invalid Format! Try again with another image." });
          }

          user.image.data = fs.readFileSync(newImage.path);
          user.image.contentType = newImage.type;
          user.save((err, user) => {
            if (err) {
              return res.status(400).json({
                error: "Some error occured! Cannot update the DP now.",
              });
            } else {
              return res
                .status(200)
                .json({ message: "DP uploaded successfully!" });
            }
          });
        }
      });
    }
  });
};

/**
 * Update user password in the database
 * @param {string} req - UserId, oldPassword, newPassword
 * @param {json} res - success/error
 */
exports.updatePassword = (req, res) => {
  const userId = req.query.userId;
  const { oldPassword, newPassword } = req.body;

  User.findById(userId).exec((err, user) => {
    if (err) {
      return res.status(400).json({
        error: "Some error occured. Cannot change password at this time.",
      });
    } else {
      const salt = user.salt;
      const encryptedOldPassword = passwordHashing(salt, oldPassword);
      if (user.encrypted_password !== encryptedOldPassword) {
        return res.status(400).json({ error: "Incorrect old password" });
      } else {
        const encryptedNewPassword = passwordHashing(salt, newPassword);
        if (encryptedNewPassword === "") {
          return res.status(400).json({
            error: "Some error occured. Cannot change password at this time.",
          });
        }
        user.encrypted_password = encryptedNewPassword;
        user.save((err, user) => {
          if (err) {
            return res.status(400).json({
              error: "Some error occured. Cannot change password at this time.",
            });
          } else {
            return res
              .status(200)
              .json({ message: "Password Changed successfully!" });
          }
        });
      }
    }
  });
};
