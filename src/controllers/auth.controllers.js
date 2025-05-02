
//DEBERIA CORROBORLAS CON LA BDD
const credentials = {
    email: "isaiascabrera20@gmail.com",
    password: "contraseña123",
}

const login = async (req, res) => {
    res.render('./pages/login.ejs');
}

const login_submit = async (req, res) => {
    const {email, password} = req.body;
    const validate_email = credentials.email == email;
    const validate_password = credentials.password == password;
    req.session.is_logged = (validate_email && validate_password) ? true : false;

    if (req.session.is_logged) {
        res.locals.is_logged = true;
        return res.redirect('/shop');
    }
    res.render('./pages/login.ejs');
}

const register = (req, res) => {
    res.render('./pages/register.ejs');
}

const logout = (req, res) => {
    req.session = null;
    res.render('./pages/login.ejs');
}

module.exports = {
    login,
    login_submit,
    register,
    logout
}