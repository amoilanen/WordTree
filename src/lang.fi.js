define('lang.fi', ['lang', 'grammar'], function(Lang, Grammar) {

  var {Translation, Language, ActionTranslation} = Lang;
  var {Word} = Grammar;

  class ActionTranslationFi extends ActionTranslation {

    constructor(opts) {
      opts.keyVowel = opts.keyVowel || '';
      opts.defaultForm = opts.defaultForm;
      opts.futureMatchesNow = true;
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
    sun: new Translation('aurinko', Word.it),
    sing: new ActionTranslationFi({
      root: 'laul',
      keyVowel: 'a',
      defaultForm: 'laulaa',
      conjugationRoots: {
        past: 'laulo'
      }
    }),
    do: new ActionTranslationFi({
      root: 'te',
      keyVowel: 'e',
      defaultForm: 'tehdä',
      conjugationRoots: {
        now: 'te',
        past: 'te'
      },
      conjugations: {
        now: {
          he_she_it: 'tekee',
          they: 'tekevät'
        },
        past: {
          he_she_it: 'teki',
          they: 'tekivät'
        }
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
        past: {
          they: 'menivät'
        }
      }
    }),
    sew: new ActionTranslationFi({
      root: 'omel',
      defaultForm: 'omella',
      keyVowel: 'e'
    }),
    build: new ActionTranslationFi({
      root: 'raken',
      defaultForm: 'rakentaa',
      keyVowel: 'a',
      conjugationRoots: {
        now: 'rakenn',
        past: 'rakens'
      },
      conjugations: {
        now: {
          he_she_it: 'rakentaa',
          they: 'rakentavat'
        }
      }
    }),
    give: new ActionTranslationFi({
      root: 'an',
      defaultForm: 'antaa',
      keyVowel: 'a',
      conjugationRoots: {
        now: 'ann',
        past: 'anno'
      },
      conjugations: {
        now: {
          he_she_it: 'antaa',
          they: 'antavat'
        },
        past: {
          he_she_it: 'antoi',
          they: 'antoivat'
        }
      }
    }),
    look: new ActionTranslationFi({
      root: 'kats',
      defaultForm: 'katsoa',
      keyVowel: 'o',
      conjugationRoots: {
        past: 'katso'
      }
    }),
    see: new ActionTranslationFi({
      root: 'nähd',
      defaultForm: 'nähdä',
      keyVowel: 'ä',
      conjugations: {
        now: {
          they: 'nähdävät'
        },
        past: {
          they: 'nähdivät'
        }
      }
    }),
    want: new ActionTranslationFi({
      root: 'halu',
      keyVowel: 'a',
      conjugationRoots: {
        past: 'halus'
      }
    }),
    can: new ActionTranslationFi({
      root: 'vo',
      keyVowel: 'i',
      conjugationRoots: {
        past: 'vois'
      },
      conjugations: {
        now: {
          he_she_it: 'voi'
        }
      }
    }),
    shine: new ActionTranslationFi({
      root: 'paist',
      keyVowel: 'a',
      conjugationRoots: {
        past: 'paisto'
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
    they: new Translation('ne'),
    wet_snow_with_mud_and_ground: new Translation('loska'),
    snow_on_tree_branch: new Translation('tykky'),
    snow: new Translation('lumi')
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