define('word', function() {

  var vocabulary = [
    'sun',
    'shine',
    'bright'
  ];

  function Word(id) {
    this.id = id;
  }

  vocabulary.forEach(function(term) {
    Word[term] = new Word(term);
  });

  return Word;
});
