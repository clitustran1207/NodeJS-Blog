var q = require('q');
var db = require('../common/database');

var conn = db.getConnection();

function addUser(user){
    return new Promise((resolve, reject) => {
        conn.query('INSERT INTO users SET ?', user, (err, result) => {
            if(err) reject(err);
            else resolve(result);
        });
    });
}

function getUser(email){
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM users WHERE ?', {email: email}, (err, result) => {
            if(err) reject(err);
            else resolve(result);
        });
    });
}
function getAllUser(){
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM users', (err, result) => {
            if(err) reject(err);
            else resolve(result);
        });
    });
}
module.exports = {
    addUser: addUser,
    getUser: getUser,
    getAllUser: getAllUser
}