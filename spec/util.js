/*
 * Utility functions to use in specs.
 */
define('test.util', ['lang', 'grammar'], function({PERSONS}, {Word}) {

  function shouldHaveActionForms(lang, action, forms) {
    describe('\'' + action.id + '\' forms', function() {
      Object.keys(forms).forEach(function(time) {
        var timeForms = forms[time];
        describe(time + ' time', function() {
          PERSONS.forEach(function(actor) {
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

  return {
    shouldHaveActionForms
  };
});