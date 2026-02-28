/*
 * Utility functions to use in specs.
 */
import { PERSONS, GENDERS } from '../src/lang';
import { Actor, Word } from '../src/grammar';
import { Language } from '../src/lang';

export function shouldHaveActionForms(
  lang: Language,
  action: Word,
  forms: Record<string, Record<string, string | Record<string, string>>>
): void {
  describe(`'${action.id}' forms`, function() {
    Object.keys(forms).forEach(function(time) {
      const timeForms = forms[time];
      describe(time + ' time', function() {
        PERSONS.forEach(function(actorId) {
          describe(actorId + ' actor', function() {
            const translation = timeForms[actorId];
            if (typeof translation === 'string') {
              it('should translate to ' + lang.name, function() {
                expect(lang.translateAction(Word[actorId as keyof typeof Word] as Word, action, Word[time as keyof typeof Word] as Word)).toBe(translation);
              });
            } else {
              (GENDERS as readonly string[]).forEach(function(gender) {
                describe(gender + ' gender', function() {
                  const genderSpecificTranslation = (translation as Record<string, string>)[gender];

                  it('should translate to ' + lang.name, function() {
                    expect(lang.translateAction(
                      new Actor(Word[actorId as keyof typeof Word] as Word, Word[gender as keyof typeof Word] as Word),
                      action,
                      Word[time as keyof typeof Word] as Word
                    )).toBe(genderSpecificTranslation);
                  });
                });
              });
            }
          });
        });
      });
    });
  });
}

export function shouldTranslate(
  words: Parameters<Language['translate']>[0],
  translations: [Language, string][]
): void {
  translations.forEach(function([lang, translation]) {
    it('should translate to ' + lang.name, function() {
      expect(lang.translate(words)).toBe(translation);
    });
  });
}
