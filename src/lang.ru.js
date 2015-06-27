define('lang.ru', ['lang', 'grammar'], function(Language, Grammar) {

  var {Word} = Grammar;

  var translations = {
    sun: 'солнце',
    sing: 'п',
    now: 'сейчас',
    future: 'будущее',
    past: 'прошлое',
    I: 'я',
    you: 'ты',
    you_formal: 'вы',
    he: 'он',
    she: 'она',
    it: 'оно',
    we: 'мы',
    you_plural: 'вы',
    you_plural_formal: 'вы',
    they: 'они'
  };

  class Russian extends Language {

    constructor(translations) {
      super('Russian', translations);
    }

    translateAction(actor, action, time) {
      if (time === Word.now) {
        if (actor === Word.I) {
          return this.translateWord(action) + 'ою';
        } else if (actor === Word.you) {
          return this.translateWord(action) + 'оешь';
        } else if (actor === Word.you_formal) {
          return this.translateWord(action) + 'оете';
        } else if ((actor === Word.he) || (actor === Word.she) || (actor === Word.it)) {
          return this.translateWord(action) + 'оет';
        } else if (actor === Word.we) {
          return this.translateWord(action) + 'оем';
        } else if (actor === Word.you_plural_formal) {
          return this.translateWord(action) + 'оете';
        } else if (actor === Word.you_plural) {
          return this.translateWord(action) + 'оете';
        } else if (actor === Word.they) {
          return this.translateWord(action) + 'оют';
        }
      } else if (time === Word.future) {
        if (actor === Word.I) {
          return 'буду ' + this.translateWord(action) + 'еть';
        } else if (actor === Word.you) {
          return 'будешь ' + this.translateWord(action) + 'еть';
        } else if (actor === Word.you_formal) {
          return 'будете ' + this.translateWord(action) + 'еть';
        } else if ((actor === Word.he) || (actor === Word.she) || (actor === Word.it)) {
          return 'будет ' + this.translateWord(action) + 'еть';
        } else if (actor === Word.we) {
          return 'будем ' + this.translateWord(action) + 'еть';
        } else if (actor === Word.you_plural_formal) {
          return 'будете ' + this.translateWord(action) + 'еть';
        } else if (actor === Word.you_plural) {
          return 'будете ' + this.translateWord(action) + 'еть';
        } else if (actor === Word.they) {
          return 'будут ' + this.translateWord(action) + 'еть';
        }
      } else if (time === Word.past) {
        if (actor === Word.I) {
          return this.translateWord(action) + 'ел';
        } else if (actor === Word.you) {
          return this.translateWord(action) + 'ел';
        } else if (actor === Word.you_formal) {
          return this.translateWord(action) + 'ели';
        } else if ((actor === Word.he) || (actor === Word.she) || (actor === Word.it)) {
          return this.translateWord(action) + 'ел';
        } else if (actor === Word.we) {
          return this.translateWord(action) + 'ели';
        } else if (actor === Word.you_plural_formal) {
          return this.translateWord(action) + 'ели';
        } else if (actor === Word.you_plural) {
          return this.translateWord(action) + 'ели';
        } else if (actor === Word.they) {
          return this.translateWord(action) + 'ели';
        }
      }
      return this.translateWord(action);
    }
  }

  return new Russian(translations);
});