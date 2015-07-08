define('lang.nl', ['lang', 'grammar'], function(Lang, Grammar) {

  var {Translation, Language} = Lang;
  var {Word} = Grammar;

  var translations = {
    sun: new Translation('zon'),
    sing: new Translation('zing', 'zingen', {
      now: {
        I: 'zing',
        you: 'zingt',
        you_formal: 'zingt',
        he: 'zingt',
        she: 'zingt',
        it: 'zingt',
        we: 'zingen',
        you_plural_formal: 'zingen',
        you_plural: 'zingen',
        they: 'zingen'
      },
      future: {
        I: 'zing',
        you: 'zingt',
        you_formal: 'zingt',
        he: 'zingt',
        she: 'zingt',
        it: 'zingt',
        we: 'zingen',
        you_plural_formal: 'zingen',
        you_plural: 'zingen',
        they: 'zingen'
      },
      past: {
        I: 'zong',
        you: 'zong',
        you_formal: 'zong',
        he: 'zong',
        she: 'zong',
        it: 'zong',
        we: 'zongen',
        you_plural_formal: 'zongen',
        you_plural: 'zongen',
        they: 'zongen'
      }
    }),
    do: new Translation('doen'),
    go: new Translation('ga'),
    now: new Translation('nu'),
    future: new Translation('toekomst'),
    past: new Translation('verleden'),
    I: new Translation('ik'),
    you: new Translation('je'),
    you_formal: new Translation('u'),
    he: new Translation('hij'),
    she: new Translation('zij'),
    it: new Translation('het'),
    we: new Translation('we'),
    you_plural: new Translation('jullie'),
    you_plural_formal: new Translation('u'),
    they: new Translation('ze')
  };

  class Dutch extends Language {

    constructor(translations) {
      super('Dutch', translations);
    }
  }

  return new Dutch(translations);
});