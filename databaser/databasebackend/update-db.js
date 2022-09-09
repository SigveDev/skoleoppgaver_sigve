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
  var sql = "UPDATE `elev` SET Hobby = 'ny hobby' WHERE Fornavn = 'Lise'";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("user updated");
  });
});