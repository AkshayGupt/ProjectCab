module.exports = {
  ensureAuth: function (req, res, next) {
    let isAuthenticated =
      req.profile && req.auth && req.profile._id == req.auth._id;
    if (isAuthenticated) {
      return next();
    } else {
      res.redirect("/");
    }
  },

  ensureGuest: function (req, res, next) {
    let isAuthenticated =
      req.profile && req.auth && req.profile._id == req.auth._id;
    if (isAuthenticated) {
      res.redirect("/dashboard");
    } else {
      return next();
    }
  },
};
