define('lang.en', ['lang', 'grammar'], function(Language, Grammar) {

  var {Word} = Grammar;

  var translations = {
    sun: 'sun',
    sing: 'sing',
    now: 'now',
    future: 'future',
    past: 'past',
    I: 'I',
    you: 'you',
    you_formal: 'you',
    he: 'he',
    she: 'she',
    it: 'it',
    we: 'we',
    you_plural: 'you',
    you_plural_formal: 'you',
    they: 'they'
  };

  class English extends Language {

    constructor(translations) {
      super('English', translations);
    }

    translateAction(actor, action, time) {
      if (actor === Word.I) {
        return this.translateWord(action);
      } else if (actor === Word.you) {
        return this.translateWord(action);
      } else if (actor === Word.you_formal) {
        return this.translateWord(action);
      } else if ((actor === Word.he) || (actor === Word.she) || (actor === Word.it)) {
        return this.translateWord(action) + 's';
      }
      return this.translateWord(action);
    }
  }

  return new English(translations);
});