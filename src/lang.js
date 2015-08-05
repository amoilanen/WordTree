/*
 * Base classes to base the implementation of particular languages from:
 *
 * Translation - specifies how a word is translated in a specific language
 *
 * Language - base class for a specific language, defines how the universal grammar structure
 * is to be translated into that language
 *
 */
define('lang', ['grammar', 'util'], function(Grammar, _) {

  var {Word, Actor, Action, Time, Sentence} = Grammar;

  const PERSONS = [
    'I',
    'you',
    'you_formal',
    'he',
    'she',
    'it',
    'we',
    'you_plural_formal',
    'you_plural',
    'they'
  ];

  const TENSES = [
    'now',
    'past',
    'future'
  ];

  class Translation {

    constructor(root, defaultForm, conjugations) {
      this.root = root;
      this.defaultForm = _.isDefined(defaultForm) ? defaultForm : root;
      this.conjugations = conjugations;
    }
  }

  class ActionTranslation extends Translation {

    constructor(opts) {
      super(opts.root, opts.defaultForm);
      this.opts = opts;
      this.conjugationRoots = opts.conjugationRoots || {};
      this.conjugations = opts.conjugations || {};
    }

    conjugate() {
      this.prepareToConjugate();
      this.determineConjugations();
    }

    prepareToConjugate() {
      this.prepareConjugationRoots();
      this.expandExceptionalConjugations();
    }

    prepareConjugationRoots() {
      TENSES.forEach((time) => {
        if (!this.conjugationRoots[time]) {
          this.conjugationRoots[time] = this.getDefaultConjugationRoot();
        }
      });
      if (this.opts.futureMatchesNow) {
        if (_.isDefined(this.conjugationRoots['now'])) {
          this.conjugationRoots['future'] = this.conjugationRoots['now'];
        }
        if (_.isDefined(this.conjugations['now'])) {
          this.conjugations['future'] = this.conjugations['now'];
        }
      }
    }

    expandExceptionalConjugations() {
      TENSES.forEach((time) => {
        if (_.isDefined(this.conjugations[time])) {
          var heSheItConjugation = this.conjugations[time]['he_she_it'];

          if (_.isDefined(heSheItConjugation)) {
            this.conjugations[time]['he'] = heSheItConjugation;
            this.conjugations[time]['she'] = heSheItConjugation;
            this.conjugations[time]['it'] = heSheItConjugation;
          }

          var otherConjugation = this.conjugations[time]['other_single'];
          if (_.isDefined(otherConjugation)) {
            this.conjugations[time]['he'] = otherConjugation;
            this.conjugations[time]['she'] = otherConjugation;
            this.conjugations[time]['it'] = otherConjugation;
            this.conjugations[time]['you'] = otherConjugation;
            this.conjugations[time]['you_formal'] = otherConjugation;
          }

          var pluralConjugation = this.conjugations[time]['plural'];
          if (_.isDefined(pluralConjugation)) {
            this.conjugations[time]['we'] = pluralConjugation;
            this.conjugations[time]['you_plural_formal'] = pluralConjugation;
            this.conjugations[time]['you_plural'] = pluralConjugation;
            this.conjugations[time]['they'] = pluralConjugation;
          }
        }
      });
    }

    getFutureForms() {
      if (this.opts.futureMatchesNow) {
        return this.getPresentForms();
      }
    }

    determineConjugations() {
      var result = {
        now: this.getPresentForms(),
        future: this.getFutureForms(),
        past: this.getPastForms()
      };

      TENSES.forEach((time) => {
        PERSONS.forEach((person) => {
          if (_.isDefined(this.conjugations[time])) {
            if (typeof this.conjugations[time] === 'string') {
              result[time][person] = this.conjugations[time];
            } else if (typeof this.conjugations[time][person] === 'string') {
              result[time][person] = this.conjugations[time][person];
            }
          }
        });
      });
      this.conjugations = result;
    }

    allPersons(form) {
      return {
        I: form,
        you: form,
        you_formal: form,
        he: form,
        she: form,
        it: form,
        we: form,
        you_plural_formal: form,
        you_plural: form,
        they: form
      };
    }

    /**
     * Default implementation, can be overriden by subclasses.
     */
    getDefaultConjugationRoot() {
      return this.root;
    }
  }

  class Language {

    constructor(name, wordTranslations) {
      this.name = name;
      this.wordTranslations = wordTranslations;
    }

    translate(fragment) {
      if (fragment instanceof Word) {
        return this.translateWord(fragment);
      }

      var {actor, action, time} = fragment;

      return [
        this.translateActor(actor),
        this.translateAction(actor, action, time)
      ].join(' ').trim();
    }

    translateWord(word) {
      var translation = this.wordTranslations[word.id];

      return translation ? translation.defaultForm : word.id;
    }

    translateActor(actor) {
      return this.translateWord(actor);
    }

    translateAction(actor, action, time) {
      var secondaryAction;

      if (!('id' in action)) {
        secondaryAction = action.secondary;
        action = action.primary;
      }
      var translation = this.wordTranslations[action.id];

      var result = translation && translation.conjugations ?
        translation.conjugations[time.id][actor.id]
        : this.translateWord(action);

      if (secondaryAction) {
        result = result + ' ' + this.wordTranslations[secondaryAction.id].defaultForm;
      }
      return result;
    }
  }

  return {
    ActionTranslation,
    Translation,
    Language,
    PERSONS,
    TENSES
  };
});