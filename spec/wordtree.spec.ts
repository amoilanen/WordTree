import { Word, Entity, Actor, Action, Sentence, PrepositionalPhrase, CompoundSentence, Question, SubordinateSentence } from '../src/grammar';
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

describe('negated action', function() {

  describe('present', function() {

    describe('I', function() {
      shouldTranslate(
        Sentence.$.
          actor(Word.I).
          action(Action.$.primary(Word.sing).negated().$).
          time(Word.now).$,
        [
          [en, 'I do not sing'],
          [fi, 'en laula'],
          [nl, 'ik zing niet'],
          [ru, 'я не пою']
        ]
      );
    });

    describe('you', function() {
      shouldTranslate(
        Sentence.$.
          actor(Word.you).
          action(Action.$.primary(Word.sing).negated().$).
          time(Word.now).$,
        [
          [en, 'you do not sing'],
          [fi, 'et laula'],
          [nl, 'je zingt niet'],
          [ru, 'ты не поешь']
        ]
      );
    });

    describe('she', function() {
      shouldTranslate(
        Sentence.$.
          actor(Word.she).
          action(Action.$.primary(Word.sing).negated().$).
          time(Word.now).$,
        [
          [en, 'she does not sing'],
          [fi, 'ei laula'],
          [nl, 'zij zingt niet'],
          [ru, 'она не поет']
        ]
      );
    });

    describe('we', function() {
      shouldTranslate(
        Sentence.$.
          actor(Word.we).
          action(Action.$.primary(Word.sing).negated().$).
          time(Word.now).$,
        [
          [en, 'we do not sing'],
          [fi, 'emme laula'],
          [nl, 'we zingen niet'],
          [ru, 'мы не поем']
        ]
      );
    });

    describe('they', function() {
      shouldTranslate(
        Sentence.$.
          actor(Word.they).
          action(Action.$.primary(Word.sing).negated().$).
          time(Word.now).$,
        [
          [en, 'they do not sing'],
          [fi, 'eivät laula'],
          [nl, 'ze zingen niet'],
          [ru, 'они не поют']
        ]
      );
    });
  });

  describe('past', function() {

    describe('I', function() {
      shouldTranslate(
        Sentence.$.
          actor(Word.I).
          action(Action.$.primary(Word.sing).negated().$).
          time(Word.past).$,
        [
          [en, 'I did not sing'],
          [fi, 'en laulanut'],
          [nl, 'ik zong niet'],
          [ru, 'я не пел']
        ]
      );
    });

    describe('she', function() {
      shouldTranslate(
        Sentence.$.
          actor(Word.she).
          action(Action.$.primary(Word.sing).negated().$).
          time(Word.past).$,
        [
          [en, 'she did not sing'],
          [fi, 'ei laulanut'],
          [nl, 'zij zong niet'],
          [ru, 'она не пела']
        ]
      );
    });

    describe('they', function() {
      shouldTranslate(
        Sentence.$.
          actor(Word.they).
          action(Action.$.primary(Word.sing).negated().$).
          time(Word.past).$,
        [
          [en, 'they did not sing'],
          [fi, 'eivät laulanut'],
          [nl, 'ze zongen niet'],
          [ru, 'они не пели']
        ]
      );
    });
  });

  describe('future', function() {

    describe('I', function() {
      shouldTranslate(
        Sentence.$.
          actor(Word.I).
          action(Action.$.primary(Word.sing).negated().$).
          time(Word.future).$,
        [
          [en, 'I will not sing'],
          [fi, 'en laula'],
          [nl, 'ik zing niet'],
          [ru, 'я не буду петь']
        ]
      );
    });

    describe('he', function() {
      shouldTranslate(
        Sentence.$.
          actor(Word.he).
          action(Action.$.primary(Word.sing).negated().$).
          time(Word.future).$,
        [
          [en, 'he will not sing'],
          [fi, 'ei laula'],
          [nl, 'hij zingt niet'],
          [ru, 'он не будет петь']
        ]
      );
    });
  });

  describe('irregular verb: go', function() {

    describe('present', function() {
      shouldTranslate(
        Sentence.$.
          actor(Word.she).
          action(Action.$.primary(Word.go).negated().$).
          time(Word.now).$,
        [
          [en, 'she does not go'],
          [fi, 'ei mene'],
          [nl, 'zij gaat niet'],
          [ru, 'она не идет']
        ]
      );
    });

    describe('past', function() {
      shouldTranslate(
        Sentence.$.
          actor(Word.they).
          action(Action.$.primary(Word.go).negated().$).
          time(Word.past).$,
        [
          [en, 'they did not go'],
          [fi, 'eivät mennyt'],
          [nl, 'ze gingen niet'],
          [ru, 'они не шли']
        ]
      );
    });
  });
});

describe('negated compound action', function() {

  describe('do not want to sing', function() {
    shouldTranslate(
      Sentence.$.
        actor(Word.I).
        action(Action.$.
                primary(Word.want).
                secondary(Word.sing).
                negated().$
              ).
        time(Word.now).$,
      [
        [en, 'I do not want to sing'],
        [fi, 'en halua laulaa'],
        [nl, 'ik wil niet zingen'],
        [ru, 'я не хочу петь']
      ]
    );
    shouldTranslate(
      Sentence.$.
        actor(Word.she).
        action(Action.$.
                primary(Word.want).
                secondary(Word.sing).
                negated().$
              ).
        time(Word.now).$,
      [
        [en, 'she does not want to sing'],
        [fi, 'ei halua laulaa'],
        [nl, 'zij wil niet zingen'],
        [ru, 'она не хочет петь']
      ]
    );
    shouldTranslate(
      Sentence.$.
        actor(Word.we).
        action(Action.$.
                primary(Word.want).
                secondary(Word.sing).
                negated().$
              ).
        time(Word.past).$,
      [
        [en, 'we did not want to sing'],
        [fi, 'emme halunnut laulaa'],
        [nl, 'we wilden niet zingen'],
        [ru, 'мы не хотели петь']
      ]
    );
  });

  describe('can not build', function() {
    shouldTranslate(
      Sentence.$.
        actor(Word.I).
        action(Action.$.
                primary(Word.can).
                secondary(Word.build).
                negated().$
              ).
        time(Word.now).$,
      [
        [en, 'I can not build'],
        [fi, 'en voi rakentaa'],
        [nl, 'ik kan niet bouwen'],
        [ru, 'я не могу строить']
      ]
    );
    shouldTranslate(
      Sentence.$.
        actor(Word.she).
        action(Action.$.
                primary(Word.can).
                secondary(Word.build).
                negated().$
              ).
        time(Word.now).$,
      [
        [en, 'she can not build'],
        [fi, 'ei voi rakentaa'],
        [nl, 'zij kan niet bouwen'],
        [ru, 'она не может строить']
      ]
    );
    shouldTranslate(
      Sentence.$.
        actor(Word.we).
        action(Action.$.
                primary(Word.can).
                secondary(Word.build).
                negated().$
              ).
        time(Word.past).$,
      [
        [en, 'we could not build'],
        [fi, 'emme voinut rakentaa'],
        [nl, 'we konden niet bouwen'],
        [ru, 'мы не могли строить']
      ]
    );
  });

  describe('negated action directed at an object', function() {
    shouldTranslate(
      Sentence.$.
        actor(Word.I).
        action(Action.$.
                primary(Word.see).
                subject(Entity.$(Word.sun).specifier((Word as unknown as Record<string, Word>)['this']).$).
                negated().$
              ).
        time(Word.now).$,
      [
        [en, 'I do not see the sun'],
        [fi, 'en näe auringon'],
        [nl, 'ik zie niet de zon'],
        [ru, 'я не вижу солнце']
      ]
    );
  });
});

describe('adjective: description of an object', function() {

  describe('bright sun', function() {
    shouldTranslate(
      Entity.$(Word.sun).adjective(Word.bright).$,
      [
        [en, 'bright sun'],
        [fi, 'kirkas aurinko'],
        [nl, 'felle zon'],
        [ru, 'яркое солнце']
      ]
    );
  });

  describe('the bright sun', function() {
    shouldTranslate(
      Entity.$(Word.sun).specifier((Word as unknown as Record<string, Word>)['this']).adjective(Word.bright).$,
      [
        [en, 'the bright sun'],
        [fi, 'kirkas aurinko'],
        [nl, 'de felle zon'],
        [ru, 'яркое солнце']
      ]
    );
  });

  describe('a big lake', function() {
    shouldTranslate(
      Entity.$(Word.lake).specifier(Word.one).adjective(Word.big).$,
      [
        [en, 'a big lake'],
        [fi, 'suuri järvi'],
        [nl, 'een grote meer'],
        [ru, 'большое озеро']
      ]
    );
  });

  describe('old wolf', function() {
    shouldTranslate(
      Entity.$(Word.wolf).adjective(Word.old).$,
      [
        [en, 'old wolf'],
        [fi, 'vanha susi'],
        [nl, 'oude wolf'],
        [ru, 'старый волк']
      ]
    );
  });

  describe('white bird', function() {
    shouldTranslate(
      Entity.$(Word.bird).adjective(Word.white).$,
      [
        [en, 'white bird'],
        [fi, 'valkoinen lintu'],
        [nl, 'witte vogel'],
        [ru, 'белая птица']
      ]
    );
  });

  describe('white birds (adjective with plural)', function() {
    shouldTranslate(
      Entity.$(Word.bird).specifier(Word.many).adjective(Word.white).$,
      [
        [en, 'white birds'],
        [fi, 'valkoinen lintuja'],
        [nl, 'witte vogels'],
        [ru, 'белая птицы']
      ]
    );
  });

  describe('adjective in a sentence: I see the bright sun', function() {
    shouldTranslate(
      Sentence.$.
        actor(Word.I).
        action(Action.$.
                primary(Word.see).
                subject(Entity.$(Word.sun).specifier((Word as unknown as Record<string, Word>)['this']).adjective(Word.bright).$).$
              ).
        time(Word.now).$,
      [
        [en, 'I see the bright sun'],
        [fi, 'näen kirkas auringon'],
        [nl, 'ik zie de felle zon'],
        [ru, 'я вижу яркое солнце']
      ]
    );
  });
});

describe('adverb: description of an action', function() {

  describe('I sing loudly', function() {
    shouldTranslate(
      Sentence.$.
        actor(Word.I).
        action(Action.$.primary(Word.sing).adverb(Word.loudly).$).
        time(Word.now).$,
      [
        [en, 'I sing loudly'],
        [fi, 'laulan kovaa'],
        [nl, 'ik zing hard'],
        [ru, 'я громко пою']
      ]
    );
  });

  describe('she sings well', function() {
    shouldTranslate(
      Sentence.$.
        actor(Word.she).
        action(Action.$.primary(Word.sing).adverb(Word.well).$).
        time(Word.now).$,
      [
        [en, 'she sings well'],
        [fi, 'laulaa hyvin'],
        [nl, 'zij zingt goed'],
        [ru, 'она хорошо поет']
      ]
    );
  });

  describe('they sang slowly', function() {
    shouldTranslate(
      Sentence.$.
        actor(Word.they).
        action(Action.$.primary(Word.sing).adverb(Word.slowly).$).
        time(Word.past).$,
      [
        [en, 'they sang slowly'],
        [fi, 'lauloivat hitaasti'],
        [nl, 'ze zongen langzaam'],
        [ru, 'они медленно пели']
      ]
    );
  });

  describe('he will build quickly', function() {
    shouldTranslate(
      Sentence.$.
        actor(Word.he).
        action(Action.$.primary(Word.build).adverb(Word.quickly).$).
        time(Word.future).$,
      [
        [en, 'he will build quickly'],
        [fi, 'rakentaa nopeasti'],
        [nl, 'hij bouwt snel'],
        [ru, 'он быстро будет строить']
      ]
    );
  });

  describe('adverb with negation: I do not sing loudly', function() {
    shouldTranslate(
      Sentence.$.
        actor(Word.I).
        action(Action.$.primary(Word.sing).negated().adverb(Word.loudly).$).
        time(Word.now).$,
      [
        [en, 'I do not sing loudly'],
        [fi, 'en laula kovaa'],
        [nl, 'ik zing niet hard'],
        [ru, 'я громко не пою']
      ]
    );
  });

  describe('adverb with negation past: she did not sing well', function() {
    shouldTranslate(
      Sentence.$.
        actor(Word.she).
        action(Action.$.primary(Word.sing).negated().adverb(Word.well).$).
        time(Word.past).$,
      [
        [en, 'she did not sing well'],
        [fi, 'ei laulanut hyvin'],
        [nl, 'zij zong niet goed'],
        [ru, 'она хорошо не пела']
      ]
    );
  });

  describe('negated adverb (adverb is negated, not the verb): I sing not loudly', function() {
    shouldTranslate(
      Sentence.$.
        actor(Word.I).
        action(Action.$.primary(Word.sing).adverb(Word.loudly, { negated: true }).$).
        time(Word.now).$,
      [
        [en, 'I sing not loudly'],
        [fi, 'laulan ei kovaa'],
        [nl, 'ik zing niet hard'],
        [ru, 'я не громко пою']
      ]
    );
  });

  describe('negated adverb past: she sang not well', function() {
    shouldTranslate(
      Sentence.$.
        actor(Word.she).
        action(Action.$.primary(Word.sing).adverb(Word.well, { negated: true }).$).
        time(Word.past).$,
      [
        [en, 'she sang not well'],
        [fi, 'lauloi ei hyvin'],
        [nl, 'zij zong niet goed'],
        [ru, 'она не хорошо пела']
      ]
    );
  });
});

describe('verb be', function() {

  describe('present', function() {

    describe('I', function() {
      shouldTranslate(
        Sentence.$.actor(Word.I).action(Word.be).time(Word.now).$,
        [
          [en, 'I am'],
          [fi, 'olen'],
          [nl, 'ik ben'],
          [ru, 'я']
        ]
      );
    });

    describe('you', function() {
      shouldTranslate(
        Sentence.$.actor(Word.you).action(Word.be).time(Word.now).$,
        [
          [en, 'you are'],
          [fi, 'olet'],
          [nl, 'je bent'],
          [ru, 'ты']
        ]
      );
    });

    describe('she', function() {
      shouldTranslate(
        Sentence.$.actor(Word.she).action(Word.be).time(Word.now).$,
        [
          [en, 'she is'],
          [fi, 'on'],
          [nl, 'zij is'],
          [ru, 'она']
        ]
      );
    });

    describe('we', function() {
      shouldTranslate(
        Sentence.$.actor(Word.we).action(Word.be).time(Word.now).$,
        [
          [en, 'we are'],
          [fi, 'olemme'],
          [nl, 'we zijn'],
          [ru, 'мы']
        ]
      );
    });

    describe('they', function() {
      shouldTranslate(
        Sentence.$.actor(Word.they).action(Word.be).time(Word.now).$,
        [
          [en, 'they are'],
          [fi, 'ovat'],
          [nl, 'ze zijn'],
          [ru, 'они']
        ]
      );
    });
  });

  describe('past', function() {

    describe('I', function() {
      shouldTranslate(
        Sentence.$.actor(Word.I).action(Word.be).time(Word.past).$,
        [
          [en, 'I was'],
          [fi, 'olin'],
          [nl, 'ik was'],
          [ru, 'я был']
        ]
      );
    });

    describe('she', function() {
      shouldTranslate(
        Sentence.$.actor(Word.she).action(Word.be).time(Word.past).$,
        [
          [en, 'she was'],
          [fi, 'oli'],
          [nl, 'zij was'],
          [ru, 'она была']
        ]
      );
    });

    describe('they', function() {
      shouldTranslate(
        Sentence.$.actor(Word.they).action(Word.be).time(Word.past).$,
        [
          [en, 'they were'],
          [fi, 'olivat'],
          [nl, 'ze waren'],
          [ru, 'они были']
        ]
      );
    });
  });

  describe('future', function() {

    describe('I', function() {
      shouldTranslate(
        Sentence.$.actor(Word.I).action(Word.be).time(Word.future).$,
        [
          [en, 'I will be'],
          [fi, 'olen'],
          [nl, 'ik ben'],
          [ru, 'я буду']
        ]
      );
    });

    describe('he', function() {
      shouldTranslate(
        Sentence.$.actor(Word.he).action(Word.be).time(Word.future).$,
        [
          [en, 'he will be'],
          [fi, 'on'],
          [nl, 'hij is'],
          [ru, 'он будет']
        ]
      );
    });
  });

  describe('negated', function() {

    describe('present I', function() {
      shouldTranslate(
        Sentence.$.
          actor(Word.I).
          action(Action.$.primary(Word.be).negated().$).
          time(Word.now).$,
        [
          [en, 'I am not'],
          [fi, 'en ole'],
          [nl, 'ik ben niet'],
          [ru, 'я не']
        ]
      );
    });

    describe('present she', function() {
      shouldTranslate(
        Sentence.$.
          actor(Word.she).
          action(Action.$.primary(Word.be).negated().$).
          time(Word.now).$,
        [
          [en, 'she is not'],
          [fi, 'ei ole'],
          [nl, 'zij is niet'],
          [ru, 'она не']
        ]
      );
    });

    describe('past I', function() {
      shouldTranslate(
        Sentence.$.
          actor(Word.I).
          action(Action.$.primary(Word.be).negated().$).
          time(Word.past).$,
        [
          [en, 'I was not'],
          [fi, 'en ollut'],
          [nl, 'ik was niet'],
          [ru, 'я не был']
        ]
      );
    });

    describe('future I', function() {
      shouldTranslate(
        Sentence.$.
          actor(Word.I).
          action(Action.$.primary(Word.be).negated().$).
          time(Word.future).$,
        [
          [en, 'I will not be'],
          [fi, 'en ole'],
          [nl, 'ik ben niet'],
          [ru, 'я не буду']
        ]
      );
    });
  });
});

describe('possessive pronouns', function() {

  describe('my house', function() {
    shouldTranslate(
      Entity.$(Word.house).possessor(Word.I).$,
      [
        [en, 'my house'],
        [fi, 'minun talo'],
        [nl, 'mijn huis'],
        [ru, 'мой дом']
      ]
    );
  });

  describe('your bird (Russian feminine agreement)', function() {
    shouldTranslate(
      Entity.$(Word.bird).possessor(Word.you).$,
      [
        [en, 'your bird'],
        [fi, 'sinun lintu'],
        [nl, 'jouw vogel'],
        [ru, 'твоя птица']
      ]
    );
  });

  describe('his wolf', function() {
    shouldTranslate(
      Entity.$(Word.wolf).possessor(Word.he).$,
      [
        [en, 'his wolf'],
        [fi, 'hänen susi'],
        [nl, 'zijn wolf'],
        [ru, 'его волк']
      ]
    );
  });

  describe('her lake (Russian neuter agreement)', function() {
    shouldTranslate(
      Entity.$(Word.lake).possessor(Word.she).$,
      [
        [en, 'her lake'],
        [fi, 'hänen järvi'],
        [nl, 'haar meer'],
        [ru, 'её озеро']
      ]
    );
  });

  describe('our sun', function() {
    shouldTranslate(
      Entity.$(Word.sun).possessor(Word.we).$,
      [
        [en, 'our sun'],
        [fi, 'meidän aurinko'],
        [nl, 'onze zon'],
        [ru, 'наше солнце']
      ]
    );
  });

  describe('their house', function() {
    shouldTranslate(
      Entity.$(Word.house).possessor(Word.they).$,
      [
        [en, 'their house'],
        [fi, 'heidän talo'],
        [nl, 'hun huis'],
        [ru, 'их дом']
      ]
    );
  });

  describe('possessive with adjective: my big wolf', function() {
    shouldTranslate(
      Entity.$(Word.wolf).possessor(Word.I).adjective(Word.big).$,
      [
        [en, 'my big wolf'],
        [fi, 'minun suuri susi'],
        [nl, 'mijn grote wolf'],
        [ru, 'мой большой волк']
      ]
    );
  });

  describe('possessive in sentence: I see my bird', function() {
    shouldTranslate(
      Sentence.$.
        actor(Word.I).
        action(Action.$.primary(Word.see).subject(Entity.$(Word.bird).possessor(Word.I).$).$).
        time(Word.now).$,
      [
        [en, 'I see my bird'],
        [fi, 'näen minun linnun'],
        [nl, 'ik zie mijn vogel'],
        [ru, 'я вижу мою птицу']
      ]
    );
  });
});

describe('imperative mood', function() {

  describe('Sing!', function() {
    shouldTranslate(
      Sentence.$.actor(Word.you).action(Word.sing).time(Word.imperative).$,
      [
        [en, 'sing'],
        [fi, 'laula'],
        [nl, 'zing'],
        [ru, 'пой']
      ]
    );
  });

  describe('Look!', function() {
    shouldTranslate(
      Sentence.$.actor(Word.you).action(Word.look).time(Word.imperative).$,
      [
        [en, 'look'],
        [fi, 'katso'],
        [nl, 'kijk'],
        [ru, 'смотри']
      ]
    );
  });

  describe('Go!', function() {
    shouldTranslate(
      Sentence.$.actor(Word.you).action(Word.go).time(Word.imperative).$,
      [
        [en, 'go'],
        [fi, 'mene'],
        [nl, 'ga'],
        [ru, 'иди']
      ]
    );
  });

  describe('Build!', function() {
    shouldTranslate(
      Sentence.$.actor(Word.you).action(Word.build).time(Word.imperative).$,
      [
        [en, 'build'],
        [fi, 'rakenna'],
        [nl, 'bouw'],
        [ru, 'строй']
      ]
    );
  });

  describe('Do not sing!', function() {
    shouldTranslate(
      Sentence.$.
        actor(Word.you).
        action(Action.$.primary(Word.sing).negated().$).
        time(Word.imperative).$,
      [
        [en, 'do not sing'],
        [fi, 'älä laula'],
        [nl, 'zing niet'],
        [ru, 'не пой']
      ]
    );
  });

  describe('Do not look!', function() {
    shouldTranslate(
      Sentence.$.
        actor(Word.you).
        action(Action.$.primary(Word.look).negated().$).
        time(Word.imperative).$,
      [
        [en, 'do not look'],
        [fi, 'älä katso'],
        [nl, 'kijk niet'],
        [ru, 'не смотри']
      ]
    );
  });

  describe('imperative with subject: See the bird!', function() {
    const wordThis = (Word as unknown as Record<string, Word>)['this'];
    shouldTranslate(
      Sentence.$.
        actor(Word.you).
        action(Action.$.primary(Word.see).subject(Entity.$(Word.bird).specifier(wordThis).$).$).
        time(Word.imperative).$,
      [
        [en, 'see the bird'],
        [fi, 'näe lintu'],
        [nl, 'zie de vogel'],
        [ru, 'смотри птицу']
      ]
    );
  });
});

describe('prepositional phrases', function() {

  const wordThis = (Word as unknown as Record<string, Word>)['this'];

  describe('I go to the lake', function() {
    shouldTranslate(
      Sentence.$.
        actor(Word.I).
        action(Action.$.
          primary(Word.go).
          prepositionalPhrase(PrepositionalPhrase.$(Word.to).object(Entity.$(Word.lake).specifier(wordThis).$).$).$).
        time(Word.now).$,
      [
        [en, 'I go to the lake'],
        [fi, 'menen järvelle'],
        [nl, 'ik ga naar het meer'],
        [ru, 'я иду к озеру']
      ]
    );
  });

  describe('she looks at the bird', function() {
    shouldTranslate(
      Sentence.$.
        actor(Word.she).
        action(Action.$.
          primary(Word.look).
          prepositionalPhrase(PrepositionalPhrase.$(Word.at).object(Entity.$(Word.bird).specifier(wordThis).$).$).$).
        time(Word.now).$,
      [
        [en, 'she looks at the bird'],
        [fi, 'katsoo lintua'],
        [nl, 'zij kijkt naar de vogel'],
        [ru, 'она смотрит на птицу']
      ]
    );
  });

  describe('I went from the lake', function() {
    shouldTranslate(
      Sentence.$.
        actor(Word.I).
        action(Action.$.
          primary(Word.go).
          prepositionalPhrase(PrepositionalPhrase.$(Word.from).object(Entity.$(Word.lake).specifier(wordThis).$).$).$).
        time(Word.past).$,
      [
        [en, 'I went from the lake'],
        [fi, 'menin järvestä'],
        [nl, 'ik ging van het meer'],
        [ru, 'я шел из озера']
      ]
    );
  });

  describe('I do not go to the lake', function() {
    shouldTranslate(
      Sentence.$.
        actor(Word.I).
        action(Action.$.
          primary(Word.go).
          negated().
          prepositionalPhrase(PrepositionalPhrase.$(Word.to).object(Entity.$(Word.lake).specifier(wordThis).$).$).$).
        time(Word.now).$,
      [
        [en, 'I do not go to the lake'],
        [fi, 'en mene järvelle'],
        [nl, 'ik ga niet naar het meer'],
        [ru, 'я не иду к озеру']
      ]
    );
  });

  describe('go over the wolf (preposition with instrumental in Russian)', function() {
    shouldTranslate(
      Sentence.$.
        actor(Word.I).
        action(Action.$.
          primary(Word.go).
          prepositionalPhrase(PrepositionalPhrase.$(Word.over).object(Entity.$(Word.wolf).specifier(wordThis).$).$).$).
        time(Word.past).$,
      [
        [en, 'I went over the wolf'],
        [fi, 'menin suden yli'],
        [nl, 'ik ging over de wolf'],
        [ru, 'я шел над волком']
      ]
    );
  });
});

describe('compound sentences', function() {

  describe('I sing and you look', function() {
    shouldTranslate(
      CompoundSentence.$.
        sentence(Sentence.$.actor(Word.I).action(Word.sing).time(Word.now).$).
        coordinator(Word.and).
        sentence(Sentence.$.actor(Word.you).action(Word.look).time(Word.now).$).$,
      [
        [en, 'I sing and you look'],
        [fi, 'laulan ja katsot'],
        [nl, 'ik zing en je kijkt'],
        [ru, 'я пою и ты смотришь']
      ]
    );
  });

  describe('she sang but she did not see', function() {
    shouldTranslate(
      CompoundSentence.$.
        sentence(Sentence.$.actor(Word.she).action(Word.sing).time(Word.past).$).
        coordinator(Word.but).
        sentence(Sentence.$.actor(Word.she).action(Action.$.primary(Word.see).negated().$).time(Word.past).$).$,
      [
        [en, 'she sang but she did not see'],
        [fi, 'lauloi mutta ei nähnyt'],
        [nl, 'zij zong maar zij zag niet'],
        [ru, 'она пела но она не видела']
      ]
    );
  });

  describe('I sing or you sing', function() {
    shouldTranslate(
      CompoundSentence.$.
        sentence(Sentence.$.actor(Word.I).action(Word.sing).time(Word.now).$).
        coordinator(Word.or).
        sentence(Sentence.$.actor(Word.you).action(Word.sing).time(Word.now).$).$,
      [
        [en, 'I sing or you sing'],
        [fi, 'laulan tai laulat'],
        [nl, 'ik zing of je zingt'],
        [ru, 'я пою или ты поешь']
      ]
    );
  });

  describe('three sentences: I sing and you look and she goes', function() {
    shouldTranslate(
      CompoundSentence.$.
        sentence(Sentence.$.actor(Word.I).action(Word.sing).time(Word.now).$).
        coordinator(Word.and).
        sentence(Sentence.$.actor(Word.you).action(Word.look).time(Word.now).$).
        sentence(Sentence.$.actor(Word.she).action(Word.go).time(Word.now).$).$,
      [
        [en, 'I sing and you look and she goes'],
        [fi, 'laulan ja katsot ja menee'],
        [nl, 'ik zing en je kijkt en zij gaat'],
        [ru, 'я пою и ты смотришь и она идет']
      ]
    );
  });

  describe('compound with future: I will sing and she will look', function() {
    shouldTranslate(
      CompoundSentence.$.
        sentence(Sentence.$.actor(Word.I).action(Word.sing).time(Word.future).$).
        coordinator(Word.and).
        sentence(Sentence.$.actor(Word.she).action(Word.look).time(Word.future).$).$,
      [
        [en, 'I will sing and she will look'],
        [fi, 'laulan ja katsoo'],
        [nl, 'ik zing en zij kijkt'],
        [ru, 'я буду петь и она будет смотреть']
      ]
    );
  });
});

describe('pronouns as prepositional phrase objects', function() {

  describe('she looks at him', function() {
    shouldTranslate(
      Sentence.$.
        actor(Word.she).
        action(Action.$.
          primary(Word.look).
          prepositionalPhrase(PrepositionalPhrase.$(Word.at).object(Word.he).$).$).
        time(Word.now).$,
      [
        [en, 'she looks at him'],
        [fi, 'katsoo häntä'],
        [nl, 'zij kijkt naar hem'],
        [ru, 'она смотрит на него']
      ]
    );
  });

  describe('I go to her', function() {
    shouldTranslate(
      Sentence.$.
        actor(Word.I).
        action(Action.$.
          primary(Word.go).
          prepositionalPhrase(PrepositionalPhrase.$(Word.to).object(Word.she).$).$).
        time(Word.now).$,
      [
        [en, 'I go to her'],
        [fi, 'menen hänelle'],
        [nl, 'ik ga naar haar'],
        [ru, 'я иду к ней']
      ]
    );
  });

  describe('he goes behind us', function() {
    shouldTranslate(
      Sentence.$.
        actor(Word.he).
        action(Action.$.
          primary(Word.go).
          prepositionalPhrase(PrepositionalPhrase.$(Word.behind).object(Word.we).$).$).
        time(Word.now).$,
      [
        [en, 'he goes behind us'],
        [fi, 'menee meidän takana'],
        [nl, 'hij gaat achter ons'],
        [ru, 'он идет за нами']
      ]
    );
  });

  describe('they look at me', function() {
    shouldTranslate(
      Sentence.$.
        actor(Word.they).
        action(Action.$.
          primary(Word.look).
          prepositionalPhrase(PrepositionalPhrase.$(Word.at).object(Word.I).$).$).
        time(Word.now).$,
      [
        [en, 'they look at me'],
        [fi, 'katsovat minua'],
        [nl, 'ze kijken naar mij'],
        [ru, 'они смотрят на меня']
      ]
    );
  });
});

describe('questions', function() {

  describe('yes/no questions', function() {

    describe('do you sing?', function() {
      shouldTranslate(
        Question.$.actor(Word.you).action(Word.sing).time(Word.now).$,
        [
          [en, 'do you sing?'],
          [fi, 'laulatko?'],
          [nl, 'zing je?'],
          [ru, 'ты поешь?']
        ]
      );
    });

    describe('did she go?', function() {
      shouldTranslate(
        Question.$.actor(Word.she).action(Word.go).time(Word.past).$,
        [
          [en, 'did she go?'],
          [fi, 'menikö?'],
          [nl, 'ging zij?'],
          [ru, 'она шла?']
        ]
      );
    });

    describe('can you sing?', function() {
      shouldTranslate(
        Question.$.actor(Word.you).action(Action.$.primary(Word.can).secondary(Word.sing).$).time(Word.now).$,
        [
          [en, 'can you sing?'],
          [fi, 'voitko laulaa?'],
          [nl, 'kun je zingen?'],
          [ru, 'ты можешь петь?']
        ]
      );
    });
  });

  describe('wh-questions', function() {

    describe('what do you see?', function() {
      shouldTranslate(
        Question.$.questionWord(Word.what).actor(Word.you).action(Word.see).time(Word.now).$,
        [
          [en, 'what do you see?'],
          [fi, 'mitä näet?'],
          [nl, 'wat zie je?'],
          [ru, 'что ты видишь?']
        ]
      );
    });
  });
});

describe('subordinate clauses', function() {

  describe('I sing because she looks', function() {
    shouldTranslate(
      SubordinateSentence.$.
        main(Sentence.$.actor(Word.I).action(Word.sing).time(Word.now).$).
        subordinator(Word.because).
        subordinate(Sentence.$.actor(Word.she).action(Word.look).time(Word.now).$).$,
      [
        [en, 'I sing because she looks'],
        [fi, 'laulan koska katsoo'],
        [nl, 'ik zing omdat zij kijkt'],
        [ru, 'я пою потому что она смотрит']
      ]
    );
  });

  describe('because she looks, I sing', function() {
    shouldTranslate(
      SubordinateSentence.$.
        main(Sentence.$.actor(Word.I).action(Word.sing).time(Word.now).$).
        subordinator(Word.because).
        subordinate(Sentence.$.actor(Word.she).action(Word.look).time(Word.now).$).
        subordinateFirst().$,
      [
        [en, 'because she looks, I sing'],
        [fi, 'koska katsoo, laulan'],
        [nl, 'omdat zij kijkt, ik zing'],
        [ru, 'потому что она смотрит, я пою']
      ]
    );
  });

  describe('when the sun shines, he goes', function() {
    shouldTranslate(
      SubordinateSentence.$.
        main(Sentence.$.actor(Word.he).action(Word.go).time(Word.now).$).
        subordinator(Word.when_conj).
        subordinate(Sentence.$.actor(Word.sun).action(Word.shine).time(Word.now).$).
        subordinateFirst().$,
      [
        [en, 'when sun shines, he goes'],
        [fi, 'kun aurinko paistaa, menee'],
        [nl, 'wanneer de zon schijnt, hij gaat'],
        [ru, 'когда солнце светит, он идет']
      ]
    );
  });
});

describe('progressive aspect', function() {

  describe('I am singing', function() {
    shouldTranslate(
      Sentence.$.actor(Word.I).action(Word.sing).time(Word.now).aspect(Word.progressive).$,
      [
        [en, 'I am singing'],
        [fi, 'laulan'],
        [nl, 'ik ben aan het zingen'],
        [ru, 'я пою']
      ]
    );
  });

  describe('she was singing', function() {
    shouldTranslate(
      Sentence.$.actor(Word.she).action(Word.sing).time(Word.past).aspect(Word.progressive).$,
      [
        [en, 'she was singing'],
        [fi, 'lauloi'],
        [nl, 'zij was aan het zingen'],
        [ru, 'она пела']
      ]
    );
  });
});

describe('perfect aspect', function() {

  describe('I have seen', function() {
    shouldTranslate(
      Sentence.$.actor(Word.I).action(Word.see).time(Word.now).aspect(Word.perfect).$,
      [
        [en, 'I have seen'],
        [fi, 'olen nähnyt'],
        [nl, 'ik heb gezien'],
        [ru, 'я видел']
      ]
    );
  });

  describe('she had gone', function() {
    shouldTranslate(
      Sentence.$.actor(Word.she).action(Word.go).time(Word.past).aspect(Word.perfect).$,
      [
        [en, 'she had gone'],
        [fi, 'oli mennyt'],
        [nl, 'zij had gegaan'],
        [ru, 'она шла']
      ]
    );
  });
});

describe('passive voice', function() {

  const wordThis = (Word as unknown as Record<string, Word>)['this'];

  describe('the house was built', function() {
    shouldTranslate(
      Sentence.$.actor(Entity.$(Word.house).specifier(wordThis).$).action(Action.$.primary(Word.build).passive().$).time(Word.past).$,
      [
        [en, 'the house was built'],
        [fi, 'talo oli rakentanut'],
        [nl, 'het huis was gebouwd'],
        [ru, 'дом был построен']
      ]
    );
  });

  describe('the house was built by him', function() {
    shouldTranslate(
      Sentence.$.actor(Entity.$(Word.house).specifier(wordThis).$).action(Action.$.primary(Word.build).passive().agent(Word.he).$).time(Word.past).$,
      [
        [en, 'the house was built by him'],
        [fi, 'talo oli rakentanut hän'],
        [nl, 'het huis was gebouwd door hem'],
        [ru, 'дом был построен ним']
      ]
    );
  });
});

describe('relative clauses', function() {

  const wordThis = (Word as unknown as Record<string, Word>)['this'];

  describe('the bird that sings', function() {
    shouldTranslate(
      Entity.$(Word.bird).specifier(wordThis).relativeClause(Word.that_rel,
        Sentence.$.actor(Word.it).action(Word.sing).time(Word.now).$).$,
      [
        [en, 'the bird that sings'],
        [fi, 'lintu joka laulaa'],
        [nl, 'de vogel die zingt'],
        [ru, 'птица который поет']
      ]
    );
  });

  describe('I see the bird that sings', function() {
    shouldTranslate(
      Sentence.$.actor(Word.I).action(Action.$.primary(Word.see).subject(
        Entity.$(Word.bird).specifier(wordThis).relativeClause(Word.that_rel,
          Sentence.$.actor(Word.it).action(Word.sing).time(Word.now).$).$
      ).$).time(Word.now).$,
      [
        [en, 'I see the bird that sings'],
        [fi, 'näen linnun joka laulaa'],
        [nl, 'ik zie de vogel die zingt'],
        [ru, 'я вижу птицу который поет']
      ]
    );
  });
});

describe('conditional mood', function() {

  describe('I would sing', function() {
    shouldTranslate(
      Sentence.$.actor(Word.I).action(Word.sing).time(Word.conditional).$,
      [
        [en, 'I would sing'],
        [fi, 'laulaisin'],
        [nl, 'ik zou zingen'],
        [ru, 'я пел бы']
      ]
    );
  });

  describe('she would go', function() {
    shouldTranslate(
      Sentence.$.actor(Word.she).action(Word.go).time(Word.conditional).$,
      [
        [en, 'she would go'],
        [fi, 'menisi'],
        [nl, 'zij zou gaan'],
        [ru, 'она шла бы']
      ]
    );
  });
});

describe('comparative adjectives', function() {

  const wordThis = (Word as unknown as Record<string, Word>)['this'];

  describe('bigger house', function() {
    shouldTranslate(
      Entity.$(Word.house).adjective(Word.big, 'comparative').$,
      [
        [en, 'bigger house'],
        [fi, 'suurempi talo'],
        [nl, 'grotere huis'],
        [ru, 'больше дом']
      ]
    );
  });

  describe('the biggest house', function() {
    shouldTranslate(
      Entity.$(Word.house).specifier(wordThis).adjective(Word.big, 'superlative').$,
      [
        [en, 'the biggest house'],
        [fi, 'suurin talo'],
        [nl, 'het grootste huis'],
        [ru, 'самый большой дом']
      ]
    );
  });

  describe('the best bird', function() {
    shouldTranslate(
      Entity.$(Word.bird).specifier(wordThis).adjective(Word.good, 'superlative').$,
      [
        [en, 'the best bird'],
        [fi, 'paras lintu'],
        [nl, 'de beste vogel'],
        [ru, 'лучший птица']
      ]
    );
  });
});
