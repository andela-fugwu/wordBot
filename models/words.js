var mongoose = require('mongoose');


var wordSchema = new mongoose.Schema({
  word: {type: String, required: true},
  definition: String,
  partsOfSpeech: {type: String}
});

var words = mongoose.model('Word', wordSchema);
console.log("testing frnak "+words.find());

module.exports = words;
// db.words.save({
//   {
//     "word": "oscillate",
//     "definition": "To swing back and forth",
//     "partsOfSpeech": "verb"
//   }
// });