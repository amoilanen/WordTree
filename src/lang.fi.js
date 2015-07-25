define('lang.fi', ['lang', 'grammar'], function(Lang, Grammar) {

  var {Translation, Language, ActionTranslation} = Lang;
  var {Word} = Grammar;

  class ActionTranslationFi extends ActionTranslation {

    constructor(opts) {
      opts.keyVowel = opts.keyVowel || '';
      opts.defaultForm = opts.root;
      super(opts);
      this.keyVowel = opts.keyVowel;
      super.conjugate();
    }

    getPresentForms() {
      var base = this.conjugationRoots.now + this.keyVowel;

      return {
        I: `${base}n`,
        you: `${base}t`,
        you_formal: `${base}t`,
        he: `${base}${this.keyVowel}`,
        she: `${base}${this.keyVowel}`,
        it: `${base}${this.keyVowel}`,
        we: `${base}mme`,
        you_plural_formal: `${base}tte`,
        you_plural: `${base}tte`,
        they: `${base}vat`
      };
    }

    getFutureForms() {
      return this.getPresentForms();
    }

    getPastForms() {
      var base = this.conjugationRoots.past;

      return {
        I: `${base}in`,
        you: `${base}it`,
        you_formal: `${base}it`,
        he: `${base}i`,
        she: `${base}i`,
        it: `${base}i`,
        we: `${base}imme`,
        you_plural_formal: `${base}itte`,
        you_plural: `${base}itte`,
        they: `${base}ivat`
      };
    }
  }

  var translations = {
    sun: new Translation('aurinko'),
    sing: new ActionTranslationFi({
      root: 'laul',
      keyVowel: 'a',
      defaultForm: 'laulaa',
      conjugationRoots: {
        past: 'laulo'
      }
    }),
    do: new Translation('tehdä', 'tehdä', {
      now: {
        I: 'teen',
        you: 'teet',
        you_formal: 'teet',
        he: 'tekee',
        she: 'tekee',
        it: 'tekee',
        we: 'teemme',
        you_plural_formal: 'teette',
        you_plural: 'teette',
        they: 'tekevät'
      },
      future: {
        I: 'tehdän',
        you: 'teet',
        you_formal: 'teet',
        he: 'tekee',
        she: 'tekee',
        it: 'tekee',
        we: 'teemme',
        you_plural_formal: 'teette',
        you_plural: 'teette',
        they: 'tekevät'
      },
      past: {
        I: 'tein',
        you: 'teit',
        you_formal: 'teit',
        he: 'teki',
        she: 'teki',
        it: 'teki',
        we: 'teimme',
        you_plural_formal: 'teitte',
        you_plural: 'teitte',
        they: 'tekivät'
      }
    }),
    go: new ActionTranslationFi({
      root: 'men',
      keyVowel: 'e',
      defaultForm: 'mennä',
      conjugations: {
        now: {
          they: 'menevät'
        },
        future: {
          they: 'menevät'
        },
        past: {
          they: 'menivät'
        }
      }
    }),
    sew: new Translation('omella', 'omella', {
      now: {
        I: 'omelen',
        you: 'omelet',
        you_formal: 'omelet',
        he: 'omelee',
        she: 'omelee',
        it: 'omelee',
        we: 'omelemme',
        you_plural_formal: 'omelemme',
        you_plural: 'omelette',
        they: 'omelevat'
      },
      future: {
        I: 'omelen',
        you: 'omelet',
        you_formal: 'omelet',
        he: 'omelee',
        she: 'omelee',
        it: 'omelee',
        we: 'omelemme',
        you_plural_formal: 'omelemme',
        you_plural: 'omelette',
        they: 'omelevat'
      },
      past: {
        I: 'omelin',
        you: 'omelit',
        you_formal: 'omelit',
        he: 'omeli',
        she: 'omeli',
        it: 'omeli',
        we: 'omelimme',
        you_plural_formal: 'omelitte',
        you_plural: 'omelitte',
        they: 'omelivat'
      }
    }),
    build: new Translation('rakentaa', 'rakentaa', {
      now: {
        I: 'rakennan',
        you: 'rakennat',
        you_formal: 'rakennat',
        he: 'rakentaa',
        she: 'rakentaa',
        it: 'rakentaa',
        we: 'rakennamme',
        you_plural_formal: 'rakennatte',
        you_plural: 'rakennatte',
        they: 'rakentavat'
      },
      future: {
        I: 'rakennan',
        you: 'rakennat',
        you_formal: 'rakennat',
        he: 'rakentaa',
        she: 'rakentaa',
        it: 'rakentaa',
        we: 'rakennamme',
        you_plural_formal: 'rakennatte',
        you_plural: 'rakennatte',
        they: 'rakentavat'
      },
      past: {
        I: 'rakensin',
        you: 'rakensit',
        you_formal: 'rakensit',
        he: 'rakensi',
        she: 'rakensi',
        it: 'rakensi',
        we: 'rakensimme',
        you_plural_formal: 'rakensitte',
        you_plural: 'rakensitte',
        they: 'rakensivat'
      }
    }),
    give: new Translation('antaa', 'antaa', {
      now: {
        I: 'annan',
        you: 'annat',
        you_formal: 'annat',
        he: 'antaa',
        she: 'antaa',
        it: 'antaa',
        we: 'annamme',
        you_plural_formal: 'annatte',
        you_plural: 'annatte',
        they: 'antavat'
      },
      future: {
        I: 'annan',
        you: 'annat',
        you_formal: 'annat',
        he: 'antaa',
        she: 'antaa',
        it: 'antaa',
        we: 'annamme',
        you_plural_formal: 'annatte',
        you_plural: 'annatte',
        they: 'antavat'
      },
      past: {
        I: 'annoin',
        you: 'annoit',
        you_formal: 'annoit',
        he: 'antoi',
        she: 'antoi',
        it: 'antoi',
        we: 'annoimme',
        you_plural_formal: 'annoitte',
        you_plural: 'annoitte',
        they: 'antoivat'
      }
    }),
    look: new Translation('katsoa', 'katsoa', {
      now: {
        I: 'katson',
        you: 'katsot',
        you_formal: 'katsot',
        he: 'katsoo',
        she: 'katsoo',
        it: 'katsoo',
        we: 'katsomme',
        you_plural_formal: 'katsotte',
        you_plural: 'katsotte',
        they: 'katsovat'
      },
      future: {
        I: 'katson',
        you: 'katsot',
        you_formal: 'katsot',
        he: 'katsoo',
        she: 'katsoo',
        it: 'katsoo',
        we: 'katsomme',
        you_plural_formal: 'katsotte',
        you_plural: 'katsotte',
        they: 'katsovat'
      },
      past: {
        I: 'katsoin',
        you: 'katsoit',
        you_formal: 'katsoit',
        he: 'katsoi',
        she: 'katsoi',
        it: 'katsoi',
        we: 'katsoimme',
        you_plural_formal: 'katsoitte',
        you_plural: 'katsoitte',
        they: 'katsoivat'
      }
    }),
    see: new Translation('nähdä', 'nähdä', {
      now: {
        I: 'nähdän',
        you: 'nähdät',
        you_formal: 'nähdät',
        he: 'nähdää',
        she: 'nähdää',
        it: 'nähdää',
        we: 'nähdämme',
        you_plural_formal: 'nähdätte',
        you_plural: 'nähdätte',
        they: 'nähdävät'
      },
      future: {
        I: 'nähdän',
        you: 'nähdät',
        you_formal: 'nähdät',
        he: 'nähdää',
        she: 'nähdää',
        it: 'nähdää',
        we: 'nähdämme',
        you_plural_formal: 'nähdätte',
        you_plural: 'nähdätte',
        they: 'nähdävät'
      },
      past: {
        I: 'nähdin',
        you: 'nähdit',
        you_formal: 'nähdit',
        he: 'nähdi',
        she: 'nähdi',
        it: 'nähdi',
        we: 'nähdimme',
        you_plural_formal: 'nähditte',
        you_plural: 'nähditte',
        they: 'nähdivät'
      }
    }),
    now: new Translation('nyt'),
    future: new Translation('tulevaisuus'),
    past: new Translation('menneisyys'),
    I: new Translation('minä'),
    you: new Translation('sinä'),
    you_formal: new Translation('sinä'),
    he: new Translation('hän'),
    she: new Translation('hän'),
    it: new Translation('se'),
    we: new Translation('me'),
    you_plural: new Translation('te'),
    you_plural_formal: new Translation('te'),
    they: new Translation('ne')
  };

  class Finnish extends Language {

    constructor(translations) {
      super('Finnish', translations);
    }

    translateActor(actor) {
      return '';
    }
  }

  return new Finnish(translations);
});