define('lang.ru', ['lang', 'grammar', 'util'], function(Lang, Grammar, _) {

  var {Translation, Language, ActionTranslation, ObjectTranslation} = Lang;
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

    timeActorForm(time, actor) {
      var {person, gender} = actor;

      if (_.isDefined(gender) && (time === Word.past)) {
        person = gender;
      }
      if (!_.isDefined(person)) {
        person = actor;
      }
      return super.timeActorForm(time, person);
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
    sun: new ObjectTranslation({
      defaultForm: 'солнце',
      asActor: Word.it
    }),
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
    want: new ActionTranslationRu({
      root: 'хот',
      keyVowel: 'е',
      conjugationRoots: {
        now: 'хоч'
      },
      conjugations: {
        now: {
          I: 'хочу',
          you_formal: 'хотите',
          we: 'хотим',
          you_plural: 'хотите',
          you_plural_formal: 'хотите',
          they: 'хотят'
        }
      }
    }),
    can: new ActionTranslationRu({
      root: 'мо',
      keyVowel: '',
      conjugationRoots: {
        now: 'мож',
        past: 'мог'
      },
      conjugations: {
        now: {
          I: 'могу',
          they: 'могут'
        },
        future: {
          I: 'могу',
          you: 'можешь',
          you_formal: 'можете',
          he: 'может',
          she: 'может',
          it: 'может',
          we: 'можем',
          you_plural_formal: 'можете',
          you_plural: 'можете',
          they: 'могут'
        },
        past: {
          I: 'мог',
          you: 'мог',
          he: 'мог'
        }
      }
    }),
    shine: new ActionTranslationRu({
      root: 'свет',
      keyVowel: 'и',
      conjugations: {
        now: {
          I: 'свечу'
        }
      }
    }),
    now: new Translation('сейчас'),
    future: new Translation('будущее'),
    past: new Translation('прошлое'),
    I: new ObjectTranslation({
      defaultForm: 'я',
      asActor: Word.I,
      asSubject: 'меня'
    }),
    you: new ObjectTranslation({
      defaultForm: 'ты',
      asActor: Word.you,
      asSubject: 'тебя'
    }),
    you_formal: new ObjectTranslation({
      defaultForm: 'вы',
      asActor: Word.you_formal,
      asSubject: 'вас'
    }),
    he: new ObjectTranslation({
      defaultForm: 'он',
      asActor: Word.he,
      asSubject: 'его'
    }),
    she: new ObjectTranslation({
      defaultForm: 'она',
      asActor: Word.she,
      asSubject: 'её'
    }),
    it: new ObjectTranslation({
      defaultForm: 'оно',
      asActor: Word.it,
      asSubject: 'это'
    }),
    we: new Translation('мы'),
    you_plural: new ObjectTranslation({
      defaultForm: 'вы',
      asActor: Word.you_plural,
      asSubject: 'вас'
    }),
    you_plural_formal: new ObjectTranslation({
      defaultForm: 'вы',
      asActor: Word.you_plural_formal,
      asSubject: 'вас'
    }),
    they: new ObjectTranslation({
      defaultForm: 'они',
      asActor: Word.they,
      asSubject: 'их'
    }),
    wet_snow_with_mud_and_ground: new Translation('снег'),
    snow_on_tree_branch: new Translation('снег'),
    snow: new Translation('снег'),
    this: new Translation('это'),
    that: new Translation('то'),
    one: new Translation('один'),
    one_of_some_kind: new Translation('один'),
    lake: new Translation('озеро'),
    bird: new Translation('птица'),
    wolf: new Translation('волк')
  };

  class Russian extends Language {

    constructor(translations) {
      super('Russian', translations);
    }
  }

  return new Russian(translations);
});