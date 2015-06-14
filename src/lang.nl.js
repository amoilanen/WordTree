define('lang.nl', ['lang'], function(Language) {

  var translations = {
    sun: 'zon',
    sing: 'zing',
    now: 'nu',
    future: 'toekomst',
    past: 'verleden',
    I: 'ik',
    you: 'je',
    you_formal: 'u',
    he: 'hij',
    she: 'zij',
    it: 'het',
    we: 'wij',
    you_plural: 'jullie',
    you_plural_formal: 'u',
    they: 'zij'
  };

  return new Language('Dutch', translations);
});