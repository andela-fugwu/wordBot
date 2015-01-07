var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });

var words = [
  {
    "word": "oscillate",
    "definition": "To swing back and forth",
    "partsOfSpeech": "verb"
  },
  {
    "word": "psychic",
    "definition": "A person who possesses or appears to posssess, extra-sensory abilities",
    "partsOfSpeech": "noun"
  },
  {
    "word": "askew",
    "definition": "Turned of twisted to one side",
    "partsOfSpeech": "adjective"
  },
  {
    "word": "recreation",
    "definition": "Refreshment of one's mind or body after work through activity that amuses or stimulates",
    "partsOfSpeech": "noun"
  }
];

router.route('/')
.get(function (request, response) {
  response.send("Welcome to wordBot");
});

router.route('/words')
.get(function (request, response) {
  response.json(words);
})

.post(parseUrlencoded, function (request, response) {var newWord = request.body;
  var newWordObject = {
    word: newWord.word,
    definition: newWord.definition,
    partsOfSpeech: newWord.partsOfSpeech
  };
  words.push(newWordObject);

  response.status(201).json(words);
})

.delete(parseUrlencoded, function (request, response) {
  var newWord = request.body;
  var newWords = words.filter(function (wordObject) {
    return wordObject.word !== newWord.word;
  });
  words = newWords;
  response.status(200).json(words)
});

router.route('/words/:word/edit')

.put(parseUrlencoded, function (request, response) {
  var word = request.params.word;
  var newWord = request.body;
  var wordArray = words.filter(function (wordObject) {
    return wordObject.word === word;
  });
 
  if(wordArray[0]){
    var wordObject = wordArray[0];
    console.log(wordObject);
    wordObject.definition = newWord.definition;
    wordObject.partsOfSpeech = newWord.partsOfSpeech;

    response.status(201).json(words);
  } else {
    response.sendStatus(400);
  };
});


router.route('/words/:word')

.get(function (request, response) {
  var word = request.params.word;
  var wordArray = words.filter(function (wordObject) {
    return wordObject.word === word;
  });
  response.json(wordArray[0]);
});
module.exports = router;