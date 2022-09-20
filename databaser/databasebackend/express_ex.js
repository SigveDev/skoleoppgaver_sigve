var mysql = require('mysql');
const express = require('express')
var cors = require('cors')
const app = express()
const port = 3000

app.use(cors())

/*app.get('/', (req, res) => {
    const con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "dromtorp"
      });
      
      con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");

        con.query("select * from `elev`", function (err, result) {
          if (err) throw err;
          //console.log(result);
          res.send(result);
        });
      });
})*/

app.get('/:id', function(req, res){
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
    console.log(getID);
    var sql = "SELECT * FROM `elev` WHERE Fornavn = '" + getID + "'";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result);
      res.send(result)
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})