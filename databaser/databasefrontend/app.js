const express = require('express')
const path = require('path');

const app = express()
const port = 3000

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/DVGS.jpg', function(req, res) {
    res.sendFile(path.join(__dirname, '/DVGS.jpg'));
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})