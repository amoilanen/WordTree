import { Translation, ObjectTranslation, ActionTranslation, ActionTranslationOpts, AdjectiveTranslation, AdverbTranslation, Language, WordTranslations } from './lang';
import { Word, Actor } from './grammar';
import { isDefined, endsWith } from './util';

class ActionTranslationRu extends ActionTranslation {

  constructor(opts: ActionTranslationOpts & { keyVowel?: string }) {
    opts.keyVowel = opts.keyVowel || '';
    opts.defaultForm = opts.defaultForm || opts.root + opts.keyVowel + 'ть';
    super(opts);
    super.conjugate();
  }

  get keyVowel(): string {
    return this.opts.keyVowel || '';
  }

  getDefaultConjugationRoot(): string {
    return this.root + this.keyVowel;
  }

  timeActorForm(time: Word, actor: Word | Actor): string {
    let person: Word | undefined;
    let gender: Word | undefined;

    if (actor instanceof Actor) {
      person = actor.person;
      gender = actor.gender;
    } else {
      person = actor;
    }

    if (isDefined(gender) && (time === Word.past)) {
      person = gender!;
    }
    return super.timeActorForm(time, person);
  }

  getPresentForms(): Record<string, string> {
    const base = this.conjugationRoots.now;

    //строиет -> строит
    return endsWith(base, 'и') ?
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

  getFutureForms(): Record<string, string> {
    const base = this.defaultForm;

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

  getPastForms(): Record<string, string> {
    const base = this.conjugationRoots.past;

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

  getNegatedTimeActorForm(time: Word, actor: Word | Actor): string {
    return `не ${this.timeActorForm(time, actor)}`;
  }

  getNegatedPrimaryTimeActorForm(time: Word, actor: Word | Actor): string {
    return `не ${this.timeActorForm(time, actor)}`;
  }
}

const translations: WordTranslations = {
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
  be: new ActionTranslationRu({
    root: 'бы',
    keyVowel: '',
    defaultForm: 'быть',
    conjugationRoots: {
      past: 'бы'
    },
    conjugations: {
      now: {
        I: '', you: '', you_formal: '',
        he: '', she: '', it: '',
        we: '', you_plural: '', you_plural_formal: '',
        they: ''
      },
      future: {
        I: 'буду',
        you: 'будешь', you_formal: 'будете',
        he: 'будет', she: 'будет', it: 'будет',
        we: 'будем', you_plural: 'будете', you_plural_formal: 'будете',
        they: 'будут'
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
  lake: new ObjectTranslation({
    defaultForm: 'озеро',
    asActor: Word.it,
    asMany: 'озера'
  }),
  bird: new ObjectTranslation({
    defaultForm: 'птица',
    asActor: Word.she,
    asMany: 'птицы'
  }),
  wolf: new ObjectTranslation({
    defaultForm: 'волк',
    asActor: Word.he,
    asMany: 'волки'
  }),
  bright: new AdjectiveTranslation({
    defaultForm: 'яркий',
    forms: { he: 'яркий', she: 'яркая', it: 'яркое', plural: 'яркие' }
  }),
  old: new AdjectiveTranslation({
    defaultForm: 'старый',
    forms: { he: 'старый', she: 'старая', it: 'старое', plural: 'старые' }
  }),
  big: new AdjectiveTranslation({
    defaultForm: 'большой',
    forms: { he: 'большой', she: 'большая', it: 'большое', plural: 'большие' }
  }),
  small: new AdjectiveTranslation({
    defaultForm: 'маленький',
    forms: { he: 'маленький', she: 'маленькая', it: 'маленькое', plural: 'маленькие' }
  }),
  good: new AdjectiveTranslation({
    defaultForm: 'хороший',
    forms: { he: 'хороший', she: 'хорошая', it: 'хорошее', plural: 'хорошие' }
  }),
  white: new AdjectiveTranslation({
    defaultForm: 'белый',
    forms: { he: 'белый', she: 'белая', it: 'белое', plural: 'белые' }
  }),
  loudly: new AdverbTranslation('громко'),
  slowly: new AdverbTranslation('медленно'),
  quickly: new AdverbTranslation('быстро'),
  well: new AdverbTranslation('хорошо')
};

class Russian extends Language {

  constructor(translations: WordTranslations) {
    super('Russian', translations);
  }

  translateObject(object: Word, specifier: Word | undefined, context?: { isSubject?: boolean; adjective?: Word }): string {
    const objectTranslation = this.wordTranslations[object.id] as ObjectTranslation;
    const objectForm = this.translateWord(object, context);
    const adjectiveForm = context?.adjective ? this.translateAdjective(context.adjective, object) : undefined;

    let nounForm: string;
    if ((specifier === Word.many) && isDefined(objectTranslation.asMany)) {
      nounForm = objectTranslation.asMany as string;
    } else {
      nounForm = objectForm;
    }
    return adjectiveForm ? `${adjectiveForm} ${nounForm}` : nounForm;
  }

  translateAdjective(adjective: Word, object?: Word): string {
    const translation = this.wordTranslations[adjective.id];
    if (translation instanceof AdjectiveTranslation && translation.forms && object) {
      const objectTranslation = this.wordTranslations[object.id];
      if (objectTranslation instanceof ObjectTranslation && objectTranslation.asActor) {
        const gender = objectTranslation.asActor.id;
        if (translation.forms[gender]) {
          return translation.forms[gender];
        }
      }
    }
    return translation ? translation.defaultForm : adjective.id;
  }

  insertAdverb(verbPhrase: string, adverbForm: string): string {
    return `${adverbForm} ${verbPhrase}`;
  }

  insertNegatedAdverb(verbPhrase: string, adverbForm: string): string {
    return `не ${adverbForm} ${verbPhrase}`;
  }
}

export default new Russian(translations);
