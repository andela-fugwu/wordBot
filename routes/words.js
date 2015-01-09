var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });

var mongoose = require('mongoose');
var words = require('../models/words');

router.route('/')
.get(function (request, response) {
  response.redirect('/api/words');
});

router.route('/api/words')

.get(function (request, response) {
  words.find(function (err, word) {
    response.json(word);
  });
})

.post(parseUrlencoded, function (request, response) {

  var newWord = request.body;
  var newWordObject = {
    word: newWord.word,
    definition: newWord.definition,
    partsOfSpeech: newWord.partsOfSpeech
  };

  words.create(newWordObject, function (err, word) {
    response.status(201).json(word);
  });
})

.put(parseUrlencoded, function (request, response) {
  
  var updateWord = request.body;
  var word = updateWord.word;
 
  words.findOneAndUpdate({word: words}, updateWord, function (err) {
    if(err)
      response.send(err);
    else
      response.send("Updated")
  });
});


router.route('/api/words/:word')

.get(function (request, response) {
  var word = request.params.word;
  words.find({word: word}, function (err, word) {
    if(word[0])
      response.send(word);
    else
      response.sendStatus(400)
  });
});

module.exports = router;