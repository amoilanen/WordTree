define('lang.en', ['lang', 'grammar', 'util'], function(Lang, Grammar, _) {

  var {Translation, Language, ActionTranslation, ObjectTranslation} = Lang;
  var {Word} = Grammar;

  class ActionTranslationEn extends ActionTranslation {

    constructor(opts) {
      opts.defaultForm = opts.root;
      super(opts);
      this.dependentActionConnector = _.isDefined(this.opts.dependentActionConnector) ?
        this.opts.dependentActionConnector : 'to';
      super.conjugate();
    }

    getPresentForms() {
      return _.extend(this.forAllPersons(this.defaultForm), {
        he: this.defaultForm + 's',
        she: this.defaultForm + 's',
        it: this.defaultForm + 's'
      });
    }

    getFutureForms() {
      return this.forAllPersons(`will ${this.defaultForm}`);
    }

    getPastForms() {
      return this.forAllPersons(`${this.defaultForm}ed`);
    }

    asPrimaryTimeActorForm(time, actor) {
      return `${this.timeActorForm(time, actor)} ${this.dependentActionConnector}`.trim();
    }
  }

  var translations = {
    sun: new ObjectTranslation({
      defaultForm: 'sun',
      asActor: Word.it
    }),
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
    want: new ActionTranslationEn({
      root: 'want'
    }),
    can: new ActionTranslationEn({
      root: 'can',
      dependentActionConnector: '',
      conjugations: {
        now: 'can',
        future: 'can',
        past: 'could'
      }
    }),
    shine: new ActionTranslationEn({
      root: 'shine',
      conjugations: {
        past: 'shone'
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
    they: new Translation('they'),
    wet_snow_with_mud_and_ground: new ObjectTranslation({
      defaultForm: 'snow',
      asActor: Word.it,
      isCountable: false
    }),
    snow_on_tree_branch: new ObjectTranslation({
      defaultForm: 'snow',
      asActor: Word.it,
      isCountable: false
    }),
    snow: new ObjectTranslation({
      defaultForm: 'snow',
      asActor: Word.it,
      isCountable: false
    }),
    this: new Translation('this'),
    that: new Translation('that'),
    one: new Translation('one'),
    one_of_some_kind: new Translation('a'),
    lake: new Translation('lake'),
    bird: new Translation('bird'),
    wolf: new Translation('wolf')
  };

  class English extends Language {

    constructor(translations) {
      super('English', translations);
    }

    getArticle(specifier, objectTranslation) {
      if (specifier === Word.this || specifier === Word.that) {
        return 'the';
      }
      if ((specifier === Word.one) && objectTranslation.isCountable) {
        return 'a';
      }
    }

    translateObject(object, specifier, context) {
      var objectTranslation = this.wordTranslations[object.id];
      var objectForm = this.translateWord(object, context);

      if (specifier === Word.this || specifier === Word.that || specifier === Word.one) {
        return [this.getArticle(specifier, objectTranslation), objectForm].join(' ').trim();
      } else if (specifier === Word.many) {
        return objectForm + 's';
      }
    }
  }

  return new English(translations);
});