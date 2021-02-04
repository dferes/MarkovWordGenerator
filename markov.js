class MarkovMachine {

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.chainObject = this.makeChains();
  }

  /* set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */
  makeChains() {
    let chainObject = {};
    const wordFrequency = this.collectWordFrequency();

    for ( const [key, val] of Object.entries(wordFrequency)) {
      chainObject[key] = [];
      let counter = 0;
      let index = 0;
      let allFound = false;
      while (!allFound) {
        if (this.words[index] === key){
          counter ++;
          let nextWord =  this.words[index+1] == undefined ? null: this.words[index+1]
          chainObject[key].push(nextWord);
        }
        index ++;
        allFound = counter == val ? true : false;
      }
    }
    return chainObject;
  }

  collectWordFrequency() {
    let wordFrequency = {};

    for (let word of this.words) {
      if( !(word in wordFrequency)){
        wordFrequency[word] = this.countOccuranceInArray(this.words, word); 
      }
    }
    return wordFrequency;
  }

  countOccuranceInArray = (arr, val) => arr.reduce( (a,v) => (v == val ? a+1 : a), 0);

  /* return random text from chains */
  makeText(numWords = 35) {
    let randomWord = this.words[Math.floor(Math.random() * this.words.length)];
    let markovText = "";
    for(let i = 0; i < numWords; i++) {
      let listLength = this.chainObject[randomWord].length;
      randomWord = this.chainObject[randomWord][Math.floor(Math.random() * listLength)]
      while (randomWord == null) {
        randomWord = this.words[Math.floor(Math.random() * this.words.length)];
      }
      markovText += randomWord + ' ';
    }
    return markovText.substr(0,markovText.length-1);
  }
}


module.exports = {
  MarkovMachine
};