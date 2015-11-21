/**
 * Created by AntonioGiordano on 21/11/15.
 */

var express = require('express')
var app = express()

app.use(express.static(__dirname));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/example1.html')
})

var server = app.listen(8000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('Example app listening at http://%s:%s', host, port)
})
