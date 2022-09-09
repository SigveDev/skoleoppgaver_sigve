var mysql = require('mysql');

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "dromtorp"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "DELETE FROM `elev` WHERE Fornavn = 'Peder'";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("user deleted");
  });
});