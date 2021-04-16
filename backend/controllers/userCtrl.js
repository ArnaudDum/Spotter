const user = require('../models/user');
const bcrypt = require('bcrypt');

function validPassword(value) {
    if(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(value)) {
        return true;
    } else {
        return false;
    }
};

exports.signup = (req, res, next) => {
    
};

exports.login = (req, res, next) => {

};