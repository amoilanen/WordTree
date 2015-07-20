define(['grammar', 'lang.en', 'test.util'],
    function({Word, Actor, Action, Time, Sentence}, lang, {shouldHaveActionForms}) {

  describe('English action forms', function() {
    shouldHaveActionForms(lang, Word.sing, {
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
    });

    shouldHaveActionForms(lang, Word.do, {
      now: {
        I: 'do',
        you: 'do',
        you_formal: 'do',
        he: 'does',
        she: 'does',
        it: 'does',
        we: 'do',
        you_plural_formal: 'do',
        you_plural: 'do',
        they: 'do'
      },
      future: {
        I: 'will do',
        you: 'will do',
        you_formal: 'will do',
        he: 'will do',
        she: 'will do',
        it: 'will do',
        we: 'will do',
        you_plural_formal: 'will do',
        you_plural: 'will do',
        they: 'will do'
      },
      past: {
        I: 'did',
        you: 'did',
        you_formal: 'did',
        he: 'did',
        she: 'did',
        it: 'did',
        we: 'did',
        you_plural_formal: 'did',
        you_plural: 'did',
        they: 'did'
      }
    });

    shouldHaveActionForms(lang, Word.go, {
      now: {
        I: 'go',
        you: 'go',
        you_formal: 'go',
        he: 'goes',
        she: 'goes',
        it: 'goes',
        we: 'go',
        you_plural_formal: 'go',
        you_plural: 'go',
        they: 'go'
      },
      future: {
        I: 'will go',
        you: 'will go',
        you_formal: 'will go',
        he: 'will go',
        she: 'will go',
        it: 'will go',
        we: 'will go',
        you_plural_formal: 'will go',
        you_plural: 'will go',
        they: 'will go'
      },
      past: {
        I: 'went',
        you: 'went',
        you_formal: 'went',
        he: 'went',
        she: 'went',
        it: 'went',
        we: 'went',
        you_plural_formal: 'went',
        you_plural: 'went',
        they: 'went'
      }
    });

    shouldHaveActionForms(lang, Word.sew, {
      now: {
        I: 'sew',
        you: 'sew',
        you_formal: 'sew',
        he: 'sews',
        she: 'sews',
        it: 'sews',
        we: 'sew',
        you_plural_formal: 'sew',
        you_plural: 'sew',
        they: 'sew'
      },
      future: {
        I: 'will sew',
        you: 'will sew',
        you_formal: 'will sew',
        he: 'will sew',
        she: 'will sew',
        it: 'will sew',
        we: 'will sew',
        you_plural_formal: 'will sew',
        you_plural: 'will sew',
        they: 'will sew'
      },
      past: {
        I: 'sewed',
        you: 'sewed',
        you_formal: 'sewed',
        he: 'sewed',
        she: 'sewed',
        it: 'sewed',
        we: 'sewed',
        you_plural_formal: 'sewed',
        you_plural: 'sewed',
        they: 'sewed'
      }
    });

    shouldHaveActionForms(lang, Word.build, {
      now: {
        I: 'build',
        you: 'build',
        you_formal: 'build',
        he: 'builds',
        she: 'builds',
        it: 'builds',
        we: 'build',
        you_plural_formal: 'build',
        you_plural: 'build',
        they: 'build'
      },
      future: {
        I: 'will build',
        you: 'will build',
        you_formal: 'will build',
        he: 'will build',
        she: 'will build',
        it: 'will build',
        we: 'will build',
        you_plural_formal: 'will build',
        you_plural: 'will build',
        they: 'will build'
      },
      past: {
        I: 'built',
        you: 'built',
        you_formal: 'built',
        he: 'built',
        she: 'built',
        it: 'built',
        we: 'built',
        you_plural_formal: 'built',
        you_plural: 'built',
        they: 'built'
      }
    });

    shouldHaveActionForms(lang, Word.give, {
      now: {
        I: 'give',
        you: 'give',
        you_formal: 'give',
        he: 'gives',
        she: 'gives',
        it: 'gives',
        we: 'give',
        you_plural_formal: 'give',
        you_plural: 'give',
        they: 'give'
      },
      future: {
        I: 'will give',
        you: 'will give',
        you_formal: 'will give',
        he: 'will give',
        she: 'will give',
        it: 'will give',
        we: 'will give',
        you_plural_formal: 'will give',
        you_plural: 'will give',
        they: 'will give'
      },
      past: {
        I: 'gave',
        you: 'gave',
        you_formal: 'gave',
        he: 'gave',
        she: 'gave',
        it: 'gave',
        we: 'gave',
        you_plural_formal: 'gave',
        you_plural: 'gave',
        they: 'gave'
      }
    });

    shouldHaveActionForms(lang, Word.look, {
      now: {
        I: 'look',
        you: 'look',
        you_formal: 'look',
        he: 'looks',
        she: 'looks',
        it: 'looks',
        we: 'look',
        you_plural_formal: 'look',
        you_plural: 'look',
        they: 'look'
      },
      future: {
        I: 'will look',
        you: 'will look',
        you_formal: 'will look',
        he: 'will look',
        she: 'will look',
        it: 'will look',
        we: 'will look',
        you_plural_formal: 'will look',
        you_plural: 'will look',
        they: 'will look'
      },
      past: {
        I: 'looked',
        you: 'looked',
        you_formal: 'looked',
        he: 'looked',
        she: 'looked',
        it: 'looked',
        we: 'looked',
        you_plural_formal: 'looked',
        you_plural: 'looked',
        they: 'looked'
      }
    });

    shouldHaveActionForms(lang, Word.see, {
      now: {
        I: 'see',
        you: 'see',
        you_formal: 'see',
        he: 'sees',
        she: 'sees',
        it: 'sees',
        we: 'see',
        you_plural_formal: 'see',
        you_plural: 'see',
        they: 'see'
      },
      future: {
        I: 'will see',
        you: 'will see',
        you_formal: 'will see',
        he: 'will see',
        she: 'will see',
        it: 'will see',
        we: 'will see',
        you_plural_formal: 'will see',
        you_plural: 'will see',
        they: 'will see'
      },
      past: {
        I: 'saw',
        you: 'saw',
        you_formal: 'saw',
        he: 'saw',
        she: 'saw',
        it: 'saw',
        we: 'saw',
        you_plural_formal: 'saw',
        you_plural: 'saw',
        they: 'saw'
      }
    });
  });
});