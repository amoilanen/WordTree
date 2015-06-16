define('lang.fi', ['lang', 'grammar'], function(Language, Grammar) {

  var {Word} = Grammar;

  var translations = {
    sun: 'aurinko',
    sing: 'laula',
    now: 'nyt',
    future: 'tulevaisuus',
    past: 'menneisyys',
    I: 'minä',
    you: 'sinä',
    you_formal: 'sinä',
    he: 'hän',
    she: 'hän',
    it: 'se',
    we: 'me',
    you_plural: 'te',
    you_plural_formal: 'te',
    they: 'ne'
  };

  class Finnish extends Language {

    constructor(translations) {
      super('Finnish', translations);
    }

    translateActor(actor) {
      return '';
    }

    translateAction(actor, action, time) {
      if (actor === Word.I) {
        return this.translateWord(action) + 'n';
      }
      return this.translateWord(action);
    }
  }

  return new Finnish(translations);
});