var mysql = require('mysql');
var conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'hethongthitracnghiem'
}); 
conn.connect(function(err) {
  if (err) throw err;
  console.log('Database is connected successfully !');
});
module.exports = conn;

// var mysql = require('mysql');
// var connection = mysql.createConnection(process.env.JAWSDB_URL);

// connection.connect();

// module.exports = connection;
