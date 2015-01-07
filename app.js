var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var parseUrlEncoded = bodyParser.urlencoded({extended: false});

var words = {
  "oscillate" : "To swing back and forth",
  "psychic": "A person who possesses or appears to possess, extra-sensory abilities",
  "askew": "Turned of twisted to one side"
};

app.route('/')
.get(function (request, response) {
  response.send("Welcome to wordBot");
});

app.route('/words')
.get(function (request, response) {
  response.json(words);
})

.post(parseUrlEncoded, function (request, response) {
  var newWord = request.body;
  words[newWord.word] = newWord.definition;

  response.status(201).json(words);
})
.put(parseUrlEncoded, function (request, response) {
  var newWord = request.body;
  if(words[newWord.word]){
    words[newWord.word] = newWord.definition;
    response.status(201).json(words);

  }
  else {
    response.sendStatus(400);
  }
})
.delete(parseUrlEncoded, function (request, response) {
  var newWord = request.body;
  delete words[newWord.word];
  response.status(200).json(words);
});

app.route('/words/:word')
.get(function (request, response) {

});

app.listen(3000);