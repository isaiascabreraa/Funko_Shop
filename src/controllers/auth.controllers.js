
const login = async (req, res) => {
    res.render('./pages/login.ejs');
}

const login_submit = async (req, res) => {

    try {
        const { authenticate_user } = require('../models/authentication.model');

        const {email, password} = req.body
        if (!email || !password) {
            return res.render('./pages/register.ejs', { error: 'Todos los campos son obligatorios' });
        }

        const result = await authenticate_user(email, password);

        if (result.status === 'OK') {   
            res.locals.is_logged = true;
            req.session.is_logged = true;
            req.session.user_id = result.user_id;
            return res.redirect('/shop');
        }

        req.session.is_logged = false;
        res.locals.is_logged = false;

        return res.render('./pages/login.ejs', { error: 'Email o contraseña incorrectos' });

    } catch (error) {
        console.error('Error en login_submit:', error);
        return res.render('./pages/login.ejs', { error: 'Error inesperado, intente nuevamente.' });
    }
}


const register = (req, res) => {
    res.render('./pages/register.ejs');
}

const register_submit = async (req, res) => {

    try {
        const { register_user } = require('../models/authentication.model');

        const data = req.body;
        if (!data.email || !data.password) {
            return res.render('./pages/register.ejs', { error: 'Todos los campos son obligatorios' });
        }

        const result = await register_user(data);
        if (result.status === 'USER_ALREADY_EXISTS') {
            return res.render('./pages/register.ejs', { error: 'Ya existe un usuario con ese email.' });
        }

        if (result.status === 'ERROR') {
            return res.render('./pages/register.ejs', { error: 'Ocurrió un error al registrar.' });
        }

        return res.redirect('/shop');
    
    } catch (error) {
        console.error('Error en register_submit:', error);
        return res.render('./pages/register.ejs', { error: 'Error inesperado, intente nuevamente.' });
    }

}

const logout = (req, res) => {
    req.session = null;
    res.render('./pages/login.ejs');
}

module.exports = {
    login,
    login_submit,
    register,
    register_submit,
    logout
}