var express = require('express');
var app = express();
require('./models/db');
var words = require('./routes/words');

app.use('/', words);
app.set('port', (process.env.PORT || 5000));

// app.listen(3000, function () {
//   console.log('Listening on port 3000');
// });

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});