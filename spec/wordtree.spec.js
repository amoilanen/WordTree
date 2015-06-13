define(['word',
        'lang.en',
        'lang.fi',
        'lang.nl',
        'lang.ru'], function(Word, en, fi, nl, ru) {

  describe('word', function() {

    var word = Word.sun;

    it('should translate to English', function() {
      expect(en.translate(word)).toBe('sun');
    });

    it('should translate to Dutch', function() {
      expect(nl.translate(word)).toBe('zon');
    });

    it('should translate to Russian', function() {
      expect(ru.translate(word)).toBe('солнце');
    });

    it('should translate to Finnish', function() {
      expect(fi.translate(word)).toBe('aurinko');
    });
  });

  describe('unknown word', function() {

    var wordId = '===some unknown word===';

    var word = new Word(wordId);

    it('should translate to English', function() {
      expect(en.translate(word)).toBe(wordId);
    });

    it('should translate to Dutch', function() {
      expect(nl.translate(word)).toBe(wordId);
    });

    it('should translate to Russian', function() {
      expect(ru.translate(word)).toBe(wordId);
    });

    it('should translate to Finnish', function() {
      expect(fi.translate(word)).toBe(wordId);
    });
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