var express = require('express');
var app = express();

require('./models/db');
var words = require('./routes/words');

app.use('/', words);

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS');

    next();
});
app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});

