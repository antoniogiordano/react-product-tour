/**
 * Created by AntonioGiordano on 21/11/15.
 */

var express = require('express')
var app = express()
var path = require('path')
var ejs = require('ejs')

app.set('view engine', 'html')
app.engine('html', ejs.renderFile)
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'dist')))

app.get('/', function (req, res) {
  res.render('example1.html')
})

var server = app.listen(8000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('Example app listening at http://%s:%s', host, port)
})
