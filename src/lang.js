define('lang', function() {

  class Language {

    constructor(wordTranslations) {
      this.wordTranslations = wordTranslations;
    }

    translate(word) {
      return this.wordTranslations[word.id] || 'UNKNOWN';
    }
  }

  return Language;
});