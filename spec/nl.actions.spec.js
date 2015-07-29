define(['grammar', 'lang.nl', 'test.util'],
    function({Word, Actor, Action, Time, Sentence}, lang, {shouldHaveActionForms}) {

  describe('Dutch action forms', function() {
    shouldHaveActionForms(lang, Word.sing, {
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
    });

    shouldHaveActionForms(lang, Word.do, {
      now: {
        I: 'doe',
        you: 'doet',
        you_formal: 'doet',
        he: 'doet',
        she: 'doet',
        it: 'doet',
        we: 'doen',
        you_plural_formal: 'doen',
        you_plural: 'doen',
        they: 'doen'
      },
      future: {
        I: 'doe',
        you: 'doet',
        you_formal: 'doet',
        he: 'doet',
        she: 'doet',
        it: 'doet',
        we: 'doen',
        you_plural_formal: 'doen',
        you_plural: 'doen',
        they: 'doen'
      },
      past: {
        I: 'deed',
        you: 'deed',
        you_formal: 'deed',
        he: 'deed',
        she: 'deed',
        it: 'deed',
        we: 'deeden',
        you_plural_formal: 'deeden',
        you_plural: 'deeden',
        they: 'deeden'
      }
    });

    shouldHaveActionForms(lang, Word.go, {
      now: {
        I: 'ga',
        you: 'gaat',
        you_formal: 'gaat',
        he: 'gaat',
        she: 'gaat',
        it: 'gaat',
        we: 'gaan',
        you_plural_formal: 'gaan',
        you_plural: 'gaan',
        they: 'gaan'
      },
      future: {
        I: 'ga',
        you: 'gaat',
        you_formal: 'gaat',
        he: 'gaat',
        she: 'gaat',
        it: 'gaat',
        we: 'gaan',
        you_plural_formal: 'gaan',
        you_plural: 'gaan',
        they: 'gaan'
      },
      past: {
        I: 'ging',
        you: 'ging',
        you_formal: 'ging',
        he: 'ging',
        she: 'ging',
        it: 'ging',
        we: 'gingen',
        you_plural_formal: 'gingen',
        you_plural: 'gingen',
        they: 'gingen'
      }
    });

    shouldHaveActionForms(lang, Word.sew, {
      now: {
        I: 'naai',
        you: 'naait',
        you_formal: 'naait',
        he: 'naait',
        she: 'naait',
        it: 'naait',
        we: 'naaien',
        you_plural_formal: 'naaien',
        you_plural: 'naaien',
        they: 'naaien'
      },
      future: {
        I: 'naai',
        you: 'naait',
        you_formal: 'naait',
        he: 'naait',
        she: 'naait',
        it: 'naait',
        we: 'naaien',
        you_plural_formal: 'naaien',
        you_plural: 'naaien',
        they: 'naaien'
      },
      past: {
        I: 'naaide',
        you: 'naaide',
        you_formal: 'naaide',
        he: 'naaide',
        she: 'naaide',
        it: 'naaide',
        we: 'naaiden',
        you_plural_formal: 'naaiden',
        you_plural: 'naaiden',
        they: 'naaiden'
      }
    });

    shouldHaveActionForms(lang, Word.build, {
      now: {
        I: 'bouw',
        you: 'bouwt',
        you_formal: 'bouwt',
        he: 'bouwt',
        she: 'bouwt',
        it: 'bouwt',
        we: 'bouwen',
        you_plural_formal: 'bouwen',
        you_plural: 'bouwen',
        they: 'bouwen'
      },
      future: {
        I: 'bouw',
        you: 'bouwt',
        you_formal: 'bouwt',
        he: 'bouwt',
        she: 'bouwt',
        it: 'bouwt',
        we: 'bouwen',
        you_plural_formal: 'bouwen',
        you_plural: 'bouwen',
        they: 'bouwen'
      },
      past: {
        I: 'bouwde',
        you: 'bouwde',
        you_formal: 'bouwde',
        he: 'bouwde',
        she: 'bouwde',
        it: 'bouwde',
        we: 'bouwden',
        you_plural_formal: 'bouwden',
        you_plural: 'bouwden',
        they: 'bouwden'
      }
    });

    shouldHaveActionForms(lang, Word.give, {
      now: {
        I: 'geef',
        you: 'geeft',
        you_formal: 'geeft',
        he: 'geeft',
        she: 'geeft',
        it: 'geeft',
        we: 'geven',
        you_plural_formal: 'geven',
        you_plural: 'geven',
        they: 'geven'
      },
      future: {
        I: 'geef',
        you: 'geeft',
        you_formal: 'geeft',
        he: 'geeft',
        she: 'geeft',
        it: 'geeft',
        we: 'geven',
        you_plural_formal: 'geven',
        you_plural: 'geven',
        they: 'geven'
      },
      past: {
        I: 'gaf',
        you: 'gaf',
        you_formal: 'gaf',
        he: 'gaf',
        she: 'gaf',
        it: 'gaf',
        we: 'gaven',
        you_plural_formal: 'gaven',
        you_plural: 'gaven',
        they: 'gaven'
      }
    });

    shouldHaveActionForms(lang, Word.look, {
      now: {
        I: 'kijk',
        you: 'kijkt',
        you_formal: 'kijkt',
        he: 'kijkt',
        she: 'kijkt',
        it: 'kijkt',
        we: 'kijken',
        you_plural_formal: 'kijken',
        you_plural: 'kijken',
        they: 'kijken'
      },
      future: {
        I: 'kijk',
        you: 'kijkt',
        you_formal: 'kijkt',
        he: 'kijkt',
        she: 'kijkt',
        it: 'kijkt',
        we: 'kijken',
        you_plural_formal: 'kijken',
        you_plural: 'kijken',
        they: 'kijken'
      },
      past: {
        I: 'keek',
        you: 'keek',
        you_formal: 'keek',
        he: 'keek',
        she: 'keek',
        it: 'keek',
        we: 'keken',
        you_plural_formal: 'keken',
        you_plural: 'keken',
        they: 'keken'
      }
    });

    shouldHaveActionForms(lang, Word.see, {
      now: {
        I: 'zie',
        you: 'ziet',
        you_formal: 'ziet',
        he: 'ziet',
        she: 'ziet',
        it: 'ziet',
        we: 'zien',
        you_plural_formal: 'zien',
        you_plural: 'zien',
        they: 'zien'
      },
      future: {
        I: 'zie',
        you: 'ziet',
        you_formal: 'ziet',
        he: 'ziet',
        she: 'ziet',
        it: 'ziet',
        we: 'zien',
        you_plural_formal: 'zien',
        you_plural: 'zien',
        they: 'zien'
      },
      past: {
        I: 'zag',
        you: 'zag',
        you_formal: 'zag',
        he: 'zag',
        she: 'zag',
        it: 'zag',
        we: 'zagen',
        you_plural_formal: 'zagen',
        you_plural: 'zagen',
        they: 'zagen'
      }
    });
  });
});