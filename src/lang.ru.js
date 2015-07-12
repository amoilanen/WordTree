define('lang.ru', ['lang', 'grammar'], function(Lang, Grammar) {

  var {Translation, Language} = Lang;
  var {Word} = Grammar;

  class VerbTranslation extends Translation {

    constructor(opts) {
      opts.keyVowel = opts.keyVowel || '';
      opts.defaultForm = opts.defaultForm || opts.root + opts.keyVowel + 'ть';
      super(opts.root, opts.defaultForm);
      this.keyVowel = opts.keyVowel;
      this.conjugationRoots = this.determineConjugationRoots(opts.conjugationRoots);
      this.conjugations = this.conjugate(opts.conjugations);
    }

    determineConjugationRoots(conjugationRoots) {
      if (!conjugationRoots) {
        conjugationRoots = {};
      }
      ['now', 'future', 'past'].forEach((time) => {
        if (!conjugationRoots[time]) {
          conjugationRoots[time] = this.root + this.keyVowel;
        }
      });
      return conjugationRoots;
    }

    conjugate(conjugations) {
      conjugations = conjugations || {};
      var result = {
        now: {
          I: this.conjugationRoots.now + 'ю',
          you: this.conjugationRoots.now + 'ешь',
          you_formal: this.conjugationRoots.now + 'ете',
          he: this.conjugationRoots.now + 'ет',
          she: this.conjugationRoots.now + 'ет',
          it: this.conjugationRoots.now + 'ет',
          we: this.conjugationRoots.now + 'ем',
          you_plural_formal: this.conjugationRoots.now + 'ете',
          you_plural: this.conjugationRoots.now + 'ете',
          they: this.conjugationRoots.now + 'ют'
        },
        future: {
          I: 'буду ' + this.defaultForm,
          you: 'будешь ' + this.defaultForm,
          you_formal: 'будете ' + this.defaultForm,
          he: 'будет ' + this.defaultForm,
          she: 'будет ' + this.defaultForm,
          it: 'будет ' + this.defaultForm,
          we: 'будем ' + this.defaultForm,
          you_plural_formal: 'будете ' + this.defaultForm,
          you_plural: 'будете ' + this.defaultForm,
          they: 'будут ' + this.defaultForm
        },
        past: {
          I: this.conjugationRoots.past + 'л',
          you: this.conjugationRoots.past + 'л',
          you_formal: this.conjugationRoots.past + 'ли',
          he: this.conjugationRoots.past + 'л',
          she: this.conjugationRoots.past + 'ла',
          it: this.conjugationRoots.past + 'ло',
          we: this.conjugationRoots.past + 'ли',
          you_plural_formal: this.conjugationRoots.past + 'ли',
          you_plural: this.conjugationRoots.past + 'ли',
          they: this.conjugationRoots.past + 'ли'
        }
      };

      ['now', 'future', 'past'].forEach((time) => {
        ['I', 'you', 'you_formal', 'he', 'she',
         'it', 'we', 'you_plural_formal',
         'you_plural', 'they'].forEach((person) => {
          if (conjugations[time] && conjugations[time][person]) {
            result[time][person] = conjugations[time][person];
          }
        });
      });
      return result;
    }
  }

  var translations = {
    sun: new Translation('солнце'),
    sing: new VerbTranslation({
      root: 'п',
      keyVowel: 'е',
      conjugationRoots: {
        now: 'по' //пею -> пою, пеешь -> поешь, пеет -> поет
      }
    }),
    do: new VerbTranslation({
      root: 'дел',
      keyVowel: 'а'
    }),
    go: new VerbTranslation({
      root: 'ид',
      defaultForm: 'идти', //идть -> идти
      conjugationRoots: {
        past: 'ш'
      },
      conjugations: {
        now: {
          I: 'иду', //идю -> иду
          they: 'идут' //идют -> идут
        },
        past: {
          I: 'шел', //идл -> шел
          you: 'шел', //идл -> шел
          he: 'шел' //идл -> шел
        }
      }
    }),
    sew: new Translation('шить', 'ш', {
      now: {
        I: 'шью',
        you: 'шьешь',
        you_formal: 'шьете',
        he: 'шьет',
        she: 'шьет',
        it: 'шьет',
        we: 'шьем',
        you_plural_formal: 'шьете',
        you_plural: 'шьете',
        they: 'шьют'
      },
      future: {
        I: 'буду шить',
        you: 'будешь шить',
        you_formal: 'будете шить',
        he: 'будет шить',
        she: 'будет шить',
        it: 'будет шить',
        we: 'будем шить',
        you_plural_formal: 'будете шить',
        you_plural: 'будете шить',
        they: 'будут шить'
      },
      past: {
        I: 'шил',
        you: 'шил',
        you_formal: 'шили',
        he: 'шил',
        she: 'шила',
        it: 'шило',
        we: 'шили',
        you_plural_formal: 'шили',
        you_plural: 'шили',
        they: 'шили'
      }
    }),
    build: new Translation('строить', 'стро', {
      now: {
        I: 'строю',
        you: 'строишь',
        you_formal: 'строите',
        he: 'строит',
        she: 'строит',
        it: 'строит',
        we: 'строим',
        you_plural_formal: 'строите',
        you_plural: 'строите',
        they: 'строят'
      },
      future: {
        I: 'буду строить',
        you: 'будешь строить',
        you_formal: 'будете строить',
        he: 'будет строить',
        she: 'будет строить',
        it: 'будет строить',
        we: 'будем строить',
        you_plural_formal: 'будете строить',
        you_plural: 'будете строить',
        they: 'будут строить'
      },
      past: {
        I: 'строил',
        you: 'строил',
        you_formal: 'строили',
        he: 'строил',
        she: 'строила',
        it: 'строило',
        we: 'строили',
        you_plural_formal: 'строили',
        you_plural: 'строили',
        they: 'строили'
      }
    }),
    give: new Translation('давать', 'да', {
      now: {
        I: 'даю',
        you: 'даешь',
        you_formal: 'даете',
        he: 'дает',
        she: 'дает',
        it: 'дает',
        we: 'даем',
        you_plural_formal: 'даете',
        you_plural: 'даете',
        they: 'дают'
      },
      future: {
        I: 'буду давать',
        you: 'будешь давать',
        you_formal: 'будете давать',
        he: 'будет давать',
        she: 'будет давать',
        it: 'будет давать',
        we: 'будем давать',
        you_plural_formal: 'будете давать',
        you_plural: 'будете давать',
        they: 'будут давать'
      },
      past: {
        I: 'давал',
        you: 'давал',
        you_formal: 'давали',
        he: 'давал',
        she: 'давала',
        it: 'давало',
        we: 'дают',
        you_plural_formal: 'давали',
        you_plural: 'давали',
        they: 'давали'
      }
    }),
    look: new Translation('смотреть', 'смотр', {
      now: {
        I: 'смотрю',
        you: 'смотришь',
        you_formal: 'смотрите',
        he: 'смотрит',
        she: 'смотрит',
        it: 'смотрит',
        we: 'смотрим',
        you_plural_formal: 'смотрите',
        you_plural: 'смотрите',
        they: 'смотрят'
      },
      future: {
        I: 'буду смотреть',
        you: 'будешь смотреть',
        you_formal: 'будете смотреть',
        he: 'будет смотреть',
        she: 'будет смотреть',
        it: 'будет смотреть',
        we: 'будем смотреть',
        you_plural_formal: 'будете смотреть',
        you_plural: 'будете смотреть',
        they: 'будут смотреть'
      },
      past: {
        I: 'смотрел',
        you: 'смотрел',
        you_formal: 'смотрели',
        he: 'смотрел',
        she: 'смотрела',
        it: 'смотрело',
        we: 'смотрим',
        you_plural_formal: 'смотрите',
        you_plural: 'смотрите',
        they: 'смотрели'
      }
    }),
    see: new Translation('видеть', 'вид', {
      now: {
        I: 'вижу',
        you: 'видишь',
        you_formal: 'видите',
        he: 'видит',
        she: 'видит',
        it: 'видит',
        we: 'видим',
        you_plural_formal: 'видете',
        you_plural: 'видете',
        they: 'видят'
      },
      future: {
        I: 'буду видеть',
        you: 'будешь видеть',
        you_formal: 'будете видеть',
        he: 'будет видеть',
        she: 'будет видеть',
        it: 'будет видеть',
        we: 'будем видеть',
        you_plural_formal: 'будете видеть',
        you_plural: 'будете видеть',
        they: 'будут видеть'
      },
      past: {
        I: 'видел',
        you: 'видел',
        you_formal: 'видели',
        he: 'видел',
        she: 'видела',
        it: 'видело',
        we: 'видим',
        you_plural_formal: 'видите',
        you_plural: 'видите',
        they: 'видели'
      }
    }),
    now: new Translation('сейчас'),
    future: new Translation('будущее'),
    past: new Translation('прошлое'),
    I: new Translation('я'),
    you: new Translation('ты'),
    you_formal: new Translation('вы'),
    he: new Translation('он'),
    she: new Translation('она'),
    it: new Translation('оно'),
    we: new Translation('мы'),
    you_plural: new Translation('вы'),
    you_plural_formal: new Translation('вы'),
    they: new Translation('они')
  };

  class Russian extends Language {

    constructor(translations) {
      super('Russian', translations);
    }
  }

  return new Russian(translations);
});