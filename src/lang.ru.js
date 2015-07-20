define('lang.ru', ['lang', 'grammar', 'util'], function(Lang, Grammar, _) {

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
      var base = this.conjugationRoots.now;

      //строиет -> строит
      return _.endsWith(base, 'и') ?
        {
          I: `${this.root}ю`,
          you: `${base}шь`,
          you_formal: `${base}те`,
          he: `${base}т`,
          she: `${base}т`,
          it: `${base}т`,
          we: `${base}м`,
          you_plural_formal: `${base}те`,
          you_plural: `${base}те`,
          they: `${this.root}ят`
        } : {
          I: `${base}ю`,
          you: `${base}ешь`,
          you_formal: `${base}ете`,
          he: `${base}ет`,
          she: `${base}ет`,
          it: `${base}ет`,
          we: `${base}ем`,
          you_plural_formal: `${base}ете`,
          you_plural: `${base}ете`,
          they: `${base}ют`
        };
    }

    getFutureForms() {
      var base = this.defaultForm;

      return {
        I: `буду ${base}`,
        you: `будешь ${base}`,
        you_formal: `будете ${base}`,
        he: `будет ${base}`,
        she: `будет ${base}`,
        it: `будет ${base}`,
        we: `будем ${base}`,
        you_plural_formal: `будете ${base}`,
        you_plural: `будете ${base}`,
        they: `будут ${base}`
      };
    }

    getPastForms() {
      var base = this.conjugationRoots.past;

      return {
        I: `${base}л`,
        you: `${base}л`,
        you_formal: `${base}ли`,
        he: `${base}л`,
        she: `${base}ла`,
        it: `${base}ло`,
        we: `${base}ли`,
        you_plural_formal: `${base}ли`,
        you_plural: `${base}ли`,
        they: `${base}ли`
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