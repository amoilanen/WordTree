define('lang.en', ['lang', 'grammar'], function(Lang, Grammar) {

  var {Translation, Language, ActionTranslation} = Lang;
  var {Word} = Grammar;

  class ActionTranslationEn extends ActionTranslation {

    constructor(opts) {
      opts.defaultForm = opts.root;
      super(opts);
      super.conjugate();
    }

    getPresentForms() {
      return {
        I: this.conjugationRoots.now,
        you: this.conjugationRoots.now,
        you_formal: this.conjugationRoots.now,
        he: this.conjugationRoots.now + 's',
        she: this.conjugationRoots.now + 's',
        it: this.conjugationRoots.now + 's',
        we: this.conjugationRoots.now,
        you_plural_formal: this.conjugationRoots.now,
        you_plural: this.conjugationRoots.now,
        they: this.conjugationRoots.now
      };
    }

    getFutureForms() {
      return {
        I: 'will ' + this.defaultForm,
        you: 'will ' + this.defaultForm,
        you_formal: 'will ' + this.defaultForm,
        he: 'will ' + this.defaultForm,
        she: 'will ' + this.defaultForm,
        it: 'will ' + this.defaultForm,
        we: 'will ' + this.defaultForm,
        you_plural_formal: 'will ' + this.defaultForm,
        you_plural: 'will ' + this.defaultForm,
        they: 'will ' + this.defaultForm
      };
    }

    getPastForms() {
      return {
        I: this.conjugationRoots.past + 'ed',
        you: this.conjugationRoots.past + 'ed',
        you_formal: this.conjugationRoots.past + 'ed',
        he: this.conjugationRoots.past + 'ed',
        she: this.conjugationRoots.past + 'ed',
        it: this.conjugationRoots.past + 'ed',
        we: this.conjugationRoots.past + 'ed',
        you_plural_formal: this.conjugationRoots.past + 'ed',
        you_plural: this.conjugationRoots.past + 'ed',
        they: this.conjugationRoots.past + 'ed'
      };
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
          he: 'does',
          she: 'does',
          it: 'does'
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
          he: 'goes',
          she: 'goes',
          it: 'goes'
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