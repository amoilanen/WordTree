define('lang.nl', ['lang', 'grammar'], function(Lang, Grammar) {

  var {Translation, Language, ActionTranslation} = Lang;
  var {Word} = Grammar;

  class ActionTranslationNl extends ActionTranslation {

    constructor(opts) {
      opts.defaultForm = opts.root + 'en';
      opts.futureMatchesNow = true;
      super(opts);
      super.conjugate();
    }

    getPresentForms() {
      var base = this.conjugationRoots.now;
      var otherPersonForm = `${base}t`;
      var pluralForm = `${base}en`;

      return {
        I: base,
        you: otherPersonForm,
        you_formal: otherPersonForm,
        he: otherPersonForm,
        she: otherPersonForm,
        it: otherPersonForm,
        we: pluralForm,
        you_plural_formal: pluralForm,
        you_plural: pluralForm,
        they: pluralForm
      };
    }

    getPastForms() {
      var base = this.conjugationRoots.past;
      var pluralForm = `${base}en`;

      return {
        I: base,
        you: base,
        you_formal: base,
        he: base,
        she: base,
        it: base,
        we: pluralForm,
        you_plural_formal: pluralForm,
        you_plural: pluralForm,
        they: pluralForm
      };
    }
  }

  var translations = {
    sun: new Translation('zon'),
    sing: new ActionTranslationNl({
      root: 'zing',
      conjugationRoots: {
        past: 'zong'
      }
    }),
    do: new ActionTranslationNl({
      root: 'do',
      conjugationRoots: {
        now: 'doe',
        past: 'deed'
      },
      conjugations: {
        now: {
          plural: 'doen'
        }
      }
    }),
    go: new ActionTranslationNl({
      root: 'ga',
      conjugationRoots: {
        past: 'ging'
      },
      conjugations: {
        now: {
          other_single: 'gaat',
          plural: 'gaan'
        }
      }
    }),
    sew: new ActionTranslationNl({
      root: 'naai',
      conjugationRoots: {
        past: 'naaid'
      },
      conjugations: {
        past: {
          I: 'naaide',
          other_single: 'naaide'
        }
      }
    }),
    build: new Translation('bouwen', 'bouwen', {
      now: {
        I: 'bouw',
        you: 'bouwt',
        you_formal: 'bouwt',
        he: 'bouwt',
        she: 'bouwt',
        it: 'bouwt',
        we: 'bouwen',
        you_plural_formal: 'bouwen',
        you_plural: 'bouwen',
        they: 'bouwen'
      },
      future: {
        I: 'bouw',
        you: 'bouwt',
        you_formal: 'bouwt',
        he: 'bouwt',
        she: 'bouwt',
        it: 'bouwt',
        we: 'bouwen',
        you_plural_formal: 'bouwen',
        you_plural: 'bouwen',
        they: 'bouwen'
      },
      past: {
        I: 'bouwde',
        you: 'bouwde',
        you_formal: 'bouwde',
        he: 'bouwde',
        she: 'bouwde',
        it: 'bouwde',
        we: 'bouwden',
        you_plural_formal: 'bouwden',
        you_plural: 'bouwden',
        they: 'bouwden'
      }
    }),
    give: new Translation('geven', 'geven', {
      now: {
        I: 'geef',
        you: 'geeft',
        you_formal: 'geeft',
        he: 'geeft',
        she: 'geeft',
        it: 'geeft',
        we: 'geven',
        you_plural_formal: 'geven',
        you_plural: 'geven',
        they: 'geven'
      },
      future: {
        I: 'geef',
        you: 'geeft',
        you_formal: 'geeft',
        he: 'geeft',
        she: 'geeft',
        it: 'geeft',
        we: 'geven',
        you_plural_formal: 'geven',
        you_plural: 'geven',
        they: 'geven'
      },
      past: {
        I: 'gaf',
        you: 'gaf',
        you_formal: 'gaf',
        he: 'gaf',
        she: 'gaf',
        it: 'gaf',
        we: 'gaven',
        you_plural_formal: 'gaven',
        you_plural: 'gaven',
        they: 'gaven'
      }
    }),
    look: new Translation('kijken', 'kijken', {
      now: {
        I: 'kijk',
        you: 'kijkt',
        you_formal: 'kijkt',
        he: 'kijkt',
        she: 'kijkt',
        it: 'kijkt',
        we: 'kijken',
        you_plural_formal: 'kijken',
        you_plural: 'kijken',
        they: 'kijken'
      },
      future: {
        I: 'kijk',
        you: 'kijkt',
        you_formal: 'kijkt',
        he: 'kijkt',
        she: 'kijkt',
        it: 'kijkt',
        we: 'kijken',
        you_plural_formal: 'kijken',
        you_plural: 'kijken',
        they: 'kijken'
      },
      past: {
        I: 'keek',
        you: 'keek',
        you_formal: 'keek',
        he: 'keek',
        she: 'keek',
        it: 'keek',
        we: 'keken',
        you_plural_formal: 'keken',
        you_plural: 'keken',
        they: 'keken'
      }
    }),
    see: new Translation('zien', 'zien', {
      now: {
        I: 'zie',
        you: 'ziet',
        you_formal: 'ziet',
        he: 'ziet',
        she: 'ziet',
        it: 'ziet',
        we: 'zien',
        you_plural_formal: 'zien',
        you_plural: 'zien',
        they: 'zien'
      },
      future: {
        I: 'zie',
        you: 'ziet',
        you_formal: 'ziet',
        he: 'ziet',
        she: 'ziet',
        it: 'ziet',
        we: 'zien',
        you_plural_formal: 'zien',
        you_plural: 'zien',
        they: 'zien'
      },
      past: {
        I: 'zag',
        you: 'zag',
        you_formal: 'zag',
        he: 'zag',
        she: 'zag',
        it: 'zag',
        we: 'zagen',
        you_plural_formal: 'zagen',
        you_plural: 'zagen',
        they: 'zagen'
      }
    }),
    now: new Translation('nu'),
    future: new Translation('toekomst'),
    past: new Translation('verleden'),
    I: new Translation('ik'),
    you: new Translation('je'),
    you_formal: new Translation('u'),
    he: new Translation('hij'),
    she: new Translation('zij'),
    it: new Translation('het'),
    we: new Translation('we'),
    you_plural: new Translation('jullie'),
    you_plural_formal: new Translation('u'),
    they: new Translation('ze')
  };

  class Dutch extends Language {

    constructor(translations) {
      super('Dutch', translations);
    }
  }

  return new Dutch(translations);
});