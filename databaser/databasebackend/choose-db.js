var mysql = require('mysql');
const prompt = require('prompt-sync')();

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "dromtorp"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

    var option = prompt("What do you want? (insert, delete, update)");

    if (option = "insert") {
        var sql = "INSERT INTO elev (ElevID, Fornavn, Etternavn, Klasse, Hobby, Kjonn, Datamaskin) VALUES (NULL, 'Peder', 'Petterson', '2', 'Gaming', 'J', '2')";
    } else if (option = "delete") {
        var sql = "DELETE FROM `elev` WHERE Fornavn = 'Peder'";
    } else if (option = "update") {
        var sql = "UPDATE `elev` SET Hobby = 'ny hobby' WHERE Fornavn = 'Lise'";
    }
    

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("command executed");
  });
});