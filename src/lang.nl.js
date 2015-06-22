define('lang.nl', ['lang', 'grammar'], function(Language, Grammar) {

  var {Word} = Grammar;

  var translations = {
    sun: 'zon',
    sing: 'zing',
    now: 'nu',
    future: 'toekomst',
    past: 'verleden',
    I: 'ik',
    you: 'je',
    you_formal: 'u',
    he: 'hij',
    she: 'zij',
    it: 'het',
    we: 'we',
    you_plural: 'jullie',
    you_plural_formal: 'u',
    they: 'ze'
  };

  class Dutch extends Language {

    constructor(translations) {
      super('Dutch', translations);
    }

    translateAction(actor, action, time) {
      if (time === Word.now) {
        if (actor === Word.I) {
          return this.translateWord(action);
        } else if (actor === Word.you) {
          return this.translateWord(action) + 't';
        } else if (actor === Word.you_formal) {
          return this.translateWord(action) + 't';
        } else if ((actor === Word.he) || (actor === Word.she) || (actor === Word.it)) {
          return this.translateWord(action) + 't';
        } else if (actor === Word.we) {
          return this.translateWord(action) + 'en';
        } else if (actor === Word.you_plural_formal) {
          return this.translateWord(action) + 't';
        } else if (actor === Word.you_plural) {
          return this.translateWord(action) + 'en';
        } else if (actor === Word.they) {
          return this.translateWord(action) + 'en';
        }
      } else if (time === Word.future) {
        if (actor === Word.I) {
          return this.translateWord(action);
        } else if (actor === Word.you) {
          return this.translateWord(action) + 't';
        } else if (actor === Word.you_formal) {
          return this.translateWord(action) + 't';
        } else if ((actor === Word.he) || (actor === Word.she) || (actor === Word.it)) {
          return this.translateWord(action) + 't';
        } else if (actor === Word.we) {
          return this.translateWord(action) + 'en';
        } else if (actor === Word.you_plural_formal) {
          return this.translateWord(action) + 't';
        } else if (actor === Word.you_plural) {
          return this.translateWord(action) + 'en';
        } else if (actor === Word.they) {
          return this.translateWord(action) + 'en';
        }
      }
      return this.translateWord(action);
    }
  }

  return new Dutch(translations);
});