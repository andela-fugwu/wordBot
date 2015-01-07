var express = require('express');
var app = express();
var words = require('./routes/words');

app.use('/', words);

app.listen(3000, function () {
  console.log('Listening on port 3000');
});