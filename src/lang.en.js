define('lang.en', ['lang', 'grammar'], function(Lang, Grammar) {

  var {Translation, Language} = Lang;
  var {Word} = Grammar;

  var translations = {
    sun: new Translation('sun'),
    sing: new Translation('sing', 'sing', {
      now: {
        I: 'sing',
        you: 'sing',
        you_formal: 'sing',
        he: 'sings',
        she: 'sings',
        it: 'sings',
        we: 'sing',
        you_plural_formal: 'sing',
        you_plural: 'sing',
        they: 'sing'
      },
      future: {
        I: 'will sing',
        you: 'will sing',
        you_formal: 'will sing',
        he: 'will sing',
        she: 'will sing',
        it: 'will sing',
        we: 'will sing',
        you_plural_formal: 'will sing',
        you_plural: 'will sing',
        they: 'will sing'
      },
      past: {
        I: 'sang',
        you: 'sang',
        you_formal: 'sang',
        he: 'sang',
        she: 'sang',
        it: 'sang',
        we: 'sang',
        you_plural_formal: 'sang',
        you_plural: 'sang',
        they: 'sang'
      }
    }),
    do: new Translation('do'),
    go: new Translation('go'),
    build: new Translation('build'),
    now: new Translation('now'),
    future: new Translation('future'),
    past: new Translation('past'),
    I: new Translation('I'),
    you: new Translation('you'),
    you_formal: new Translation('you'),
    he: new Translation('he'),
    she: new Translation('she'),
    it: new Translation('it'),
    we: new Translation('we'),
    you_plural: new Translation('you'),
    you_plural_formal: new Translation('you'),
    they: new Translation('they')
  };

  class English extends Language {

    constructor(translations) {
      super('English', translations);
    }
  }

  return new English(translations);
});