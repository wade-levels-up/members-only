function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/"); // Route for not authenticated
}

function isMember(req, res, next) {
  if (req.isAuthenticated() && req.user.is_member) {
    return next();
  }
  res.redirect("/"); // Route for not authenticated
}

function isAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.is_admin) {
    return next();
  }
  res.redirect("/"); // Route for not authenticated
}

module.exports = { isAuth, isMember, isAdmin };
