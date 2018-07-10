var q = require('q');
var db = require('../common/database');

var conn = db.getConnection();

// function addUser(user){
//     return new Promise((resolve, reject) => {
//         var query = conn.query('INSERT INTO users SET ?', user, (err, result) => {
//             if(err) reject(err);
//             else resolve(result);
//         });
//     });
// }

function addUser(user){
    var defer = q.defer();

    var query = conn.query('INSERT INTO users SET ?', user, (err, result) => {
        if(err){
            defer.reject(err);
        } else {
            defer.resolve(result);
        }
    });
    return defer.promise;
}

module.exports = {
    addUser: addUser
}