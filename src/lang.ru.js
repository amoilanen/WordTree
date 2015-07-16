define('lang.ru', ['lang', 'grammar'], function(Lang, Grammar) {

  var {ActionTranslation, Translation, Language, PERSONS, TENSES} = Lang;
  var {Word} = Grammar;

  class ActionTranslationRu extends ActionTranslation {

    constructor(opts) {
      opts.keyVowel = opts.keyVowel || '';
      opts.defaultForm = opts.defaultForm || opts.root + opts.keyVowel + 'ть';
      super(opts);
      this.keyVowel = opts.keyVowel;
      super.conjugate();
    }

    getDefaultConjugationRoot() {
      return this.root + this.keyVowel;
    }

    getPresentForms() {

      //TODO: Re-factor: extract constants and the method for checking that somethine ends with some letter
      //строиет -> строит
      return (this.conjugationRoots['now'].lastIndexOf('и') === this.conjugationRoots['now'].length - 1) ? //Ends with that letter
        {
          I: this.root + 'ю',
          you: this.conjugationRoots.now + 'шь',
          you_formal: this.conjugationRoots.now + 'те',
          he: this.conjugationRoots.now + 'т',
          she: this.conjugationRoots.now + 'т',
          it: this.conjugationRoots.now + 'т',
          we: this.conjugationRoots.now + 'м',
          you_plural_formal: this.conjugationRoots.now + 'те',
          you_plural: this.conjugationRoots.now + 'те',
          they: this.root + 'ят'
        } : {
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
        };
    }

    getFutureForms() {
      return {
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
      };
    }

    getPastForms() {
      return {
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
      };
    }
  }

  var translations = {
    sun: new Translation('солнце'),
    sing: new ActionTranslationRu({
      root: 'п',
      keyVowel: 'е',
      conjugationRoots: {
        now: 'по' //пею -> пою, пеешь -> поешь, пеет -> поет
      }
    }),
    do: new ActionTranslationRu({
      root: 'дел',
      keyVowel: 'а'
    }),
    go: new ActionTranslationRu({
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
    sew: new ActionTranslationRu({
      root: 'ш',
      keyVowel: 'и',
      conjugationRoots: {
        now: 'шь' //шишь -> шьешь, шит -> шьет, шите -> шьете, шим -> шьем
      },
      conjugations: {
        now: {
          I: 'шью', //шю -> шью
          they: 'шьют' //шят -> шьют
        }
      }
    }),
    build: new ActionTranslationRu({
      root: 'стро',
      keyVowel: 'и'
    }),
    give: new ActionTranslationRu({
      root: 'дав',
      keyVowel: 'а',
      conjugationRoots: {
        now: 'да' //даваю -> даю, даваешь -> даешь, даваете -> даете, давает -> дает, даваем -> даем, даваете -> даете, давают -> дают
      }
    }),
    look: new ActionTranslationRu({
      root: 'смотр',
      keyVowel: 'е',
      conjugationRoots: {
        now: 'смотри' //смотрею -> смотрю, смотреешь -> смотришь, смотреете -> смотрите, смотреет -> смотрит, смотреем -> смотрим, смотреете -> смотрите, смотреют -> смотрят
      }
    }),
    see: new ActionTranslationRu({
      root: 'вид',
      keyVowel: 'е',
      conjugationRoots: {
        now: 'види' //видешь -> видишь, видет -> видит, видем -> видим, видют -> видят
      },
      conjugations: {
        now: {
          I: 'вижу', //видю -> вижу
          you_plural_formal: 'видете', //видите -> видете
          you_plural: 'видете'  //видите -> видете
        }
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