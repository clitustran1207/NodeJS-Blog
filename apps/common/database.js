var config = require('config');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : config.get('mysql.host'),
    user     : config.get('mysql.user'),
    password : config.get('mysql.password'),
    database : config.get('mysql.database')
});
// connection.connect();

function getConnection(){
    connection.connect((err) => {
        if(err){
            console.log('Error connecting: ' + err.stack);
            return;
        }
        console.log('Connected as id ' + connection.threadId);
    });
    return connection;
}
module.exports = {
    getConnection: getConnection
}