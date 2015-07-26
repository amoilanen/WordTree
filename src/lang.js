/*
 * Base classes to base the implementation of particular languages from:
 *
 * Translation - specifies how a word is translated in a specific language
 *
 * Language - base class for a specific language, defines how the universal grammar structure
 * is to be translated into that language
 *
 */
define('lang', ['grammar'], function(Grammar) {

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
      this.defaultForm = typeof defaultForm === 'undefined' ? root : defaultForm;
      this.conjugations = conjugations;
    }
  }

  class ActionTranslation extends Translation {

    constructor(opts) {
      super(opts.root, opts.defaultForm);
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
    }

    expandExceptionalConjugations() {
      TENSES.forEach((time) => {
        if (typeof this.conjugations[time] !== 'undefined') {
          var heSheItConjugation = this.conjugations[time]['he_she_it'];

          if (typeof heSheItConjugation !== 'undefined') {
            this.conjugations[time]['he'] = heSheItConjugation;
            this.conjugations[time]['she'] = heSheItConjugation;
            this.conjugations[time]['it'] = heSheItConjugation;
          }
        }
      });
    }

    determineConjugations() {
      var result = {
        now: this.getPresentForms(),
        future: this.getFutureForms(),
        past: this.getPastForms()
      };

      TENSES.forEach((time) => {
        PERSONS.forEach((person) => {
          if (typeof this.conjugations[time] !== 'undefined') {
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
      var translation = this.wordTranslations[action.id];

      return translation && translation.conjugations ?
        translation.conjugations[time.id][actor.id]
        : this.translateWord(action);
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