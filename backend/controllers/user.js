const User = require("../models/User");

// TODO: Exclude

/**
 * Get User by ID
 */
exports.getUserById = (req, res) => {
  const userID = req.body.userID;
  User.findById(userID)
    .populate({
      path: "trips",
      populate: {
        path: "members",
        model: "User",
        select: {
          trips: 0,
          _id: 0,
          googleId: 0,
          createdAt: 0,
          updatedAt: 0,
          __v: 0,
        },
      },
    })
    .exec((err, user) => {
      if (err) {
        return res.status(400).json({ error: "Cannot fetch user" });
      } else {
        return res.status(200).json(user);
      }
    });
};
