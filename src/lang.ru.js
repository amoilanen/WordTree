define('lang.ru', ['lang'], function(Language) {

  var translations = {
    sun: 'солнце',
    sing: 'петь',
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

  return new Language('Russian', translations);
});