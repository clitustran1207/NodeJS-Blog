var bcrypt = require('bcrypt');
var config = require('config');

function hashPassword(password){
    var saltRounds = config.get('saltRounds');
    var salt = bcrypt.genSaltSync(saltRounds);
    var hash = bcrypt.hashSync(password, salt)

    return hash;
}

module.exports = {
    hashPassword: hashPassword
}