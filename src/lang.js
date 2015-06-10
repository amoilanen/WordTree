define('lang', function() {

  function Language(wordTranslations) {
    this.wordTranslations = wordTranslations;
  }

  Language.prototype.translate = function(word) {
    return this.wordTranslations[word.id] || 'UNKNOWN';
  };

  return Language;
});