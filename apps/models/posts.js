var db = require('../common/database');

var conn = db.getConnection();

function getAllPost(){
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM posts', (err, result) => {
            if(err) reject(err);
            else resolve(result);
        });
    });
}

function addPost(post){
    return new Promise((resolve, reject) => {
        conn.query('INSERT INTO posts SET ?', post, (err, result) => {
            if(err) reject(err);
            else resolve(result);
        });
    });
}

module.exports = {
    getAllPost: getAllPost,
    addPost: addPost
}