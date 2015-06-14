define(['grammar',
        'lang.en',
        'lang.fi',
        'lang.nl',
        'lang.ru'], function(grammar, en, fi, nl, ru) {

  var {Word, Actor, Action, Time, Sentence} = grammar;

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

  describe('simple action', function() {

    var wordTree;

    beforeEach(function() {
      wordTree = new Sentence().action(Word.sing);
    });

    describe('present', function() {

      beforeEach(function() {
        wordTree.time(Word.now);
      });

      describe('single actor', function() {

        describe('I', function() {

          beforeEach(function() {
            wordTree.actor(Word.I);
          });

          shouldTranslate(wordTree, [
            [en, 'I sing'],
            [fi, 'laulan'],
            [nl, 'ik zing'],
            [ru, 'я пою']
          ]);
        });

        describe('you', function() {

          beforeEach(function() {
            wordTree.actor(Word.you);
          });

          shouldTranslate(wordTree, [
            [en, 'you sing'],
            [fi, 'laulat'],
            [nl, 'je zingt'],
            [ru, 'ты поешь']
          ]);
        });

        describe('you formal', function() {

          beforeEach(function() {
            wordTree.actor(Word.it);
          });

          shouldTranslate(wordTree, [
            [en, 'you sing'],
            [fi, 'laulat'],
            [nl, 'u zingt'],
            [ru, 'вы поете']
          ]);
        });

        describe('he, she, it', function() {

          beforeEach(function() {
            wordTree.actor(Word.it);
          });

          shouldTranslate(wordTree, [
            [en, 'it sings'],
            [fi, 'laulaa'],
            [nl, 'het zingt'],
            [ru, 'оно поет']
          ]);
        });
      });

      describe('multiple actors', function() {

        describe('we', function() {

          beforeEach(function() {
            wordTree.actor(Word.we);
          });

          shouldTranslate(wordTree, [
            [en, 'we sing'],
            [fi, 'laulamme'],
            [nl, 'we zingen'],
            [ru, 'мы поем']
          ]);
        });

        describe('you plural', function() {

          beforeEach(function() {
            wordTree.actor(Word.you_plural);
          });

          shouldTranslate(wordTree, [
            [en, 'you sing'],
            [fi, 'laulatte'],
            [nl, 'jullie zingen'],
            [ru, 'вы поете']
          ]);
        });

        describe('you formal plural', function() {

          beforeEach(function() {
            wordTree.actor(Word.you_plural);
          });

          shouldTranslate(wordTree, [
            [en, 'you sing'],
            [fi, 'laulatte'],
            [nl, 'u zingt'],
            [ru, 'вы поете']
          ]);
        });

        describe('they', function() {

          beforeEach(function() {
            wordTree.actor(Word.they);
          });

          shouldTranslate(wordTree, [
            [en, 'they sing'],
            [fi, 'Laulavat'],
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