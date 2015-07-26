define('lang.en', ['lang', 'grammar', 'util'], function(Lang, Grammar, _) {

  var {Translation, Language, ActionTranslation} = Lang;
  var {Word} = Grammar;

  class ActionTranslationEn extends ActionTranslation {

    constructor(opts) {
      opts.defaultForm = opts.root;
      super(opts);
      super.conjugate();
    }

    getPresentForms() {
      return _.extend(this.allPersons(this.defaultForm), {
        he: this.defaultForm + 's',
        she: this.defaultForm + 's',
        it: this.defaultForm + 's',
      });
    }

    getFutureForms() {
      return this.allPersons(`will ${this.defaultForm}`);
    }

    getPastForms() {
      return this.allPersons(`${this.defaultForm}ed`);
    }
  }

  var translations = {
    sun: new Translation('sun'),
    sing: new ActionTranslationEn({
      root: 'sing',
      conjugations: {
        past: 'sang'
      }
    }),
    do: new ActionTranslationEn({
      root: 'do',
      conjugations: {
        now: {
          he_she_it: 'does'
        },
        past: 'did'
      }
    }),
    sew: new ActionTranslationEn({
      root: 'sew'
    }),
    go: new ActionTranslationEn({
      root: 'go',
      conjugations: {
        now: {
          he_she_it: 'goes'
        },
        past: 'went'
      }
    }),
    build: new ActionTranslationEn({
      root: 'build',
      conjugations: {
        past: 'built'
      }
    }),
    give: new ActionTranslationEn({
      root: 'give',
      conjugations: {
        past: 'gave'
      }
    }),
    look: new ActionTranslationEn({
      root: 'look'
    }),
    see: new ActionTranslationEn({
      root: 'see',
      conjugations: {
        past: 'saw'
      }
    }),
    now: new Translation('now'),
    future: new Translation('future'),
    past: new Translation('past'),
    I: new Translation('I'),
    you: new Translation('you'),
    you_formal: new Translation('you'),
    he: new Translation('he'),
    she: new Translation('she'),
    it: new Translation('it'),
    we: new Translation('we'),
    you_plural: new Translation('you'),
    you_plural_formal: new Translation('you'),
    they: new Translation('they')
  };

  class English extends Language {

    constructor(translations) {
      super('English', translations);
    }
  }

  return new English(translations);
});