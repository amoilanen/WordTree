define('lang.en', ['lang'], function(Language) {

  var translations = {
    sun: 'sun',
    sing: 'sing',
    now: 'now',
    future: 'future',
    past: 'past',
    I: 'I',
    you: 'you',
    you_formal: 'you',
    he: 'he',
    she: 'she',
    it: 'it',
    we: 'we',
    you_plural: 'you',
    you_plural_formal: 'you',
    they: 'they'
  };

  return new Language('English', translations);
});