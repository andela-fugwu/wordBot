var mongoose = require('mongoose');

var dbURI = 'mongodb://localhost/WordsDb';
if (process.env.NODE_ENV === 'production') {
  dbURI = 'mongodb://Frankie:freeman10@ds031591.mongolab.com:31591/wordsdb';
};
mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to' + dbURI);
});

mongoose.connection.on('error', function (err) {
  console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});

var gracefulShutdonwn = function (msg, callback) {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected through ' + msg);
    callback();
  });
};

process.once('SIGUSR2', function () {
  gracefulShutdonwn('nodemon restart', function () {
    process.kill(process.pid, 'SIGUSR2');
  });
});

process.on('SIGINT', function () {
  gracefulShutdonwn('app termination', function () {
    process.exit(0);
  });
});

process.on('SIGTERM', function () {
  gracefulShutdonwn('Heroku app shutdown', function () {
    process.exit(0);
  });
});

require('./words');