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

function getPostById(id){
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM posts WHERE ?', { id: id}, (err, result) => {
            if(err) reject(err);
            else resolve(result);
        });
    });
}
function updatePost(new_post){
    return new Promise((resolve, reject) => {
        conn.query('UPDATE posts SET title = ?, author = ?, content = ?, updated_at = ? WHERE id = ?', 
                    [new_post.title, new_post.author, new_post.content, new Date(), new_post.id], (err, result) => {
                        if(err) reject(err);
                        else resolve(result);
                    });
    });
}
function deletePost(id){
    return new Promise((resolve, reject) => {
        conn.query('DELETE FROM posts WHERE ?', { id: id }, (err, result) => {
            if(err) reject(err);
            else resolve(result);
        });
    });
}

module.exports = {
    getAllPost: getAllPost,
    addPost: addPost,
    getPostById: getPostById,
    updatePost: updatePost,
    deletePost: deletePost
}