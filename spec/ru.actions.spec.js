define(['grammar',
        'lang.ru'], function({Word, Actor, Action, Time, Sentence}, lang) {

  var actors = ['I', 'you', 'you_formal', 'he', 'she', 'it',
      'we', 'you_plural_formal', 'you_plural', 'they'];

  function shouldHaveForms(action, forms) {
    describe('\'' + action.id + '\' forms', function() {
      Object.keys(forms).forEach(function(time) {
        var timeForms = forms[time];
        describe(time + ' time', function() {
          actors.forEach(function(actor) {
            describe(actor + ' actor', function() {
              it('should translate to ' + lang.name, function() {
                var translation = timeForms[actor];
                expect(lang.translateAction(Word[actor], action, Word[time])).toBe(translation);
              });
            });
          });
        });
      });
    });
  }

  shouldHaveForms(Word.sing, {
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
  });

  shouldHaveForms(Word.do, {
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
  });

  shouldHaveForms(Word.do, {
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
  });

  shouldHaveForms(Word.go, {
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
  });

  //For example ходить, шить, строить, давать, смотреть. Include one standard verb with standard forms for every language
});