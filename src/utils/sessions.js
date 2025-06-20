const session = require('cookie-session')

function initSession () {
  return session({ keys: [process.env.COOKIE_PASSWORD] })
}

function setIsLogged () {
  return (req, res, next) => {
    res.locals.isLogged = req.session.isLogged || false
    next()
  }
}

module.exports = {
  initSession,
  setIsLogged
}
