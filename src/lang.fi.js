define('lang.fi', ['lang', 'grammar'], function(Lang, Grammar) {

  var {Translation, Language} = Lang;
  var {Word} = Grammar;

  var translations = {
    sun: new Translation('aurinko'),
    sing: new Translation('laul', 'laula', {
      now: {
        I: 'laulan',
        you: 'laulat',
        you_formal: 'laulat',
        he: 'laulaa',
        she: 'laulaa',
        it: 'laulaa',
        we: 'laulamme',
        you_plural_formal: 'laulatte',
        you_plural: 'laulatte',
        they: 'laulavat'
      },
      future: {
        I: 'laulan',
        you: 'laulat',
        you_formal: 'laulat',
        he: 'laulaa',
        she: 'laulaa',
        it: 'laulaa',
        we: 'laulamme',
        you_plural_formal: 'laulatte',
        you_plural: 'laulatte',
        they: 'laulavat'
      },
      past: {
        I: 'lauloin',
        you: 'lauloit',
        you_formal: 'lauloit',
        he: 'lauloi',
        she: 'lauloi',
        it: 'lauloi',
        we: 'lauloimme',
        you_plural_formal: 'lauloitte',
        you_plural: 'lauloitte',
        they: 'lauloivat'
      }
    }),
    do: new Translation('tehdä'),
    go: new Translation('mennä'),
    sew: new Translation('omella'),
    build: new Translation('rakentaa'),
    now: new Translation('nyt'),
    future: new Translation('tulevaisuus'),
    past: new Translation('menneisyys'),
    I: new Translation('minä'),
    you: new Translation('sinä'),
    you_formal: new Translation('sinä'),
    he: new Translation('hän'),
    she: new Translation('hän'),
    it: new Translation('se'),
    we: new Translation('me'),
    you_plural: new Translation('te'),
    you_plural_formal: new Translation('te'),
    they: new Translation('ne')
  };

  class Finnish extends Language {

    constructor(translations) {
      super('Finnish', translations);
    }

    translateActor(actor) {
      return '';
    }
  }

  return new Finnish(translations);
});