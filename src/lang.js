define('lang', ['grammar'], function(Grammar) {

  var {Word, Actor, Action, Time, Sentence} = Grammar;

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
      return this.wordTranslations[word.id] || word.id;
    }

    translateActor(actor) {
      return this.translateWord(actor);
    }

    translateAction(actor, action, time) {
      return this.translateWord(action);
    }
  }

  return Language;
});