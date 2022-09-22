var mysql = require('mysql');
const express = require('express')
var cors = require('cors')
const app = express()
const port = 3000

app.use(cors())

app.get('/:id/:func', function(req, res){
  const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "dromtorp"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

    var getID = req.params.id;
    var getFunction = req.params.func;
    console.log(getID);
    console.log(getFunction);

    if (getFunction == 'delete') {
      var sql = "DELETE FROM `elev` WHERE Fornavn = '" + getID + "'";
    } else if (getFunction == 'change') {
      var sql = "UPDATE `elev` SET Hobby = 'ny hobby' WHERE Fornavn = '" + getID  + "'";
    } else if (getFunction == 'get') {
      var sql = "SELECT * FROM `elev` WHERE Fornavn = '" + getID + "'";
    } else {
      var sql = "none";
    }

    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result);
      res.send(result);
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})