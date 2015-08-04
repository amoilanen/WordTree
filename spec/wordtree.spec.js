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

          shouldTranslate(Sentence.$.actor(Word.I).action(Word.sing).time(Word.now).$, [
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
            [nl, 'u zingen'],
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

    describe('future', function() {

      describe('single actor', function() {

        describe('I', function() {
          shouldTranslate(new Sentence(Word.I, Word.sing, Word.future), [
            [en, 'I will sing'],
            [fi, 'laulan'],
            [nl, 'ik zing'],
            [ru, 'я буду петь']
          ]);
        });

        describe('you', function() {
          shouldTranslate(new Sentence(Word.you, Word.sing, Word.future), [
            [en, 'you will sing'],
            [fi, 'laulat'],
            [nl, 'je zingt'],
            [ru, 'ты будешь петь']
          ]);
        });

        describe('you formal', function() {
          shouldTranslate(new Sentence(Word.you_formal, Word.sing, Word.future), [
            [en, 'you will sing'],
            [fi, 'laulat'],
            [nl, 'u zingt'],
            [ru, 'вы будете петь']
          ]);
        });

        describe('he, she, it', function() {
          shouldTranslate(new Sentence(Word.he, Word.sing, Word.future), [
            [en, 'he will sing'],
            [fi, 'laulaa'],
            [nl, 'hij zingt'],
            [ru, 'он будет петь']
          ]);
        });
      });

      describe('multiple actors', function() {

        describe('we', function() {
          shouldTranslate(new Sentence(Word.we, Word.sing, Word.future), [
            [en, 'we will sing'],
            [fi, 'laulamme'],
            [nl, 'we zingen'],
            [ru, 'мы будем петь']
          ]);
        });

        describe('you plural', function() {
          shouldTranslate(new Sentence(Word.you_plural, Word.sing, Word.future), [
            [en, 'you will sing'],
            [fi, 'laulatte'],
            [nl, 'jullie zingen'],
            [ru, 'вы будете петь']
          ]);
        });

        describe('you formal plural', function() {
          shouldTranslate(new Sentence(Word.you_plural_formal, Word.sing, Word.future), [
            [en, 'you will sing'],
            [fi, 'laulatte'],
            [nl, 'u zingen'],
            [ru, 'вы будете петь']
          ]);
        });

        describe('they', function() {
          shouldTranslate(new Sentence(Word.they, Word.sing, Word.future), [
            [en, 'they will sing'],
            [fi, 'laulavat'],
            [nl, 'ze zingen'],
            [ru, 'они будут петь']
          ]);
        });
      });
    });

    describe('past', function() {

      describe('single actor', function() {

        describe('I', function() {
          shouldTranslate(new Sentence(Word.I, Word.sing, Word.past), [
            [en, 'I sang'],
            [fi, 'lauloin'],
            [nl, 'ik zong'],
            [ru, 'я пел']
          ]);
        });

        describe('you', function() {
          shouldTranslate(new Sentence(Word.you, Word.sing, Word.past), [
            [en, 'you sang'],
            [fi, 'lauloit'],
            [nl, 'je zong'],
            [ru, 'ты пел']
          ]);
        });

        describe('you formal', function() {
          shouldTranslate(new Sentence(Word.you_formal, Word.sing, Word.past), [
            [en, 'you sang'],
            [fi, 'lauloit'],
            [nl, 'u zong'],
            [ru, 'вы пели']
          ]);
        });

        describe('he, she, it', function() {
          shouldTranslate(new Sentence(Word.he, Word.sing, Word.past), [
            [en, 'he sang'],
            [fi, 'lauloi'],
            [nl, 'hij zong'],
            [ru, 'он пел']
          ]);
        });
      });

      describe('multiple actors', function() {

        describe('we', function() {
          shouldTranslate(new Sentence(Word.we, Word.sing, Word.past), [
            [en, 'we sang'],
            [fi, 'lauloimme'],
            [nl, 'we zongen'],
            [ru, 'мы пели']
          ]);
        });

        describe('you plural', function() {
          shouldTranslate(new Sentence(Word.you_plural, Word.sing, Word.past), [
            [en, 'you sang'],
            [fi, 'lauloitte'],
            [nl, 'jullie zongen'],
            [ru, 'вы пели']
          ]);
        });

        describe('you formal plural', function() {
          shouldTranslate(new Sentence(Word.you_plural_formal, Word.sing, Word.past), [
            [en, 'you sang'],
            [fi, 'lauloitte'],
            [nl, 'u zongen'],
            [ru, 'вы пели']
          ]);
        });

        describe('they', function() {
          shouldTranslate(new Sentence(Word.they, Word.sing, Word.past), [
            [en, 'they sang'],
            [fi, 'lauloivat'],
            [nl, 'ze zongen'],
            [ru, 'они пели']
          ]);
        });
      });
    });
  });

  describe('several words in one language can map to one word in another', function() {

    describe('snow', function() {
      shouldTranslate(Word.wet_snow_with_mud_and_ground, [
        [en, 'snow'],
        [fi, 'loska'],
        [nl, 'sneeuw'],
        [ru, 'снег']
      ]);
      shouldTranslate(Word.snow_on_tree_branch, [
        [en, 'snow'],
        [fi, 'tykky'],
        [nl, 'sneeuw'],
        [ru, 'снег']
      ]);
      shouldTranslate(Word.snow, [
        [en, 'snow'],
        [fi, 'lumi'],
        [nl, 'sneeuw'],
        [ru, 'снег']
      ]);
    });
  });

  describe('action with respect to another action', function() {

    describe('want to do something', function() {
      shouldTranslate(
        Sentence.$.
          actor(Word.I).
          action(Action.$.
                   primary(Word.want).
                   secondary(Word.sing).$
                ).
          time(Word.now).$,
        [
          [en, 'I want to sing'],
          [fi, 'Haluan laulaa'],
          [nl, 'Ik wil zingen'],
          [ru, 'Я хочу петь']
        ]);
      shouldTranslate(
        Sentence.$.
          actor(Word.she).
          action(Action.$.
                   primary(Word.want).
                   secondary(Word.sing).$
                ).
          time(Word.now).$,
        [
          [en, 'She wants to sing'],
          [fi, 'Haluaa laulaa'],
          [nl, 'Zij wil zingen'],
          [ru, 'Она хочет петь']
        ]);
      shouldTranslate(
        Sentence.$.
          actor(Word.we).
          action(Action.$.
                  primary(Word.want).
                  secondary(Word.sing).$
                ).
          time(Word.past).$,
        [
          [en, 'We wanted to sing'],
          [fi, 'Halusimme laulaa'],
          [nl, 'Wij wilden zingen'],
          [ru, 'Мы хотели петь']
        ]);
    });
  });

  //TODO: Somebody _can_ to do something
  //TODO: Somebody _going_ to do something
  //TODO: Somebody _builds_ to sing (missing object in the sentence, completely different grammar structure?)

  //TODO: Some action has been finished in the past/will be finished in the future, сделал vs. делал, deed vs. heb gedaan
  //have done/will have done
  //TODO: Some action has been finished in the past 'had done'

  //TODO: Infinitive form of verbs

  //TODO: Change the package structure, so that language files do not get too large, smaller files are split from them and they reside in
  //in separate folders

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

  //TODO: Descriptions for subject (adverb)
  //TODO: Description for action (adjective)
  //TODO: Simple two verb sentence: I learn to sing
  //TODO: Can do something

  //TODO: A goes to B (action of A with respect to B)
  //TODO: A is above B
  //TODO: A is better than B (all the comparative forms)

  //TODO: Action with a description of the action (adverb or detail)
  //TODO: 'go to something'
  //TODO: 'go from something'

  //TODO: Questions about present time
  //TODO: Questions about past time
  //TODO: Questions about future time

  //TODO: Same object can be 'he' or 'it' in different languages, for example 'sun'/'zon'

  //TODO: Idiom in one language, is there a nice way to represent an idiom in an abstract way?
  //May be related to the question of text equivalence and representing text as its meaning rather than its (even meta) structure.
});