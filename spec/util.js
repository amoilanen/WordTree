/*
 * Utility functions to use in specs.
 */
define('test.util', ['lang', 'grammar'], function({PERSONS, GENDERS}, {Actor, Word}) {

  function shouldHaveActionForms(lang, action, forms) {
    describe('\'' + action.id + '\' forms', function() {
      Object.keys(forms).forEach(function(time) {
        var timeForms = forms[time];
        describe(time + ' time', function() {
          PERSONS.forEach(function(actor) {
            describe(actor + ' actor', function() {
              var translation = timeForms[actor];
              if (typeof translation === 'string') {
                it('should translate to ' + lang.name, function() {
                  expect(lang.translateAction(Word[actor], action, Word[time])).toBe(translation);
                });
              } else {
                GENDERS.forEach(function(gender) {
                  translation = timeForms[actor][gender];
                  describe(gender + ' gender', function() {
                    it('should translate to ' + lang.name, function() {
                      expect(lang.translateAction(new Actor(Word[actor], Word[gender]), action, Word[time])).toBe(translation);
                    });
                  });
                });
              }
            });
          });
        });
      });
    });
  }

  function shouldTranslate(words, translations, debug) {
    translations.forEach(function(translations) {
      var lang = translations[0];
      var translation = translations[1];

      it('should translate to ' + lang.name, function() {
        expect(lang.translate(words)).toBe(translation);
      });
    });
  }

  return {
    shouldHaveActionForms,
    shouldTranslate
  };
});