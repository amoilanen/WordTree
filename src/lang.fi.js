define('lang.fi', ['lang', 'grammar'], function(Language, Grammar) {

  var {Word} = Grammar;

  var translations = {
    sun: 'aurinko',
    sing: 'laul',
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
      if (time === Word.now) {
        if (actor === Word.I) {
          return this.translateWord(action) + 'an';
        } else if (actor === Word.you) {
          return this.translateWord(action) + 'at';
        } else if (actor === Word.you_formal) {
          return this.translateWord(action) + 'at';
        } else if ((actor === Word.he) || (actor === Word.she) || (actor === Word.it)) {
          return this.translateWord(action) + 'aa';
        } else if (actor === Word.we) {
          return this.translateWord(action) + 'amme';
        } else if (actor === Word.you_plural_formal) {
          return this.translateWord(action) + 'atte';
        } else if (actor === Word.you_plural) {
          return this.translateWord(action) + 'atte';
        } else if (actor === Word.they) {
          return this.translateWord(action) + 'avat';
        }
      } else if (time === Word.future) {
        if (actor === Word.I) {
          return this.translateWord(action) + 'an';
        } else if (actor === Word.you) {
          return this.translateWord(action) + 'at';
        } else if (actor === Word.you_formal) {
          return this.translateWord(action) + 'at';
        } else if ((actor === Word.he) || (actor === Word.she) || (actor === Word.it)) {
          return this.translateWord(action) + 'aa';
        } else if (actor === Word.we) {
          return this.translateWord(action) + 'amme';
        } else if (actor === Word.you_plural_formal) {
          return this.translateWord(action) + 'atte';
        } else if (actor === Word.you_plural) {
          return this.translateWord(action) + 'atte';
        } else if (actor === Word.they) {
          return this.translateWord(action) + 'avat';
        }
      } else if (time === Word.past) {
        if (actor === Word.I) {
          return this.translateWord(action) + 'oin';
        } else if (actor === Word.you) {
          return this.translateWord(action) + 'oit';
        } else if (actor === Word.you_formal) {
          return this.translateWord(action) + 'oit';
        } else if ((actor === Word.he) || (actor === Word.she) || (actor === Word.it)) {
          return this.translateWord(action) + 'oi';
        } else if (actor === Word.we) {
          return this.translateWord(action) + 'oimme';
        } else if (actor === Word.you_plural_formal) {
          return this.translateWord(action) + 'oitte';
        } else if (actor === Word.you_plural) {
          return this.translateWord(action) + 'oitte';
        } else if (actor === Word.they) {
          return this.translateWord(action) + 'oivat';
        }
      }
      return this.translateWord(action);
    }
  }

  return new Finnish(translations);
});