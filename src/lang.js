define('lang', function() {

  class Language {

    constructor(wordTranslations) {
      this.wordTranslations = wordTranslations;
    }

    translate(word) {
      return this.wordTranslations[word.id] || word.id;
    }
  }

  return Language;
});