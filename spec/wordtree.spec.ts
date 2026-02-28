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
