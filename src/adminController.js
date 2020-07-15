function login(req, res, next) {
  if (req.body.email == 'admin@jss.com' && req.body.password == 'password@1') {
    req.session.user = 'bhanu';
    res.json({
      success: 'true'
    });
    return;
  }

  res.status(403).send({
    success: false
  })
}

function logout(req, res, next) {
  req.session.destroy(err => {
    if (err) {
      log.debug(err);
      throw new CustomError(`Cannot due to server error ${err.message}`);
    }

    res.jsonp({
      success: true
    })
  })
}

export default {
  login,
  logout,
}