#wordBot 
###wordBot is used to find the meaning of words

##Allowed methods 
###get, post and put.
1. Post Url: https://wordrobot.herokuapp.com/api/words
 * Parameters: 
  word: the word you want to create
  definition: The definition of the word
  partsOfSpeech: The parts of speech of the word
2. Get Url: https://wordrobot.herokuapp.com/api/words
 * Returns all the words and meaning 
3. Put Url: https://wordrobot.herokuapp.com/api/words
  * Parameters: 
  word: the word you want to update
  definition: The definition of the word
  partsOfSpeech: The parts of speech of the word

### https://wordrobot.herokuapp.com/api/words/{aword}
  **Returns a particular word