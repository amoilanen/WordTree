define('lang', function() {

  class Language {

    constructor(name, wordTranslations) {
      this.name = name;
      this.wordTranslations = wordTranslations;
    }

    translate(word) {
      return this.wordTranslations[word.id] || word.id;
    }
  }

  return Language;
});