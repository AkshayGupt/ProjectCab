const User = require("../models/User");

/**
 * Get User by ID
 */
exports.getUserById = (req, res) => {
  const userID = req.body.userID;
  User.findById(userID)
    .populate("trips")
    .exec((err, user) => {
      if (err) {
        return res.status(400).json({ error: "Cannot fetch user" });
      } else {
        return res.status(200).json(user);
      }
    });
};
