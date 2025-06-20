const session = require('cookie-session')

function initSession () {
  return session({ keys: [process.env.COOKIE_PASSWORD] })
}

function setIsLogged () {
  return (req, res, next) => {
    res.locals.is_logged = req.session.is_logged || false
    next()
  }
}

module.exports = {
  initSession,
  setIsLogged
}
