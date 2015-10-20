define(['grammar',
        'lang.en',
        'lang.fi',
        'lang.nl',
        'lang.ru',
        'test.util'], function({Word, Entity, Actor, Action, Time, Sentence}, en, fi, nl, ru, {shouldTranslate}) {

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

          shouldTranslate(
            Sentence.$
              .actor(Actor.$
                       .person(Word.I)
                       .gender(Word.he).$)
              .action(Word.sing)
              .time(Word.now).$, [
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

  describe('action with a subjugated action', function() {

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
          [fi, 'haluan laulaa'],
          [nl, 'ik wil zingen'],
          [ru, 'я хочу петь']
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
          [en, 'she wants to sing'],
          [fi, 'haluaa laulaa'],
          [nl, 'zij wil zingen'],
          [ru, 'она хочет петь']
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
          [en, 'we wanted to sing'],
          [fi, 'halusimme laulaa'],
          [nl, 'we wilden zingen'],
          [ru, 'мы хотели петь']
        ]);
    });

    describe('can do something', function() {
      shouldTranslate(
        Sentence.$.
          actor(Word.I).
          action(Action.$.
                   primary(Word.can).
                   secondary(Word.build).$
                ).
          time(Word.now).$,
        [
          [en, 'I can build'],
          [fi, 'voin rakentaa'],
          [nl, 'ik kan bouwen'],
          [ru, 'я могу строить']
        ]);
      shouldTranslate(
        Sentence.$.
          actor(Word.she).
          action(Action.$.
                   primary(Word.can).
                   secondary(Word.build).$
                ).
          time(Word.now).$,
        [
          [en, 'she can build'],
          [fi, 'voi rakentaa'],
          [nl, 'zij kan bouwen'],
          [ru, 'она может строить']
        ]);
      shouldTranslate(
        Sentence.$.
          actor(Word.we).
          action(Action.$.
                  primary(Word.can).
                  secondary(Word.build).$
                ).
          time(Word.past).$,
        [
          [en, 'we could build'],
          [fi, 'voisimme rakentaa'],
          [nl, 'we konden bouwen'],
          [ru, 'мы могли строить']
        ]);
    });
  });

  describe('some object is performing an action', function() {
    shouldTranslate(
      Sentence.$.
        actor(Word.sun).
        action(Word.shine).
        time(Word.now).$,
      [
        [en, 'sun shines'],
        [fi, 'aurinko paistaa'],
        [nl, 'de zon schijnt'],
        [ru, 'солнце светит']
      ]
    );
    shouldTranslate(
      Sentence.$.
        actor(Word.sun).
        action(Word.shine).
        time(Word.past).$,
      [
        [en, 'sun shone'],
        [fi, 'aurinko paistoi'],
        [nl, 'de zon scheen'],
        [ru, 'солнце светило']
      ]
    );
    shouldTranslate(
      Sentence.$.
        actor(Word.sun).
        action(Word.shine).
        time(Word.future).$,
      [
        [en, 'sun will shine'],
        [fi, 'aurinko paistaa'],
        [nl, 'de zon schijnt'],
        [ru, 'солнце будет светить']
      ]
    );
  });

  describe('action directed at an object (subject)', function() {
    shouldTranslate(
      Sentence.$.
        actor(Word.I).
        action(Action.$.
                primary(Word.see).
                subject(Entity.$(Word.sun).specifier(Word.this).$).$
              ).
        time(Word.now).$,
      [
        [en, 'I see the sun'],
        [fi, 'näen auringon'],
        [nl, 'ik zie de zon'],
        [ru, 'я вижу солнце']
      ], true
    );
    shouldTranslate(
      Sentence.$.
        actor(Word.I).
        action(Action.$.
                primary(Word.see).
                subject(Word.you).$
              ).
        time(Word.past).$,
      [
        [en, 'I saw you'],
        [fi, 'näin sinut'],
        [nl, 'ik zag je'],
        [ru, 'я видел тебя']
      ]
    );
    shouldTranslate(
      Sentence.$.
        actor(Word.you).
        action(Action.$.
                primary(Word.build).
                subject(Word.it).$
              ).
        time(Word.future).$,
      [
        [en, 'you will build it'],
        [fi, 'rakennat sitä'],
        [nl, 'je bouwt het'],
        [ru, 'ты будешь строить это']
      ]
    );
  });
});

  //TODO: Articles for words in English and Dutch. Some languages have articles: English, Dutch, some do not: Finnish, Russian
  //-- Articles for Dutch: definite, indefinite, plural form with articles
  //-- Articles for English: definite, indefinite, plural form with articles
  //TODO: somebody is performing an action directed at themselves (custom case of an action performed on an object)
    //Some languages have special suffixes to show that the action was performed on the object performing action itself
  //TODO: 'that' in Russian can have also a gender attached to it

  //TODO: Word cases in Russian: nominative, etc. "нет снега", "к снегу", "под снегом"
  //TODO: Word cases in Finnish: 'ei lumia'

  //TODO: "She looks at us", translation depending on the language

  //TODO: Multiple number of something
  //TODO: In Finnish multiple number of something can be different depending whether it is a definite thing or not

  //TODO: Description of a word: 'bright sun'
  //TODO: Description of a personal pronoun like: 'happy you'
  //TODO: Description of an action: 'do fast', 'do slowly'

  //TODO: Telling the other person to do something
  //TODO: Some verbs cannot act as a main action with some subjugated action
  //TODO: Somebody _builds_ to sing (missing object in the sentence, completely different grammar structure?)

  //TODO: Description of some action ('sing loudly'), some words cannot be used as such descriptions
  //TODO: Description of an object

  //TODO: Some action has been finished in the past/will be finished in the future, сделал vs. делал, deed vs. heb gedaan
  //have done/will have done
  //TODO: Some action has been finished in the past 'had done'

  //TODO: Infinitive form of verbs

  //TODO: Change the package structure, so that language files do not get too large, smaller files are split from them and they reside in
  //in separate folders
  //TODO: Extract common vocabulary from the Grammar class

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

  //TODO: Logical constructs: or, and, neither, every, nobody, anybody

  //TODO: Same object can be 'he' or 'it' in different languages, for example 'sun'/'zon'

  //TODO: Complex sentences combined from two sentences
  //TODO: Arbitrary level of nesting for sentences (3 or 4, recursion), although in practice would be rarely used

  //TODO: Idiom in one language, is there a nice way to represent an idiom in an abstract way?
  //May be related to the question of text equivalence and representing text as its meaning rather than its (even meta) structure.
    //TODO: Languages may have two sufficiently different ways to describe the same thing
    //TODO: Somebody is _going_ to do something

  //TODO: 'it can be used to' form
  //TODO: Actions that act as objects/subjects. Compare 'do' -> 'doing'

  //TODO: Numbers
  //TODO: Possesive pronouns, like 'my house', 'your house', etc.

  //TODO: Arbitrary level of nesting should be possible using the defined grammar so that arbitrarily complex sentences can be built