define(['grammar',
        'lang.en',
        'lang.fi',
        'lang.nl',
        'lang.ru'], function({Word, Actor, Action, Time, Sentence}, en, fi, nl, ru) {

  function shouldTranslate(words, translations) {
    translations.forEach(function(translations) {
      var lang = translations[0];
      var translation = translations[1];

      it('should translate to ' + lang.name, function() {
        expect(lang.translate(words)).toBe(translation);
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

  describe('simple action', function() {

    describe('present', function() {

      describe('single actor', function() {

        describe('I', function() {

          shouldTranslate(new Sentence(Word.I, Word.sing, Word.now), [
            [en, 'I sing'],
            [fi, 'laulan'],
            [nl, 'ik zing'],
            [ru, 'я пою']
          ]);
        });

        describe('you', function() {

          shouldTranslate(new Sentence(Word.you, Word.sing, Word.now), [
            [en, 'you sing'],
            [fi, 'laulat'],
            [nl, 'je zingt'],
            [ru, 'ты поешь']
          ]);
        });

        describe('you formal', function() {

          shouldTranslate(new Sentence(Word.you_formal, Word.sing, Word.now), [
            [en, 'you sing'],
            [fi, 'laulat'],
            [nl, 'u zingt'],
            [ru, 'вы поете']
          ]);
        });

        describe('he, she, it', function() {

          shouldTranslate(new Sentence(Word.it, Word.sing, Word.now), [
            [en, 'it sings'],
            [fi, 'laulaa'],
            [nl, 'het zingt'],
            [ru, 'оно поет']
          ]);
        });
      });

      describe('multiple actors', function() {

        describe('we', function() {

          shouldTranslate(new Sentence(Word.we, Word.sing, Word.now), [
            [en, 'we sing'],
            [fi, 'laulamme'],
            [nl, 'we zingen'],
            [ru, 'мы поем']
          ]);
        });

        describe('you plural', function() {

          shouldTranslate(new Sentence(Word.you_plural, Word.sing, Word.now), [
            [en, 'you sing'],
            [fi, 'laulatte'],
            [nl, 'jullie zingen'],
            [ru, 'вы поете']
          ]);
        });

        describe('you formal plural', function() {

          shouldTranslate(new Sentence(Word.you_plural_formal, Word.sing, Word.now), [
            [en, 'you sing'],
            [fi, 'laulatte'],
            [nl, 'u zingt'],
            [ru, 'вы поете']
          ]);
        });

        describe('they', function() {

          shouldTranslate(new Sentence(Word.they, Word.sing, Word.now), [
            [en, 'they sing'],
            [fi, 'laulavat'],
            [nl, 'ze zingen'],
            [ru, 'они поют']
          ]);
        });
      });
    });

    xdescribe('future', function() {

      describe('single actor', function() {

        describe('I', function() {
          
        });

        describe('you', function() {
          
        });

        describe('you formal', function() {
          
        });

        describe('he, she, it', function() {
          
        });
      });

      describe('multiple actors', function() {

        describe('we', function() {
          
        });

        describe('you plural', function() {
          
        });

        describe('you formal plural', function() {
          
        });

        describe('they', function() {
          
        });
      });
    });

    xdescribe('past', function() {

      describe('single actor', function() {

        describe('I', function() {
          
        });

        describe('you', function() {
          
        });

        describe('you formal', function() {
          
        });

        describe('he, she, it', function() {
          
        });
      });

      describe('multiple actors', function() {

        describe('we', function() {
          
        });

        describe('you plural', function() {
          
        });

        describe('you formal plural', function() {
          
        });

        describe('they', function() {
          
        });
      });
    });
  });

  //TODO: Same object can be 'he' or 'it' in different languages, for example 'son'/'zon'
  //TODO: Separate language specific tests for different verbs endings (for Dutch, English, Russian, Finnish)
  //For example делать
  //TODO: Infinitive form of verbs

  //TODO: Simple action 1, 2, 3 person singular present, subject, place, quality
  //TODO: Simple action 1, 2, 3 person multiple present, subject, place, quality
  //TODO: Simple action 1, 2, 3 person singular future, subject, place, quality
  //TODO: Simple action 1, 2, 3 person multiple future, subject, place, quality
  //TODO: Simple action 1, 2, 3 person singular past, subject, place, quality
  //TODO: Simple action 1, 2, 3 person multiple past, subject, place, quality

  //TODO: Highly irregular verb 'go' simple action 1, 2, 3 person singular present
  //TODO: Highly irregular verb 'go' simple action 1, 2, 3 person multiple present
  //TODO: Highly irregular verb 'go' simple action 1, 2, 3 person singular future
  //TODO: Highly irregular verb 'go' simple action 1, 2, 3 person multiple future
  //TODO: Highly irregular verb 'go' simple action 1, 2, 3 person singular past
  //TODO: Highly irregular verb 'go' simple action 1, 2, 3 person multiple past
  //TODO: Highly irregular verb 'is' simple action 1, 2, 3 person singular present
  //TODO: Highly irregular verb 'is' simple action 1, 2, 3 person multiple present
  //TODO: Highly irregular verb 'is' simple action 1, 2, 3 person singular future
  //TODO: Highly irregular verb 'is' simple action 1, 2, 3 person multiple future
  //TODO: Highly irregular verb 'is' simple action 1, 2, 3 person singular past
  //TODO: Highly irregular verb 'is' simple action 1, 2, 3 person multiple past

  //TODO: Simple negative action 1, 2, 3 person singular present
  //TODO: Simple negative action 1, 2, 3 person multiple present
  //TODO: Simple negative action 1, 2, 3 person singular future
  //TODO: Simple negative action 1, 2, 3 person multiple future
  //TODO: Simple negative action 1, 2, 3 person singular past
  //TODO: Simple negative action 1, 2, 3 person multiple past
  //TODO: Simple negative action 1, 2, 3 person singular present 'go'
  //TODO: Simple negative action 1, 2, 3 person multiple present 'go'
  //TODO: Simple negative action 1, 2, 3 person singular future 'go'
  //TODO: Simple negative action 1, 2, 3 person multiple future 'go'
  //TODO: Simple negative action 1, 2, 3 person singular past 'go'
  //TODO: Simple negative action 1, 2, 3 person multiple past 'go'
  //TODO: Simple negative action 1, 2, 3 person singular present 'is'
  //TODO: Simple negative action 1, 2, 3 person multiple present 'is'
  //TODO: Simple negative action 1, 2, 3 person singular future 'is'
  //TODO: Simple negative action 1, 2, 3 person multiple future 'is'
  //TODO: Simple negative action 1, 2, 3 person singular past 'is'
  //TODO: Simple negative action 1, 2, 3 person multiple past 'is'

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

  //TODO: Questions about present time
  //TODO: Questions about past time
  //TODO: Questions about future time
});