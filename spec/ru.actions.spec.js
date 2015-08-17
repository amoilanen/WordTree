define(['grammar', 'lang.ru', 'test.util'],
    function({Word, Actor, Action, Time, Sentence}, lang, {shouldHaveActionForms}) {

  describe('Russian action forms', function() {
    shouldHaveActionForms(lang, Word.sing, {
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
        I: {
          he: 'пел',
          she: 'пела',
          it: 'пело'
        },
        you: {
          he: 'пел',
          she: 'пела',
          it: 'пело'
        },
        you_formal: 'пели',
        he: 'пел',
        she: 'пела',
        it: 'пело',
        we: 'пели',
        you_plural_formal: 'пели',
        you_plural: 'пели',
        they: 'пели'
      }
    });

    shouldHaveActionForms(lang, Word.do, {
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
        I: {
          he: 'делал',
          she: 'делала',
          it: 'делало'
        },
        you: {
          he: 'делал',
          she: 'делала',
          it: 'делало'
        },
        you_formal: 'делали',
        he: 'делал',
        she: 'делала',
        it: 'делало',
        we: 'делали',
        you_plural_formal: 'делали',
        you_plural: 'делали',
        they: 'делали'
      }
    });

    shouldHaveActionForms(lang, Word.go, {
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
        I: {
          he: 'шел',
          she: 'шла',
          it: 'шло'
        },
        you: {
          he: 'шел',
          she: 'шла',
          it: 'шло'
        },
        you_formal: 'шли',
        he: 'шел',
        she: 'шла',
        it: 'шло',
        we: 'шли',
        you_plural_formal: 'шли',
        you_plural: 'шли',
        they: 'шли'
      }
    });

    shouldHaveActionForms(lang, Word.sew, {
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
        I: {
          he: 'шил',
          she: 'шила',
          it: 'шило'
        },
        you: {
          he: 'шил',
          she: 'шила',
          it: 'шило'
        },
        you_formal: 'шили',
        he: 'шил',
        she: 'шила',
        it: 'шило',
        we: 'шили',
        you_plural_formal: 'шили',
        you_plural: 'шили',
        they: 'шили'
      }
    });

    shouldHaveActionForms(lang, Word.build, {
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
        I: {
          he: 'строил',
          she: 'строила',
          it: 'строило'
        },
        you: {
          he: 'строил',
          she: 'строила',
          it: 'строило'
        },
        you_formal: 'строили',
        he: 'строил',
        she: 'строила',
        it: 'строило',
        we: 'строили',
        you_plural_formal: 'строили',
        you_plural: 'строили',
        they: 'строили'
      }
    });

    shouldHaveActionForms(lang, Word.give, {
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
        I: {
          he: 'давал',
          she: 'давала',
          it: 'давало'
        },
        you: {
          he: 'давал',
          she: 'давала',
          it: 'давало'
        },
        you_formal: 'давали',
        he: 'давал',
        she: 'давала',
        it: 'давало',
        we: 'давали',
        you_plural_formal: 'давали',
        you_plural: 'давали',
        they: 'давали'
      }
    });

    shouldHaveActionForms(lang, Word.look, {
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
        I: {
          he: 'смотрел',
          she: 'смотрела',
          it: 'смотрело'
        },
        you: {
          he: 'смотрел',
          she: 'смотрела',
          it: 'смотрело'
        },
        you_formal: 'смотрели',
        he: 'смотрел',
        she: 'смотрела',
        it: 'смотрело',
        we: 'смотрели',
        you_plural_formal: 'смотрели',
        you_plural: 'смотрели',
        they: 'смотрели'
      }
    });

    shouldHaveActionForms(lang, Word.see, {
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
        I: {
          he: 'видел',
          she: 'видела',
          it: 'видело'
        },
        you: {
          he: 'видел',
          she: 'видела',
          it: 'видело'
        },
        you_formal: 'видели',
        he: 'видел',
        she: 'видела',
        it: 'видело',
        we: 'видели',
        you_plural_formal: 'видели',
        you_plural: 'видели',
        they: 'видели'
      }
    });

    shouldHaveActionForms(lang, Word.want, {
      now: {
        I: 'хочу',
        you: 'хочешь',
        you_formal: 'хотите',
        he: 'хочет',
        she: 'хочет',
        it: 'хочет',
        we: 'хотим',
        you_plural_formal: 'хотите',
        you_plural: 'хотите',
        they: 'хотят'
      },
      future: {
        I: 'буду хотеть',
        you: 'будешь хотеть',
        you_formal: 'будете хотеть',
        he: 'будет хотеть',
        she: 'будет хотеть',
        it: 'будет хотеть',
        we: 'будем хотеть',
        you_plural_formal: 'будете хотеть',
        you_plural: 'будете хотеть',
        they: 'будут хотеть'
      },
      past: {
        I: {
          he: 'хотел',
          she: 'хотела',
          it: 'хотело'
        },
        you: {
          he: 'хотел',
          she: 'хотела',
          it: 'хотело'
        },
        you_formal: 'хотели',
        he: 'хотел',
        she: 'хотела',
        it: 'хотело',
        we: 'хотели',
        you_plural_formal: 'хотели',
        you_plural: 'хотели',
        they: 'хотели'
      }
    });

    shouldHaveActionForms(lang, Word.can, {
      now: {
        I: 'могу',
        you: 'можешь',
        you_formal: 'можете',
        he: 'может',
        she: 'может',
        it: 'может',
        we: 'можем',
        you_plural_formal: 'можете',
        you_plural: 'можете',
        they: 'могут'
      },
      future: {
        I: 'могу',
        you: 'можешь',
        you_formal: 'можете',
        he: 'может',
        she: 'может',
        it: 'может',
        we: 'можем',
        you_plural_formal: 'можете',
        you_plural: 'можете',
        they: 'могут'
      },
      past: {
        I: {
          he: 'мог',
          she: 'могла',
          it: 'могло'
        },
        you: {
          he: 'мог',
          she: 'могла',
          it: 'могло'
        },
        you_formal: 'могли',
        he: 'мог',
        she: 'могла',
        it: 'могло',
        we: 'могли',
        you_plural_formal: 'могли',
        you_plural: 'могли',
        they: 'могли'
      }
    });
  });
});