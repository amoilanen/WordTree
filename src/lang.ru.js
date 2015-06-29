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
        she: 'пел',
        it: 'пел',
        we: 'пели',
        you_plural_formal: 'пели',
        you_plural: 'пели',
        they: 'пели'
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