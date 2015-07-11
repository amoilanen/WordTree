define('lang.ru', ['lang', 'grammar'], function(Lang, Grammar) {

  var {Translation, Language} = Lang;
  var {Word} = Grammar;

  //TODO: Generic verb translation class
  //TODO: Generic verb translation ending class
  //TODO: Particular ending verb translation class

  class VerbTranslation extends Translation {

    constructor(root, defaultForm, conjugationRoots) {
      super(root, defaultForm);
      this.conjugations = this.conjugate(this.readConjugationRoots(conjugationRoots));
    }

    readConjugationRoots(conjugationRoots) {
      if (!conjugationRoots) {
        conjugationRoots = {};
      }
      ['now', 'future', 'past'].forEach((time) => {
        if (!conjugationRoots[time]) {
          conjugationRoots[time] = this.root;
        }
      });
      return conjugationRoots;
    }

    conjugate(conjugationRoots) {
      return {
        now: {
          I: conjugationRoots.now + 'ю',
          you: conjugationRoots.now + 'ешь',
          you_formal: conjugationRoots.now + 'ете',
          he: conjugationRoots.now + 'ет',
          she: conjugationRoots.now + 'ет',
          it: conjugationRoots.now + 'ет',
          we: conjugationRoots.now + 'ем',
          you_plural_formal: conjugationRoots.now + 'ете',
          you_plural: conjugationRoots.now + 'ете',
          they: conjugationRoots.now + 'ют'
        },
        future: {
          I: 'буду ' + conjugationRoots.future + 'еть',
          you: 'будешь ' + conjugationRoots.future + 'еть',
          you_formal: 'будете ' + conjugationRoots.future + 'еть',
          he: 'будет ' + conjugationRoots.future + 'еть',
          she: 'будет ' + conjugationRoots.future + 'еть',
          it: 'будет ' + conjugationRoots.future + 'еть',
          we: 'будем ' + conjugationRoots.future + 'еть',
          you_plural_formal: 'будете ' + conjugationRoots.future + 'еть',
          you_plural: 'будете ' + conjugationRoots.future + 'еть',
          they: 'будут ' + conjugationRoots.future + 'еть'
        },
        past: {
          I: conjugationRoots.past + 'ел',
          you: conjugationRoots.past + 'ел',
          you_formal: conjugationRoots.past + 'ели',
          he: conjugationRoots.past + 'ел',
          she: conjugationRoots.past + 'ела',
          it: conjugationRoots.past + 'ело',
          we: conjugationRoots.past + 'ели',
          you_plural_formal: conjugationRoots.past + 'ели',
          you_plural: conjugationRoots.past + 'ели',
          they: conjugationRoots.past + 'ели'
        }
      };
    }
  }

  var translations = {
    sun: new Translation('солнце'),
    sing: new VerbTranslation('п', 'петь', {
      now: 'по'
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
    give: new Translation('давать', 'да', {
      now: {
        I: 'даю',
        you: 'даешь',
        you_formal: 'даете',
        he: 'дает',
        she: 'дает',
        it: 'дает',
        we: 'даем',
        you_plural_formal: 'даете',
        you_plural: 'даете',
        they: 'дают'
      },
      future: {
        I: 'буду давать',
        you: 'будешь давать',
        you_formal: 'будете давать',
        he: 'будет давать',
        she: 'будет давать',
        it: 'будет давать',
        we: 'будем давать',
        you_plural_formal: 'будете давать',
        you_plural: 'будете давать',
        they: 'будут давать'
      },
      past: {
        I: 'давал',
        you: 'давал',
        you_formal: 'давали',
        he: 'давал',
        she: 'давала',
        it: 'давало',
        we: 'дают',
        you_plural_formal: 'давали',
        you_plural: 'давали',
        they: 'давали'
      }
    }),
    look: new Translation('смотреть', 'смотр', {
      now: {
        I: 'смотрю',
        you: 'смотришь',
        you_formal: 'смотрите',
        he: 'смотрит',
        she: 'смотрит',
        it: 'смотрит',
        we: 'смотрим',
        you_plural_formal: 'смотрите',
        you_plural: 'смотрите',
        they: 'смотрят'
      },
      future: {
        I: 'буду смотреть',
        you: 'будешь смотреть',
        you_formal: 'будете смотреть',
        he: 'будет смотреть',
        she: 'будет смотреть',
        it: 'будет смотреть',
        we: 'будем смотреть',
        you_plural_formal: 'будете смотреть',
        you_plural: 'будете смотреть',
        they: 'будут смотреть'
      },
      past: {
        I: 'смотрел',
        you: 'смотрел',
        you_formal: 'смотрели',
        he: 'смотрел',
        she: 'смотрела',
        it: 'смотрело',
        we: 'смотрим',
        you_plural_formal: 'смотрите',
        you_plural: 'смотрите',
        they: 'смотрели'
      }
    }),
    see: new Translation('видеть', 'вид', {
      now: {
        I: 'вижу',
        you: 'видишь',
        you_formal: 'видите',
        he: 'видит',
        she: 'видит',
        it: 'видит',
        we: 'видим',
        you_plural_formal: 'видете',
        you_plural: 'видете',
        they: 'видят'
      },
      future: {
        I: 'буду видеть',
        you: 'будешь видеть',
        you_formal: 'будете видеть',
        he: 'будет видеть',
        she: 'будет видеть',
        it: 'будет видеть',
        we: 'будем видеть',
        you_plural_formal: 'будете видеть',
        you_plural: 'будете видеть',
        they: 'будут видеть'
      },
      past: {
        I: 'видел',
        you: 'видел',
        you_formal: 'видели',
        he: 'видел',
        she: 'видела',
        it: 'видело',
        we: 'видим',
        you_plural_formal: 'видите',
        you_plural: 'видите',
        they: 'видели'
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