define('lang', ['grammar'], function(Grammar) {

  var {Word, Actor, Action, Time, Sentence} = Grammar;

  class Translation {

    constructor(root, defaultForm, conjugations) {
      this.root = root;
      this.defaultForm = typeof defaultForm === 'undefined' ? root : defaultForm;
      this.conjugations = conjugations;
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
    Translation,
    Language
  };
});