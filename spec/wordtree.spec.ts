import { Word, Entity, Actor, Action, Sentence } from '../src/grammar';
import en from '../src/lang.en';
import fi from '../src/lang.fi';
import nl from '../src/lang.nl';
import ru from '../src/lang.ru';
import { shouldTranslate } from './util';

describe('word', function() {

  shouldTranslate(Word.sun, [
    [en, 'sun'],
    [fi, 'aurinko'],
    [nl, 'zon'],
    [ru, 'солнце']
  ]);
});

describe('unknown word', function() {

  const wordId = '===some unknown word===';

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
              subject(Entity.$(Word.sun).specifier((Word as unknown as Record<string, Word>)['this']).$).$
            ).
      time(Word.now).$,
    [
      [en, 'I see the sun'],
      [fi, 'näen auringon'],
      [nl, 'ik zie de zon'],
      [ru, 'я вижу солнце']
    ]
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

describe('object with specifier: articles and plural case of words', function() {
  shouldTranslate(
    Entity.$(Word.sun).specifier((Word as unknown as Record<string, Word>)['this']).$,
    [
      [en, 'the sun'],
      [fi, 'aurinko'],
      [nl, 'de zon'],
      [ru, 'солнце']
    ]
  );
  shouldTranslate(
    Entity.$(Word.sun).specifier(Word.that).$,
    [
      [en, 'the sun'],
      [fi, 'aurinko'],
      [nl, 'de zon'],
      [ru, 'солнце']
    ]
  );
  shouldTranslate(
    Entity.$(Word.lake).specifier((Word as unknown as Record<string, Word>)['this']).$,
    [
      [en, 'the lake'],
      [fi, 'järvi'],
      [nl, 'het meer'],
      [ru, 'озеро']
    ]
  );
  shouldTranslate(
    Entity.$(Word.sun).specifier(Word.one).$,
    [
      [en, 'a sun'],
      [fi, 'aurinko'],
      [nl, 'een zon'],
      [ru, 'солнце']
    ]
  );
  shouldTranslate(
    Entity.$(Word.snow).specifier(Word.one).$,
    [
      [en, 'snow'],
      [fi, 'lumi'],
      [nl, 'sneeuw'],
      [ru, 'снег']
    ]
  );
  shouldTranslate(
    Entity.$(Word.lake).specifier(Word.many).$,
    [
      [en, 'lakes'],
      [fi, 'järviä'],
      [nl, 'meren'],
      [ru, 'озера']
    ]
  );
  shouldTranslate(
    Entity.$(Word.bird).specifier(Word.many).$,
    [
      [en, 'birds'],
      [fi, 'lintuja'],
      [nl, 'vogels'],
      [ru, 'птицы']
    ]
  );
  shouldTranslate(
    Entity.$(Word.wolf).specifier(Word.many).$,
    [
      [en, 'wolves'],
      [fi, 'susia'],
      [nl, 'wolven'],
      [ru, 'волки']
    ]
  );
});
