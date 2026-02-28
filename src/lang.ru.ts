import { Translation, ObjectTranslation, ActionTranslation, ActionTranslationOpts, AdjectiveTranslation, AdverbTranslation, PrepositionTranslation, Language, WordTranslations } from './lang';
import { Word, Actor, Action, Entity, PrepositionalPhrase } from './grammar';
import { isDefined, endsWith } from './util';

const POSSESSIVE_FORMS: Record<string, Record<string, string> | string> = {
  I:    { he: 'мой', she: 'моя', it: 'моё' },
  you:  { he: 'твой', she: 'твоя', it: 'твоё' },
  you_formal: { he: 'ваш', she: 'ваша', it: 'ваше' },
  he: 'его',
  she: 'её',
  it: 'его',
  we:   { he: 'наш', she: 'наша', it: 'наше' },
  you_plural: { he: 'ваш', she: 'ваша', it: 'ваше' },
  you_plural_formal: { he: 'ваш', she: 'ваша', it: 'ваше' },
  they: 'их'
};

// Accusative possessive forms (used when the possessed noun is a direct object)
const POSSESSIVE_FORMS_ACC: Record<string, Record<string, string> | string> = {
  I:    { he: 'моего', she: 'мою', it: 'моё' },
  you:  { he: 'твоего', she: 'твою', it: 'твоё' },
  you_formal: { he: 'вашего', she: 'вашу', it: 'ваше' },
  he: 'его',
  she: 'её',
  it: 'его',
  we:   { he: 'нашего', she: 'нашу', it: 'наше' },
  you_plural: { he: 'вашего', she: 'вашу', it: 'ваше' },
  you_plural_formal: { he: 'вашего', she: 'вашу', it: 'ваше' },
  they: 'их'
};

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
    imperative: 'пой',
    conjugationRoots: {
      now: 'по' //пею -> пою, пеешь -> поешь, пеет -> поет
    }
  }),
  do: new ActionTranslationRu({
    root: 'дел',
    keyVowel: 'а',
    imperative: 'делай'
  }),
  go: new ActionTranslationRu({
    root: 'ид',
    defaultForm: 'идти',
    imperative: 'иди', //идть -> идти
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
    imperative: 'шей',
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
    keyVowel: 'и',
    imperative: 'строй'
  }),
  give: new ActionTranslationRu({
    root: 'дав',
    keyVowel: 'а',
    imperative: 'давай',
    conjugationRoots: {
      now: 'да' //даваю -> даю, даваешь -> даешь, даваете -> даете, давает -> дает, даваем -> даем, даваете -> даете, давают -> дают
    }
  }),
  look: new ActionTranslationRu({
    root: 'смотр',
    keyVowel: 'е',
    imperative: 'смотри',
    conjugationRoots: {
      now: 'смотри' //смотрею -> смотрю, смотреешь -> смотришь, смотреете -> смотрите, смотреет -> смотрит, смотреем -> смотрим, смотреете -> смотрите, смотреют -> смотрят
    }
  }),
  see: new ActionTranslationRu({
    root: 'вид',
    keyVowel: 'е',
    imperative: 'смотри',
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
    imperative: 'хоти',
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
    imperative: 'моги',
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
    imperative: 'свети',
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
    imperative: 'будь',
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
    asMany: 'озера',
    asAccusative: 'озеро',
    asDative: 'озеру',
    asGenitive: 'озера',
    asInstrumental: 'озером',
    asPrepositional: 'озере'
  }),
  bird: new ObjectTranslation({
    defaultForm: 'птица',
    asActor: Word.she,
    asSubject: 'птицу',
    asMany: 'птицы',
    asAccusative: 'птицу',
    asDative: 'птице',
    asGenitive: 'птицы',
    asInstrumental: 'птицей',
    asPrepositional: 'птице'
  }),
  wolf: new ObjectTranslation({
    defaultForm: 'волк',
    asActor: Word.he,
    asSubject: 'волка',
    asMany: 'волки',
    asAccusative: 'волка',
    asDative: 'волку',
    asGenitive: 'волка',
    asInstrumental: 'волком',
    asPrepositional: 'волке'
  }),
  house: new ObjectTranslation({
    defaultForm: 'дом',
    asActor: Word.he,
    asMany: 'дома'
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
  well: new AdverbTranslation('хорошо'),
  and: new Translation('и'),
  but: new Translation('но'),
  or: new Translation('или'),
  to: new PrepositionTranslation({ defaultForm: 'к', governedCase: 'dative' }),
  from: new PrepositionTranslation({ defaultForm: 'из', governedCase: 'genitive' }),
  at: new PrepositionTranslation({ defaultForm: 'на', governedCase: 'accusative' }),
  over: new PrepositionTranslation({ defaultForm: 'над', governedCase: 'instrumental' }),
  behind: new PrepositionTranslation({ defaultForm: 'за', governedCase: 'instrumental' })
};

class Russian extends Language {

  constructor(translations: WordTranslations) {
    super('Russian', translations);
  }

  translatePrepositionalPhrase(pp: PrepositionalPhrase): string {
    const prepTranslation = this.wordTranslations[pp.preposition.id] as PrepositionTranslation;
    const prepForm = prepTranslation?.defaultForm || pp.preposition.id;
    const objectWord = pp.object instanceof Entity ? pp.object.word : pp.object;
    const objectTranslation = this.wordTranslations[objectWord.id] as ObjectTranslation;
    const caseMap: Record<string, string> = {
      accusative: 'asAccusative', dative: 'asDative', genitive: 'asGenitive',
      instrumental: 'asInstrumental', prepositional: 'asPrepositional'
    };
    const governedCase = prepTranslation?.governedCase;
    const caseKey = governedCase ? caseMap[governedCase] : undefined;
    const objectForm = (caseKey && objectTranslation && objectTranslation[caseKey])
      ? objectTranslation[caseKey] as string
      : objectTranslation?.defaultForm || this.translateWord(objectWord);
    return `${prepForm} ${objectForm}`;
  }

  translateImperative(action: Word | Action, _actor: Word | Actor): string {
    const primaryAction = action instanceof Action ? action.primary : action;
    const isNegated = action instanceof Action ? action.negated : false;
    const actionSubject = action instanceof Action ? action.subject : undefined;
    const translation = this.wordTranslations[primaryAction.id] as ActionTranslationRu;
    const form = translation?.opts?.imperative || translation?.defaultForm || this.translateWord(primaryAction);
    let result = isNegated ? `не ${form}` : form;
    if (actionSubject) {
      result = `${result} ${this.translateActionSubject(actionSubject)}`;
    }
    return result;
  }

  translatePossessive(possessor: Word, object?: Word, accusative?: boolean): string {
    const table = accusative ? POSSESSIVE_FORMS_ACC : POSSESSIVE_FORMS;
    const form = table[possessor.id];
    if (typeof form === 'string') return form;
    if (form && object) {
      const objectTranslation = this.wordTranslations[object.id];
      if (objectTranslation instanceof ObjectTranslation && objectTranslation.asActor) {
        const gender = objectTranslation.asActor.id;
        if (form[gender]) return form[gender];
      }
    }
    return form ? (form as Record<string, string>).he : possessor.id;
  }

  translateObject(object: Word, specifier: Word | undefined, context?: { isSubject?: boolean; adjective?: Word; possessor?: Word }): string {
    const objectTranslation = this.wordTranslations[object.id] as ObjectTranslation;
    const isAccusative = context?.isSubject === true;
    const objectForm = this.translateWord(object, context);
    const adjectiveForm = context?.adjective ? this.translateAdjective(context.adjective, object) : undefined;
    const possessiveForm = context?.possessor ? this.translatePossessive(context.possessor, object, isAccusative) : undefined;

    let nounForm: string;
    if ((specifier === Word.many) && isDefined(objectTranslation.asMany)) {
      nounForm = objectTranslation.asMany as string;
    } else {
      nounForm = objectForm;
    }
    return [possessiveForm, adjectiveForm, nounForm].filter(Boolean).join(' ');
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
