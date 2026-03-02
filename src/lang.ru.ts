import { Translation, ObjectTranslation, ActionTranslation, ActionTranslationOpts, AdjectiveTranslation, AdverbTranslation, PrepositionTranslation, Language, WordTranslations } from './lang';
import { Word, Actor, Action, Entity, PrepositionalPhrase, Question } from './grammar';
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
    imperative: 'строй',
    pastParticiple: 'построен'
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
    pastParticiple: 'увиден',
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
    asSubject: 'меня',
    asAccusative: 'меня', asDative: 'мне', asGenitive: 'меня',
    asInstrumental: 'мной', asPrepositional: 'мне'
  }),
  you: new ObjectTranslation({
    defaultForm: 'ты',
    asActor: Word.you,
    asSubject: 'тебя',
    asAccusative: 'тебя', asDative: 'тебе', asGenitive: 'тебя',
    asInstrumental: 'тобой', asPrepositional: 'тебе'
  }),
  you_formal: new ObjectTranslation({
    defaultForm: 'вы',
    asActor: Word.you_formal,
    asSubject: 'вас',
    asAccusative: 'вас', asDative: 'вам', asGenitive: 'вас',
    asInstrumental: 'вами', asPrepositional: 'вас'
  }),
  he: new ObjectTranslation({
    defaultForm: 'он',
    asActor: Word.he,
    asSubject: 'его',
    asAccusative: 'него', asDative: 'нему', asGenitive: 'него',
    asInstrumental: 'ним', asPrepositional: 'нём'
  }),
  she: new ObjectTranslation({
    defaultForm: 'она',
    asActor: Word.she,
    asSubject: 'её',
    asAccusative: 'неё', asDative: 'ней', asGenitive: 'неё',
    asInstrumental: 'ней', asPrepositional: 'ней'
  }),
  it: new ObjectTranslation({
    defaultForm: 'оно',
    asActor: Word.it,
    asSubject: 'это',
    asAccusative: 'него', asDative: 'нему', asGenitive: 'него',
    asInstrumental: 'ним', asPrepositional: 'нём'
  }),
  we: new ObjectTranslation({
    defaultForm: 'мы',
    asActor: Word.we,
    asAccusative: 'нас', asDative: 'нам', asGenitive: 'нас',
    asInstrumental: 'нами', asPrepositional: 'нас'
  }),
  you_plural: new ObjectTranslation({
    defaultForm: 'вы',
    asActor: Word.you_plural,
    asSubject: 'вас',
    asAccusative: 'вас', asDative: 'вам', asGenitive: 'вас',
    asInstrumental: 'вами', asPrepositional: 'вас'
  }),
  you_plural_formal: new ObjectTranslation({
    defaultForm: 'вы',
    asActor: Word.you_plural_formal,
    asSubject: 'вас',
    asAccusative: 'вас', asDative: 'вам', asGenitive: 'вас',
    asInstrumental: 'вами', asPrepositional: 'вас'
  }),
  they: new ObjectTranslation({
    defaultForm: 'они',
    asActor: Word.they,
    asSubject: 'их',
    asAccusative: 'них', asDative: 'ним', asGenitive: 'них',
    asInstrumental: 'ними', asPrepositional: 'них'
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
    forms: { he: 'яркий', she: 'яркая', it: 'яркое', plural: 'яркие', comparative: 'ярче', superlative: 'самый яркий' }
  }),
  old: new AdjectiveTranslation({
    defaultForm: 'старый',
    forms: { he: 'старый', she: 'старая', it: 'старое', plural: 'старые', comparative: 'старше', superlative: 'самый старый' }
  }),
  big: new AdjectiveTranslation({
    defaultForm: 'большой',
    forms: { he: 'большой', she: 'большая', it: 'большое', plural: 'большие', comparative: 'больше', superlative: 'самый большой' }
  }),
  small: new AdjectiveTranslation({
    defaultForm: 'маленький',
    forms: { he: 'маленький', she: 'маленькая', it: 'маленькое', plural: 'маленькие', comparative: 'меньше', superlative: 'самый маленький' }
  }),
  good: new AdjectiveTranslation({
    defaultForm: 'хороший',
    forms: { he: 'хороший', she: 'хорошая', it: 'хорошее', plural: 'хорошие', comparative: 'лучше', superlative: 'лучший' }
  }),
  white: new AdjectiveTranslation({
    defaultForm: 'белый',
    forms: { he: 'белый', she: 'белая', it: 'белое', plural: 'белые', comparative: 'белее', superlative: 'самый белый' }
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
  behind: new PrepositionTranslation({ defaultForm: 'за', governedCase: 'instrumental' }),
  what: new Translation('что'),
  who: new Translation('кто'),
  by_agent: new Translation(''),
  who_rel: new Translation('который'),
  which_rel: new Translation('который'),
  that_rel: new Translation('который'),
  because: new Translation('потому что'),
  that_conj: new Translation('что'),
  when_conj: new Translation('когда'),
  // Phase 17: Tom Sawyer vocabulary — nouns
  lady: new ObjectTranslation({
    defaultForm: 'дама', asActor: Word.she, asMany: 'дамы',
    asAccusative: 'даму', asGenitive: 'дамы', asDative: 'даме',
    asInstrumental: 'дамой', asPrepositional: 'даме'
  }),
  room: new ObjectTranslation({
    defaultForm: 'комната', asActor: Word.she, asMany: 'комнаты',
    asAccusative: 'комнату', asGenitive: 'комнаты', asDative: 'комнате',
    asInstrumental: 'комнатой', asPrepositional: 'комнате'
  }),
  door: new ObjectTranslation({
    defaultForm: 'дверь', asActor: Word.she, asMany: 'двери',
    asAccusative: 'дверь', asGenitive: 'двери', asDative: 'двери',
    asInstrumental: 'дверью', asPrepositional: 'двери'
  }),
  boy: new ObjectTranslation({
    defaultForm: 'мальчик', asActor: Word.he, asMany: 'мальчики',
    asSubject: 'мальчика',
    asAccusative: 'мальчика', asGenitive: 'мальчика', asDative: 'мальчику',
    asInstrumental: 'мальчиком', asPrepositional: 'мальчике'
  }),
  fence: new ObjectTranslation({
    defaultForm: 'забор', asActor: Word.he, asMany: 'заборы',
    asAccusative: 'забор', asGenitive: 'забора', asDative: 'забору',
    asInstrumental: 'забором', asPrepositional: 'заборе'
  }),
  cat: new ObjectTranslation({
    defaultForm: 'кот', asActor: Word.he, asMany: 'коты',
    asSubject: 'кота',
    asAccusative: 'кота', asGenitive: 'кота', asDative: 'коту',
    asInstrumental: 'котом', asPrepositional: 'коте'
  }),
  noise: new ObjectTranslation({
    defaultForm: 'шум', asActor: Word.he, asMany: 'шумы',
    asAccusative: 'шум', asGenitive: 'шума', asDative: 'шуму',
    asInstrumental: 'шумом', asPrepositional: 'шуме'
  }),
  air: new ObjectTranslation({
    defaultForm: 'воздух', asActor: Word.he,
    asAccusative: 'воздух', asGenitive: 'воздуха', asDative: 'воздуху',
    asInstrumental: 'воздухом', asPrepositional: 'воздухе'
  }),
  name_noun: new ObjectTranslation({
    defaultForm: 'имя', asActor: Word.it, asMany: 'имена',
    asAccusative: 'имя', asGenitive: 'имени', asDative: 'имени',
    asInstrumental: 'именем', asPrepositional: 'имени'
  }),
  lad: new ObjectTranslation({
    defaultForm: 'парень', asActor: Word.he, asMany: 'парни',
    asSubject: 'парня',
    asAccusative: 'парня', asGenitive: 'парня', asDative: 'парню',
    asInstrumental: 'парнем', asPrepositional: 'парне'
  }),
  stranger: new ObjectTranslation({
    defaultForm: 'незнакомец', asActor: Word.he, asMany: 'незнакомцы',
    asSubject: 'незнакомца',
    asAccusative: 'незнакомца', asGenitive: 'незнакомца', asDative: 'незнакомцу',
    asInstrumental: 'незнакомцем', asPrepositional: 'незнакомце'
  }),
  window: new ObjectTranslation({
    defaultForm: 'окно', asActor: Word.it, asMany: 'окна',
    asAccusative: 'окно', asGenitive: 'окна', asDative: 'окну',
    asInstrumental: 'окном', asPrepositional: 'окне'
  }),
  clothes: new ObjectTranslation({
    defaultForm: 'одежда', asActor: Word.she,
    asAccusative: 'одежду', asGenitive: 'одежды', asDative: 'одежде',
    asInstrumental: 'одеждой', asPrepositional: 'одежде'
  }),
  switch_noun: new ObjectTranslation({
    defaultForm: 'розга', asActor: Word.she, asMany: 'розги',
    asAccusative: 'розгу', asGenitive: 'розги', asDative: 'розге',
    asInstrumental: 'розгой', asPrepositional: 'розге'
  }),
  time_noun: new ObjectTranslation({
    defaultForm: 'время', asActor: Word.it, asMany: 'времена',
    asAccusative: 'время', asGenitive: 'времени', asDative: 'времени',
    asInstrumental: 'временем', asPrepositional: 'времени'
  }),
  voice: new ObjectTranslation({
    defaultForm: 'голос', asActor: Word.he,
    asAccusative: 'голос', asGenitive: 'голоса', asDative: 'голосу',
    asInstrumental: 'голосом', asPrepositional: 'голосе'
  }),
  jam: new ObjectTranslation({ defaultForm: 'варенье', asActor: Word.it }),
  summer: new ObjectTranslation({
    defaultForm: 'лето', asActor: Word.it,
    asAccusative: 'лето', asGenitive: 'лета', asDative: 'лету',
    asInstrumental: 'летом', asPrepositional: 'лете'
  }),
  // Phase 17: Tom Sawyer vocabulary — verbs
  finish: new ActionTranslationRu({
    root: 'заканчив', keyVowel: 'а', imperative: 'заканчивай',
    conjugationRoots: { now: 'заканчива' }
  }),
  shout: new ActionTranslationRu({
    root: 'крич', keyVowel: 'а', imperative: 'кричи',
    conjugationRoots: { now: 'кричи' }
  }),
  turn: new ActionTranslationRu({
    root: 'поверн', keyVowel: 'у', defaultForm: 'повернуть', imperative: 'повернись',
    conjugationRoots: { now: 'поверн', past: 'поверну' },
    conjugations: {
      now: { I: 'поворачиваю', you: 'поворачиваешь', you_formal: 'поворачиваете', he: 'поворачивает', she: 'поворачивает', it: 'поворачивает', we: 'поворачиваем', you_plural: 'поворачиваете', you_plural_formal: 'поворачиваете', they: 'поворачивают' },
      future: { I: 'поверну', you: 'повернёшь', you_formal: 'повернёте', he: 'повернёт', she: 'повернёт', it: 'повернёт', we: 'повернём', you_plural: 'повернёте', you_plural_formal: 'повернёте', they: 'повернут' }
    }
  }),
  seize: new ActionTranslationRu({
    root: 'хват', keyVowel: 'а', imperative: 'хватай',
    conjugationRoots: { now: 'хвата' }
  }),
  flee: new ActionTranslationRu({
    root: 'убег', keyVowel: 'а', imperative: 'убегай',
    conjugationRoots: { now: 'убега' }
  }),
  hover: new ActionTranslationRu({
    root: 'парил', keyVowel: '', defaultForm: 'парить', imperative: 'пари',
    conjugationRoots: { now: 'пари', past: 'пари' },
    conjugations: { now: { I: 'парю', they: 'парят' } }
  }),
  whirl: new ActionTranslationRu({
    root: 'кружи', keyVowel: '', defaultForm: 'кружить', imperative: 'кружи',
    conjugationRoots: { now: 'кружи', past: 'кружи' },
    conjugations: { now: { I: 'кружу', they: 'кружат' } }
  }),
  cry: new ActionTranslationRu({
    root: 'плак', keyVowel: 'а', imperative: 'плачь',
    conjugationRoots: { now: 'плач' },
    conjugations: { now: { I: 'плачу', they: 'плачут' } }
  }),
  chase: new ActionTranslationRu({
    root: 'гон', keyVowel: 'я', defaultForm: 'гнать', imperative: 'гони',
    conjugationRoots: { now: 'гони', past: 'гна' },
    conjugations: { now: { I: 'гоню', they: 'гонят' } }
  }),
  climb: new ActionTranslationRu({
    root: 'лез', keyVowel: '', defaultForm: 'лезть', imperative: 'лезь',
    conjugationRoots: { now: 'лез', past: 'лез' },
    conjugations: {
      now: { I: 'лезу', you: 'лезешь', you_formal: 'лезете', he: 'лезет', she: 'лезет', it: 'лезет', we: 'лезем', you_plural: 'лезете', you_plural_formal: 'лезете', they: 'лезут' },
      past: { I: 'лез', you: 'лез', he: 'лез', she: 'лезла', it: 'лезло', we: 'лезли', you_formal: 'лезли', you_plural: 'лезли', you_plural_formal: 'лезли', they: 'лезли' }
    }
  }),
  know: new ActionTranslationRu({
    root: 'зна', keyVowel: '', defaultForm: 'знать', imperative: 'знай',
    conjugationRoots: { now: 'зна' },
    conjugations: { now: { I: 'знаю', you: 'знаешь', you_formal: 'знаете', he: 'знает', she: 'знает', it: 'знает', we: 'знаем', you_plural: 'знаете', you_plural_formal: 'знаете', they: 'знают' } }
  }),
  lick: new ActionTranslationRu({
    root: 'поби', keyVowel: '', defaultForm: 'побить', imperative: 'побей',
    conjugationRoots: { now: 'побь', past: 'поби' },
    conjugations: { now: { I: 'побью', you: 'побьёшь', you_formal: 'побьёте', he: 'побьёт', she: 'побьёт', it: 'побьёт', we: 'побьём', you_plural: 'побьёте', you_plural_formal: 'побьёте', they: 'побьют' } }
  }),
  lift: new ActionTranslationRu({
    root: 'подним', keyVowel: 'а', imperative: 'подними',
    conjugationRoots: { now: 'поднима' }
  }),
  disappear: new ActionTranslationRu({
    root: 'исчез', keyVowel: 'а', imperative: 'исчезни',
    conjugationRoots: { now: 'исчеза', past: 'исчез' },
    conjugations: { past: { I: 'исчез', you: 'исчез', he: 'исчез', she: 'исчезла', it: 'исчезло', we: 'исчезли', you_formal: 'исчезли', you_plural: 'исчезли', you_plural_formal: 'исчезли', they: 'исчезли' } }
  }),
  play: new ActionTranslationRu({
    root: 'игр', keyVowel: 'а', imperative: 'играй',
    conjugationRoots: { now: 'игра' }
  }),
  dress: new ActionTranslationRu({
    root: 'одев', keyVowel: 'а', imperative: 'одевай', pastParticiple: 'одет',
    conjugationRoots: { now: 'одева' }
  }),
  // Phase 17: Tom Sawyer vocabulary — adjectives
  long: new AdjectiveTranslation({
    defaultForm: 'длинный',
    forms: { he: 'длинный', she: 'длинная', it: 'длинное', plural: 'длинные', comparative: 'длиннее', superlative: 'самый длинный' }
  }),
  slight: new AdjectiveTranslation({
    defaultForm: 'тихий',
    forms: { he: 'тихий', she: 'тихая', it: 'тихое', plural: 'тихие' }
  }),
  afraid: new AdjectiveTranslation({ defaultForm: 'испуган', forms: { he: 'испуган', she: 'испугана', it: 'испугано' } }),
  young: new AdjectiveTranslation({
    defaultForm: 'молодой',
    forms: { he: 'молодой', she: 'молодая', it: 'молодое', plural: 'молодые', comparative: 'моложе', superlative: 'самый молодой' }
  }),
  new_adj: new AdjectiveTranslation({
    defaultForm: 'новый',
    forms: { he: 'новый', she: 'новая', it: 'новое', plural: 'новые', comparative: 'новее', superlative: 'самый новый' }
  }),
  open_adj: new AdjectiveTranslation({
    defaultForm: 'открытый',
    forms: { he: 'открытый', she: 'открытая', it: 'открытое', plural: 'открытые' }
  }),
  surprised: new AdjectiveTranslation({
    defaultForm: 'удивлённый',
    forms: { he: 'удивлённый', she: 'удивлённая', it: 'удивлённое' }
  }),
  // Phase 17: Tom Sawyer vocabulary — adverbs
  cautiously: new AdverbTranslation('осторожно'),
  round_adv: new AdverbTranslation('кругом'),
  home_adv: new AdverbTranslation('домой'),
  // Phase 17: Tom Sawyer vocabulary — prepositions
  in_loc: new PrepositionTranslation({ defaultForm: 'в', governedCase: 'prepositional' }),
  through_prep: new PrepositionTranslation({ defaultForm: 'через', governedCase: 'accusative' }),
  before_prep: new PrepositionTranslation({ defaultForm: 'перед', governedCase: 'instrumental' }),
  about_prep: new PrepositionTranslation({ defaultForm: 'о', governedCase: 'prepositional' }),
  // Phase 17: existential
  there_exists: new Translation(''),
  // Phase 18: Tom Sawyer Chapter 1 extended vocabulary — nouns
  hand: new ObjectTranslation({
    defaultForm: 'рука', asActor: Word.she, asMany: 'руки',
    asAccusative: 'руку', asGenitive: 'руки', asDative: 'руке',
    asInstrumental: 'рукой', asPrepositional: 'руке'
  }),
  mouth: new ObjectTranslation({
    defaultForm: 'рот', asActor: Word.he, asMany: 'рты',
    asAccusative: 'рот', asGenitive: 'рта', asDative: 'рту',
    asInstrumental: 'ртом', asPrepositional: 'рте'
  }),
  stone: new ObjectTranslation({
    defaultForm: 'камень', asActor: Word.he, asMany: 'камни',
    asAccusative: 'камень', asGenitive: 'камня', asDative: 'камню',
    asInstrumental: 'камнем', asPrepositional: 'камне'
  }),
  bed: new ObjectTranslation({
    defaultForm: 'кровать', asActor: Word.she, asMany: 'кровати',
    asAccusative: 'кровать', asGenitive: 'кровати', asDative: 'кровати',
    asInstrumental: 'кроватью', asPrepositional: 'кровати'
  }),
  closet: new ObjectTranslation({
    defaultForm: 'шкаф', asActor: Word.he, asMany: 'шкафы',
    asAccusative: 'шкаф', asGenitive: 'шкафа', asDative: 'шкафу',
    asInstrumental: 'шкафом', asPrepositional: 'шкафе'
  }),
  garden: new ObjectTranslation({
    defaultForm: 'сад', asActor: Word.he, asMany: 'сады',
    asAccusative: 'сад', asGenitive: 'сада', asDative: 'саду',
    asInstrumental: 'садом', asPrepositional: 'саду'
  }),
  // Phase 18: Tom Sawyer Chapter 1 extended vocabulary — verbs
  stand: new ActionTranslationRu({
    root: 'сто', keyVowel: 'я', defaultForm: 'стоять', imperative: 'стой',
    conjugationRoots: { now: 'стои', past: 'стоя' },
    conjugations: { now: { I: 'стою', they: 'стоят' } }
  }),
  laugh: new ActionTranslationRu({
    root: 'смея', keyVowel: '', defaultForm: 'смеяться', imperative: 'смейся',
    conjugationRoots: { now: 'сме', past: 'смея' },
    conjugations: {
      now: { I: 'смеюсь', you: 'смеёшься', you_formal: 'смеётесь', he: 'смеётся', she: 'смеётся', it: 'смеётся', we: 'смеёмся', you_plural: 'смеётесь', you_plural_formal: 'смеётесь', they: 'смеются' },
      past: { I: 'смеялся', you: 'смеялся', you_formal: 'смеялись', he: 'смеялся', she: 'смеялась', it: 'смеялось', we: 'смеялись', you_plural: 'смеялись', you_plural_formal: 'смеялись', they: 'смеялись' }
    }
  }),
  say: new ActionTranslationRu({
    root: 'говор', keyVowel: 'и', defaultForm: 'говорить', imperative: 'говори',
    conjugationRoots: { now: 'говори', past: 'говори' },
    conjugations: { now: { I: 'говорю', they: 'говорят' } }
  }),
  think: new ActionTranslationRu({
    root: 'дум', keyVowel: 'а', defaultForm: 'думать', imperative: 'думай',
    conjugationRoots: { now: 'дума' }
  }),
  run: new ActionTranslationRu({
    root: 'беж', keyVowel: 'а', defaultForm: 'бежать', imperative: 'беги',
    conjugationRoots: { now: 'бежи', past: 'бежа' },
    conjugations: {
      now: { I: 'бегу', you: 'бежишь', you_formal: 'бежите', he: 'бежит', she: 'бежит', it: 'бежит', we: 'бежим', you_plural: 'бежите', you_plural_formal: 'бежите', they: 'бегут' }
    }
  }),
  hit: new ActionTranslationRu({
    root: 'удар', keyVowel: 'я', defaultForm: 'ударять', imperative: 'ударь',
    conjugationRoots: { now: 'удар', past: 'ударя' },
    conjugations: { now: { I: 'ударяю', you: 'ударяешь', you_formal: 'ударяете', he: 'ударяет', she: 'ударяет', it: 'ударяет', we: 'ударяем', you_plural: 'ударяете', you_plural_formal: 'ударяете', they: 'ударяют' } }
  }),
  throw_action: new ActionTranslationRu({
    root: 'брос', keyVowel: 'а', defaultForm: 'бросать', imperative: 'бросай',
    conjugationRoots: { now: 'броса' }
  }),
  // Phase 18: Tom Sawyer Chapter 1 extended vocabulary — adjectives
  dark: new AdjectiveTranslation({
    defaultForm: 'тёмный',
    forms: { he: 'тёмный', she: 'тёмная', it: 'тёмное', plural: 'тёмные', comparative: 'темнее', superlative: 'самый тёмный' }
  }),
  warm: new AdjectiveTranslation({
    defaultForm: 'тёплый',
    forms: { he: 'тёплый', she: 'тёплая', it: 'тёплое', plural: 'тёплые', comparative: 'теплее', superlative: 'самый тёплый' }
  }),
  quiet: new AdjectiveTranslation({
    defaultForm: 'тихий',
    forms: { he: 'тихий', she: 'тихая', it: 'тихое', plural: 'тихие', comparative: 'тише', superlative: 'самый тихий' }
  }),
  gentle: new AdjectiveTranslation({
    defaultForm: 'нежный',
    forms: { he: 'нежный', she: 'нежная', it: 'нежное', plural: 'нежные', comparative: 'нежнее', superlative: 'самый нежный' }
  }),
  // Phase 18: Tom Sawyer Chapter 1 extended vocabulary — adverbs
  late_adv: new AdverbTranslation('поздно'),
  gently: new AdverbTranslation('нежно'),
  // Phase 18: Tom Sawyer Chapter 1 extended vocabulary — prepositions
  under: new PrepositionTranslation({ defaultForm: 'под', governedCase: 'instrumental' }),
  in_at: new PrepositionTranslation({ defaultForm: 'в', governedCase: 'accusative' }),
  // Phase 19: Faithful Tom Sawyer encoding
  find: new ActionTranslationRu({
    root: 'наход', keyVowel: 'и', defaultForm: 'находить', imperative: 'находи',
    conjugationRoots: { now: 'наход', past: 'находи' },
    conjugations: {
      now: { I: 'нахожу', you: 'находишь', you_formal: 'находите', he: 'находит', she: 'находит', it: 'находит', we: 'находим', you_plural: 'находите', you_plural_formal: 'находите', they: 'находят' }
    }
  }),
  trick: new ObjectTranslation({
    defaultForm: 'трюк', asActor: Word.he, asMany: 'трюки',
    asAccusative: 'трюк', asGenitive: 'трюка', asDative: 'трюку',
    asInstrumental: 'трюком', asPrepositional: 'трюке'
  }),
  torment: new ActionTranslationRu({
    root: 'муч', keyVowel: 'и', defaultForm: 'мучить', imperative: 'мучь',
    conjugationRoots: { now: 'муч', past: 'мучи' },
    conjugations: {
      now: { I: 'мучу', you: 'мучишь', you_formal: 'мучите', he: 'мучит', she: 'мучит', it: 'мучит', we: 'мучим', you_plural: 'мучите', you_plural_formal: 'мучите', they: 'мучат' }
    }
  }),
  off_adv: new AdverbTranslation('прочь'),
  duty: new ObjectTranslation({
    defaultForm: 'долг', asActor: Word.he, asMany: 'долги',
    asAccusative: 'долг', asGenitive: 'долга', asDative: 'долгу',
    asInstrumental: 'долгом', asPrepositional: 'долге'
  })
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
    // Russian preposition alternations: к→ко, в→во, с→со before consonant clusters
    let resolvedPrep = prepForm;
    const firstWord = (pp.object instanceof Entity && pp.object.adjective)
      ? this.translateAdjective(pp.object.adjective, objectWord, pp.object.adjectiveDegree)
      : objectForm;
    if (/^(мн|вс|сн)/.test(firstWord)) {
      if (prepForm === 'к') resolvedPrep = 'ко';
      else if (prepForm === 'в') resolvedPrep = 'во';
      else if (prepForm === 'с') resolvedPrep = 'со';
    }
    if (pp.object instanceof Entity && pp.object.adjective) {
      return `${resolvedPrep} ${firstWord} ${objectForm}`;
    }
    return `${resolvedPrep} ${objectForm}`;
  }

  translatePassiveAction(actor: Word | Actor | Entity, action: Action, time: Word): string {
    const resolvedActor = this.resolveActorForConjugation(actor);
    const translation = this.wordTranslations[action.primary.id] as ActionTranslation;
    const beTranslation = this.wordTranslations['be'] as ActionTranslation;
    const beForm = beTranslation.timeActorForm(time, resolvedActor);
    const participle = translation.opts.pastParticiple || translation.defaultForm;
    const parts = [beForm, participle].filter(Boolean);
    if (action.adverb) {
      const adverbForm = this.translateAdverb(action.adverb);
      parts.push(adverbForm);
    }
    if (action.agent) {
      // Russian passive agent uses instrumental case (no preposition)
      if (action.agent instanceof Entity) {
        const { word, specifier, adjective, possessor } = action.agent;
        parts.push(this.translateObject(word, specifier, { adjective, possessor }));
      } else {
        const agentTranslation = this.wordTranslations[action.agent.id] as ObjectTranslation;
        if (agentTranslation?.['asInstrumental']) {
          parts.push(agentTranslation['asInstrumental'] as string);
        } else {
          parts.push(this.translateWord(action.agent));
        }
      }
    }
    return parts.join(' ');
  }

  translateAspectSentence(actor: Word | Actor, action: Word | Action, time: Word, aspect: Word): string {
    // Russian: progressive maps to simple tense, perfect maps to past tense
    const effectiveTime = (aspect === Word.perfect) ? Word.past : time;
    return [
      this.translateActor(actor),
      this.translateAction(actor, action, effectiveTime)
    ].join(' ').trim();
  }

  translateConditional(actor: Word | Actor | Entity, action: Word | Action): string {
    const primaryAction = action instanceof Action ? action.primary : action;
    const translation = this.wordTranslations[primaryAction.id] as ActionTranslationRu;
    const resolvedActor = this.resolveActorForConjugation(actor);
    const actorForm = this.translateActor(actor);
    const isNegated = action instanceof Action ? action.negated : false;

    // Russian conditional: past tense form + бы
    const pastForm = translation.timeActorForm(Word.past, resolvedActor);
    const rest = this.getActionRest(action);

    if (isNegated) {
      return [actorForm, `не ${pastForm}`, 'бы', rest].filter(Boolean).join(' ').trim();
    }
    return [actorForm, pastForm, 'бы', rest].filter(Boolean).join(' ').trim();
  }

  translateQuestion(question: Question): string {
    const { sentence, questionWord } = question;
    if (questionWord) {
      const qWordForm = this.translateWord(questionWord);
      const statementForm = this.translate(sentence);
      return `${qWordForm} ${statementForm}?`;
    }
    return `${this.translate(sentence)}?`;
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
    if (action instanceof Action && action.prepositionalPhrases.length > 0) {
      const ppForms = action.prepositionalPhrases.map((pp: PrepositionalPhrase) => this.translatePrepositionalPhrase(pp));
      result = `${result} ${ppForms.join(' ')}`;
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

  translateObject(object: Word, specifier: Word | undefined, context?: { isSubject?: boolean; adjective?: Word; adjectiveDegree?: import('./grammar').AdjectiveDegree; possessor?: Word }): string {
    const objectTranslation = this.wordTranslations[object.id] as ObjectTranslation;
    const isAccusative = context?.isSubject === true;
    const objectForm = this.translateWord(object, context);
    const adjectiveForm = context?.adjective ? this.translateAdjective(context.adjective, object, context.adjectiveDegree) : undefined;
    const possessiveForm = context?.possessor ? this.translatePossessive(context.possessor, object, isAccusative) : undefined;

    let nounForm: string;
    if ((specifier === Word.many) && isDefined(objectTranslation.asMany)) {
      nounForm = objectTranslation.asMany as string;
    } else {
      nounForm = objectForm;
    }
    return [possessiveForm, adjectiveForm, nounForm].filter(Boolean).join(' ');
  }

  translateAdjective(adjective: Word, object?: Word, degree?: import('./grammar').AdjectiveDegree): string {
    const translation = this.wordTranslations[adjective.id];
    if (translation instanceof AdjectiveTranslation && translation.forms) {
      if (degree === 'comparative' && translation.forms.comparative) {
        return translation.forms.comparative;
      }
      if (degree === 'superlative' && translation.forms.superlative) {
        return translation.forms.superlative;
      }
      if (object) {
        const objectTranslation = this.wordTranslations[object.id];
        if (objectTranslation instanceof ObjectTranslation && objectTranslation.asActor) {
          const gender = objectTranslation.asActor.id;
          if (translation.forms[gender]) {
            return translation.forms[gender];
          }
        }
      }
    }
    return translation ? translation.defaultForm : adjective.id;
  }

  translateComplement(complement: Word, actor: Word | Actor | Entity, degree?: import('./grammar').AdjectiveDegree): string {
    // Russian complement adjectives agree in gender with the actor
    let genderWord: Word | undefined;
    if (actor instanceof Entity) {
      const actorTranslation = this.wordTranslations[actor.word.id] as ObjectTranslation;
      if (actorTranslation?.asActor) genderWord = actorTranslation.asActor;
    } else {
      genderWord = actor instanceof Actor ? actor.person : actor;
    }
    const translation = this.wordTranslations[complement.id];
    if (translation instanceof AdjectiveTranslation && translation.forms && genderWord) {
      if (degree === 'comparative' && translation.forms.comparative) return translation.forms.comparative;
      if (degree === 'superlative' && translation.forms.superlative) return translation.forms.superlative;
      if (translation.forms[genderWord.id]) return translation.forms[genderWord.id];
    }
    return translation ? translation.defaultForm : complement.id;
  }

  insertAdverb(verbPhrase: string, adverbForm: string): string {
    return `${adverbForm} ${verbPhrase}`;
  }

  insertNegatedAdverb(verbPhrase: string, adverbForm: string): string {
    return `не ${adverbForm} ${verbPhrase}`;
  }
}

export default new Russian(translations);
