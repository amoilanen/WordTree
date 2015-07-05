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
      she: 'пел',
      it: 'пел',
      we: 'пели',
      you_plural_formal: 'пели',
      you_plural: 'пели',
      they: 'пели'
    }
  });

  //For example делать, ходить, строить, давать, . Include one standard verb with standard forms for every language
});