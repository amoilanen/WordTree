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
      if (actor === Word.I) {
        return this.translateWord(action) + 'ою';
      }
      return this.translateWord(action);
    }
  }

  return new Russian(translations);
});