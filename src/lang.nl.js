define('lang.nl', ['lang', 'grammar', 'util'], function(Lang, Grammar, _) {

  var {Translation, Language, ActionTranslation} = Lang;
  var {Word} = Grammar;

  class ActionTranslationNl extends ActionTranslation {

    constructor(opts) {
      opts.defaultForm = opts.root + 'en';
      if (!_.isDefined(opts.conjugationRoots)) {
        opts.conjugationRoots = {};
      }
      if (!_.isDefined(opts.conjugationRoots['past'])) {
        opts.conjugationRoots['past'] = `${opts.root}d`;
      }
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
      conjugations: {
        past: {
          I: 'naaide',
          other_single: 'naaide'
        }
      }
    }),
    build: new ActionTranslationNl({
      root: 'bouw',
      conjugations: {
        past: {
          I: 'bouwde',
          other_single: 'bouwde'
        }
      }
    }),
    give: new ActionTranslationNl({
      root: 'gev',
      conjugationRoots: {
        now: 'geef',
        past: 'gaf'
      },
      conjugations: {
        now: {
          plural: 'geven'
        },
        past: {
          plural: 'gaven'
        }
      }
    }),
    look: new ActionTranslationNl({
      root: 'kijk',
      conjugationRoots: {
        past: 'keek'
      },
      conjugations: {
        past: {
          plural: 'keken'
        }
      }
    }),
    see: new ActionTranslationNl({
      root: 'zie',
      conjugationRoots: {
        past: 'zag'
      },
      conjugations: {
        now: {
          plural: 'zien'
        }
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