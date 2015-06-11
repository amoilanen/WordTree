define('word', function() {

  const VOCABULARY = [
    'sun',
    'shine',
    'bright'
  ];

  class Word {

    constructor(id) {
      this.id = id;
    }
  }

  VOCABULARY.forEach(function(term) {
    Word[term] = new Word(term);
  });

  return Word;
});
