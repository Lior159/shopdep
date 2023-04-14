exports.flashAndRender = (req, res, msg, path) => {
  req.flash("error", msg);
  return req.session.save(() => {
    res.redirect(path);
  });
};
