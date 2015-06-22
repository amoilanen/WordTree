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
      } else if (actor === Word.you) {
        return this.translateWord(action) + 't';
      } else if (actor === Word.you_formal) {
        return this.translateWord(action) + 't';
      } else if ((actor === Word.he) || (actor === Word.she) || (actor === Word.it)) {
        return this.translateWord(action) + 'a';
      } else if (actor === Word.we) {
        return this.translateWord(action) + 'mme';
      } else if (actor === Word.you_plural_formal) {
        return this.translateWord(action) + 'tte';
      } else if (actor === Word.you_plural) {
        return this.translateWord(action) + 'tte';
      } else if (actor === Word.they) {
        return this.translateWord(action) + 'vat';
      }
      return this.translateWord(action);
    }
  }

  return new Finnish(translations);
});