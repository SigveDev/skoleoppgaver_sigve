var mysql = require('mysql');
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    const con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "dromtorp"
      });
      
      con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");

        var sql = "select * from `elev` where Fornavn = 'Peder'";

        con.query(sql, function (err, result) {
          if (err) throw err;
          //console.log(result);
          res.send(result);
        });
      });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})