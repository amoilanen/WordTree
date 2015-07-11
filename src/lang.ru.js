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
    go: new Translation('идти', 'ид', {
      now: {
        I: 'иду',
        you: 'идешь',
        you_formal: 'идете',
        he: 'идет',
        she: 'идет',
        it: 'идет',
        we: 'идем',
        you_plural_formal: 'идете',
        you_plural: 'идете',
        they: 'идут'
      },
      future: {
        I: 'буду идти',
        you: 'будешь идти',
        you_formal: 'будете идти',
        he: 'будет идти',
        she: 'будет идти',
        it: 'будет идти',
        we: 'будем идти',
        you_plural_formal: 'будете идти',
        you_plural: 'будете идти',
        they: 'будут идти'
      },
      past: {
        I: 'шел',
        you: 'шел',
        you_formal: 'шли',
        he: 'шел',
        she: 'шла',
        it: 'шло',
        we: 'шли',
        you_plural_formal: 'шли',
        you_plural: 'шли',
        they: 'шли'
      }
    }),
    sew: new Translation('шить', 'ш', {
      now: {
        I: 'шью',
        you: 'шьешь',
        you_formal: 'шьете',
        he: 'шьет',
        she: 'шьет',
        it: 'шьет',
        we: 'шьем',
        you_plural_formal: 'шьете',
        you_plural: 'шьете',
        they: 'шьют'
      },
      future: {
        I: 'буду шить',
        you: 'будешь шить',
        you_formal: 'будете шить',
        he: 'будет шить',
        she: 'будет шить',
        it: 'будет шить',
        we: 'будем шить',
        you_plural_formal: 'будете шить',
        you_plural: 'будете шить',
        they: 'будут шить'
      },
      past: {
        I: 'шил',
        you: 'шил',
        you_formal: 'шили',
        he: 'шил',
        she: 'шила',
        it: 'шило',
        we: 'шили',
        you_plural_formal: 'шили',
        you_plural: 'шили',
        they: 'шили'
      }
    }),
    build: new Translation('строить', 'стро', {
      now: {
        I: 'строю',
        you: 'строишь',
        you_formal: 'строите',
        he: 'строит',
        she: 'строит',
        it: 'строит',
        we: 'строим',
        you_plural_formal: 'строите',
        you_plural: 'строите',
        they: 'строят'
      },
      future: {
        I: 'буду строить',
        you: 'будешь строить',
        you_formal: 'будете строить',
        he: 'будет строить',
        she: 'будет строить',
        it: 'будет строить',
        we: 'будем строить',
        you_plural_formal: 'будете строить',
        you_plural: 'будете строить',
        they: 'будут строить'
      },
      past: {
        I: 'строил',
        you: 'строил',
        you_formal: 'строили',
        he: 'строил',
        she: 'строила',
        it: 'строило',
        we: 'строили',
        you_plural_formal: 'строили',
        you_plural: 'строили',
        they: 'строили'
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