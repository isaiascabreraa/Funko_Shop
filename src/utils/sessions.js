
const session = require('cookie-session');

function init_session() {
    return session({ secret: process.env.COOKIE_PASSWORD })
};

function set_is_logged() {
    return (req, res, next) => {
        res.locals.is_logged = req.session.is_logged || false;
        next();
    };
}

module.exports = {
    init_session,
    set_is_logged,
}