define('lang.fi', ['lang'], function(Language) {

  var translations = {
    sun: 'aurinko',
    sing: 'laulaa',
    now: 'nyt',
    future: 'tulevaisuus',
    past: 'menneisyys',
    I: 'minä',
    you: 'sinä',
    you_formal: 'sinä',
    he: 'hän',
    she: 'hän',
    it: 'se',
    we: 'me',
    you_plural: 'te',
    you_plural_formal: 'te',
    they: 'ne'
  };

  return new Language('Finnish', translations);
});