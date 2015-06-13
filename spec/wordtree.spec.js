define(['word',
        'lang.en',
        'lang.fi',
        'lang.nl',
        'lang.ru'], function(Word, en, fi, nl, ru) {

  function shouldTranslate(wordTree, translations) {
    translations.forEach(function(translations) {
      var lang = translations[0];
      var translation = translations[1];

      it('should translate to ' + lang.name, function() {
        expect(lang.translate(wordTree)).toBe(translation);
      });
    });
  }

  describe('word', function() {

    shouldTranslate(Word.sun, [
      [en, 'sun'],
      [fi, 'aurinko'],
      [nl, 'zon'],
      [ru, 'солнце']
    ]);
  });

  describe('unknown word', function() {

    var wordId = '===some unknown word===';

    shouldTranslate(new Word(wordId), [
      [en, wordId],
      [fi, wordId],
      [nl, wordId],
      [ru, wordId]
    ]);
  });

  //TODO: Unknown word
  //TODO: Simple action 1, 2, 3 person singular present
  //TODO: Simple action 1, 2, 3 person multiple present
  //TODO: Simple action 1, 2, 3 person singular future
  //TODO: Simple action 1, 2, 3 person multiple future
  //TODO: Simple action 1, 2, 3 person singular past
  //TODO: Simple action 1, 2, 3 person multiple past
  //TODO: Simple negative action 1, 2, 3 person singular present
  //TODO: Simple negative action 1, 2, 3 person multiple present
  //TODO: Simple negative action 1, 2, 3 person singular future
  //TODO: Simple negative action 1, 2, 3 person multiple future
  //TODO: Simple negative action 1, 2, 3 person singular past
  //TODO: Simple negative action 1, 2, 3 person multiple past
  //TODO: Present composite sentence: subject does 1 and does 2
  //TODO: Future composite sentence: subject will do 1 and will do 2
  //TODO: Past composite sentence: subject did 1 and did 2
  //TODO: Present composite sentence: subject does 1 and does not 2
  //TODO: Future composite sentence: subject will not do 1 and will do 2
  //TODO: Past composite sentence: subject did 1 and did not 2
  //TODO: Shortened sentence: subject is omitted
  //TODO: Shortened sentence: subject is omitted, negative
  //TODO: Complex sentence, 1 because 2
  //TODO: Complex sentence, 1 despite 2
  //TODO: Complex sentence, 1 or 2
  //TODO: Sequence of words
});