const User = require("../models/User");

/**
 * Get User by ID
 */
exports.getUserById = (req, res) => {
  const userID = req.query.userId;
  console.log(userID);
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
        // console.log(user);
        return res.status(200).json(user);
      }
    });
};

exports.updateUserBio = (req,res) =>{
  const userId =req.query.userId;
  const newBio =req.body.bio;
  console.log(req.body);
  User.findByIdAndUpdate(userId, { bio: newBio }, 
                            function (err, docs) { 
    if (err){ 
        return res.status(400).json({
          error:err
        })
       
    } 
    else{ 
        return res.status(200).json({
          message:"Successfully Updated"
        })
        
    } 
}); 
  
}
