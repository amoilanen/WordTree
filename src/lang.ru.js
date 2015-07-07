define('lang.ru', ['lang', 'grammar'], function(Lang, Grammar) {

  var {Translation, Language} = Lang;
  var {Word} = Grammar;

  var translations = {
    sun: new Translation('солнце'),
    sing: new Translation('п', 'петь', {
      now: {
        I: 'пою',
        you: 'поешь',
        you_formal: 'поете',
        he: 'поет',
        she: 'поет',
        it: 'поет',
        we: 'поем',
        you_plural_formal: 'поете',
        you_plural: 'поете',
        they: 'поют'
      },
      future: {
        I: 'буду петь',
        you: 'будешь петь',
        you_formal: 'будете петь',
        he: 'будет петь',
        she: 'будет петь',
        it: 'будет петь',
        we: 'будем петь',
        you_plural_formal: 'будете петь',
        you_plural: 'будете петь',
        they: 'будут петь'
      },
      past: {
        I: 'пел',
        you: 'пел',
        you_formal: 'пели',
        he: 'пел',
        she: 'пела',
        it: 'пело',
        we: 'пели',
        you_plural_formal: 'пели',
        you_plural: 'пели',
        they: 'пели'
      }
    }),
    do: new Translation('дел', 'делать', {
      now: {
        I: 'делаю',
        you: 'делаешь',
        you_formal: 'делаете',
        he: 'делает',
        she: 'делает',
        it: 'делает',
        we: 'делаем',
        you_plural_formal: 'делаете',
        you_plural: 'делаете',
        they: 'делают'
      },
      future: {
        I: 'буду делать',
        you: 'будешь делать',
        you_formal: 'будете делать',
        he: 'будет делать',
        she: 'будет делать',
        it: 'будет делать',
        we: 'будем делать',
        you_plural_formal: 'будете делать',
        you_plural: 'будете делать',
        they: 'будут делать'
      },
      past: {
        I: 'делал',
        you: 'делал',
        you_formal: 'делали',
        he: 'делал',
        she: 'делала',
        it: 'делало',
        we: 'делали',
        you_plural_formal: 'делали',
        you_plural: 'делали',
        they: 'делали'
      }
    }),
    now: new Translation('сейчас'),
    future: new Translation('будущее'),
    past: new Translation('прошлое'),
    I: new Translation('я'),
    you: new Translation('ты'),
    you_formal: new Translation('вы'),
    he: new Translation('он'),
    she: new Translation('она'),
    it: new Translation('оно'),
    we: new Translation('мы'),
    you_plural: new Translation('вы'),
    you_plural_formal: new Translation('вы'),
    they: new Translation('они')
  };

  class Russian extends Language {

    constructor(translations) {
      super('Russian', translations);
    }
  }

  return new Russian(translations);
});