var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var parseUrlEncoded = bodyParser.urlencoded({extended: false});

var words = {
  "oscillate": {
    "word": "oscillate",
    "definition": "To swing back and forth",
    "partsOfSpeech": "verb"
  },
  "psychic": {
    "word": "psychic",
    "definition": "A person who possesses or appears to posssess, extra-sensory abilities",
    "partsOfSpeech": "noun"
  },
  "askew": {
    "word": "askew",
    "definition": "Turned of twisted to one side",
    "partsOfSpeech": "adjective"
  },
  "recreation": {
    "word": "recreation",
    "definition": "Refreshment of one's mind or body after work through activity that amuses or stimulates",
    "partsOfSpeech": "noun"
  }
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
  var newWordObject = {
    word: newWord.word,
    definition: newWord.definition,
    partsOfSpeech: newWord.partsOfSpeech
  };
  words[newWord.word] = newWordObject;

  response.status(201).json(words);
  // words[newWord.word] = newWord.definition;

  // response.status(201).json(words);
})
.put(parseUrlEncoded, function (request, response) {
  var newWord = request.body;
  if(words[newWord.word]) {
    var newWordObject = {
      word: newWord.word,
      definition: newWord.definition,
      partsOfSpeech: newWord.partsOfSpeech
    };    
    words[newWord.word] = newWordObject;
    response.status(201).json(words);
  } else {
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
  var word = request.params.word;
  response.json(words[word]);
});

app.listen(3000);