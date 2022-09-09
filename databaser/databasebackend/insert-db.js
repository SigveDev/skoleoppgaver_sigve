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
  var sql = "INSERT INTO elev (ElevID, Fornavn, Etternavn, Klasse, Hobby, Kjonn, Datamaskin) VALUES (NULL, 'Peder', 'Petterson', '2', 'Gaming', 'J', '2')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("ny elev");
  });
});