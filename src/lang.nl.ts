import { Translation, ObjectTranslation, ActionTranslation, ActionTranslationOpts, AdjectiveTranslation, AdverbTranslation, PrepositionTranslation, Language, WordTranslations } from './lang';
import { Word, Actor, Action, Entity, Question } from './grammar';
import { isDefined } from './util';

const POSSESSIVE_FORMS: Record<string, string> = {
  I: 'mijn', you: 'jouw', you_formal: 'uw',
  he: 'zijn', she: 'haar', it: 'zijn',
  we: 'ons', you_plural: 'jullie', you_plural_formal: 'uw', they: 'hun'
};

class ActionTranslationNl extends ActionTranslation {

  constructor(opts: ActionTranslationOpts) {
    if (!isDefined(opts.defaultForm)) {
      opts.defaultForm = opts.root + 'en';
    }
    if (!isDefined(opts.conjugationRoots)) {
      opts.conjugationRoots = {};
    }
    if (!isDefined(opts.conjugationRoots!['past'])) {
      opts.conjugationRoots!['past'] = `${opts.root}d`;
    }
    opts.futureMatchesNow = true;
    super(opts);
    super.conjugate();
  }

  getPresentForms(): Record<string, string> {
    const base = this.conjugationRoots.now;
    const otherPersonForm = `${base}t`;
    const pluralForm = `${base}en`;

    return {
      I: base,
      you: otherPersonForm,
      you_formal: otherPersonForm,
      he: otherPersonForm,
      she: otherPersonForm,
      it: otherPersonForm,
      we: pluralForm,
      you_plural_formal: pluralForm,
      you_plural: pluralForm,
      they: pluralForm
    };
  }

  getPastForms(): Record<string, string> {
    const base = this.conjugationRoots.past;
    const pluralForm = `${base}en`;

    return {
      I: base,
      you: base,
      you_formal: base,
      he: base,
      she: base,
      it: base,
      we: pluralForm,
      you_plural_formal: pluralForm,
      you_plural: pluralForm,
      they: pluralForm
    };
  }

  getNegatedTimeActorForm(time: Word, actor: Word | Actor): string {
    return `${this.timeActorForm(time, actor)} niet`;
  }

  getNegatedPrimaryTimeActorForm(time: Word, actor: Word | Actor): string {
    return `${this.timeActorForm(time, actor)} niet`;
  }
}

const translations: WordTranslations = {
  sun: new ObjectTranslation({
    defaultForm: 'zon',
    asActor: Word.it
  }),
  sing: new ActionTranslationNl({
    root: 'zing',
    pastParticiple: 'gezongen',
    conjugationRoots: {
      past: 'zong'
    }
  }),
  do: new ActionTranslationNl({
    root: 'do',
    conjugationRoots: {
      now: 'doe',
      past: 'deed'
    },
    conjugations: {
      now: {
        plural: 'doen'
      }
    }
  }),
  go: new ActionTranslationNl({
    root: 'ga',
    defaultForm: 'gaan',
    pastParticiple: 'gegaan',
    conjugationRoots: {
      past: 'ging'
    },
    conjugations: {
      now: {
        other_single: 'gaat',
        plural: 'gaan'
      }
    }
  }),
  sew: new ActionTranslationNl({
    root: 'naai',
    conjugations: {
      past: {
        I: 'naaide',
        other_single: 'naaide'
      }
    }
  }),
  build: new ActionTranslationNl({
    root: 'bouw',
    pastParticiple: 'gebouwd',
    conjugations: {
      past: {
        I: 'bouwde',
        other_single: 'bouwde'
      }
    }
  }),
  give: new ActionTranslationNl({
    root: 'gev',
    conjugationRoots: {
      now: 'geef',
      past: 'gaf'
    },
    conjugations: {
      now: {
        plural: 'geven'
      },
      past: {
        plural: 'gaven'
      }
    }
  }),
  look: new ActionTranslationNl({
    root: 'kijk',
    conjugationRoots: {
      past: 'keek'
    },
    conjugations: {
      past: {
        plural: 'keken'
      }
    }
  }),
  see: new ActionTranslationNl({
    root: 'zie', defaultForm: 'zien',
    pastParticiple: 'gezien',
    conjugationRoots: {
      past: 'zag'
    },
    conjugations: {
      now: {
        plural: 'zien'
      }
    }
  }),
  want: new ActionTranslationNl({
    root: 'wil',
    conjugationRoots: {
      past: 'wilde'
    },
    conjugations: {
      now: {
        he_she_it: 'wil',
        plural: 'willen'
      },
      past: {
        plural: 'wilden'
      }
    }
  }),
  can: new ActionTranslationNl({
    root: 'kan',
    conjugationRoots: {
      past: 'kond'
    },
    conjugations: {
      now: {
        you: 'kunt',
        you_formal: 'kunt',
        he_she_it: 'kan',
        plural: 'kunnen'
      },
      past: {
        I: 'kon',
        other_single: 'kon'
      }
    }
  }),
  shine: new ActionTranslationNl({
    root: 'schijn',
    conjugationRoots: {
      past: 'scheen'
    },
    conjugations: {
      past: {
        plural: 'schenen'
      }
    }
  }),
  be: new ActionTranslationNl({
    root: 'zijn',
    selfNegating: true,
    conjugations: {
      now: {
        I: 'ben',
        you: 'bent', you_formal: 'bent',
        he: 'is', she: 'is', it: 'is',
        we: 'zijn', you_plural: 'zijn', you_plural_formal: 'zijn',
        they: 'zijn'
      },
      past: {
        I: 'was',
        you: 'was', you_formal: 'was',
        he: 'was', she: 'was', it: 'was',
        we: 'waren', you_plural: 'waren', you_plural_formal: 'waren',
        they: 'waren'
      }
    }
  }),
  now: new Translation('nu'),
  future: new Translation('toekomst'),
  past: new Translation('verleden'),
  I: new ObjectTranslation({ defaultForm: 'ik', asActor: Word.I, asSubject: 'mij', asOblique: 'mij' }),
  you: new ObjectTranslation({ defaultForm: 'je', asActor: Word.you, asOblique: 'jou' }),
  you_formal: new Translation('u'),
  he: new ObjectTranslation({ defaultForm: 'hij', asActor: Word.he, asSubject: 'hem', asOblique: 'hem' }),
  she: new ObjectTranslation({ defaultForm: 'zij', asActor: Word.she, asSubject: 'haar', asOblique: 'haar' }),
  it: new Translation('het'),
  we: new ObjectTranslation({ defaultForm: 'we', asActor: Word.we, asSubject: 'ons', asOblique: 'ons' }),
  you_plural: new Translation('jullie'),
  you_plural_formal: new Translation('u'),
  they: new ObjectTranslation({ defaultForm: 'ze', asActor: Word.they, asSubject: 'hen', asOblique: 'hen' }),
  wet_snow_with_mud_and_ground: new Translation('sneeuw'),
  snow_on_tree_branch: new Translation('sneeuw'),
  snow: new ObjectTranslation({
    defaultForm: 'sneeuw',
    asActor: Word.it,
    isCountable: false
  }),
  this: new Translation('dit'),
  that: new Translation('dat'),
  one: new Translation('een'),
  one_of_some_kind: new Translation('een'),
  lake: new ObjectTranslation({
    defaultForm: 'meer',
    asActor: Word.it,
    asSpecificObject: 'het',
    asMany: 'meren'
  }),
  bird: new ObjectTranslation({
    defaultForm: 'vogel',
    asActor: Word.it,
    asMany: 'vogels'
  }),
  wolf: new ObjectTranslation({
    defaultForm: 'wolf',
    asActor: Word.it,
    asMany: 'wolven'
  }),
  house: new ObjectTranslation({
    defaultForm: 'huis',
    asActor: Word.it,
    asSpecificObject: 'het'
  }),
  bright: new AdjectiveTranslation({ defaultForm: 'fel', forms: { attributive: 'felle', comparative: 'fellere', superlative: 'felste' } }),
  old: new AdjectiveTranslation({ defaultForm: 'oud', forms: { attributive: 'oude', comparative: 'oudere', superlative: 'oudste' } }),
  big: new AdjectiveTranslation({ defaultForm: 'groot', forms: { attributive: 'grote', comparative: 'grotere', superlative: 'grootste' } }),
  small: new AdjectiveTranslation({ defaultForm: 'klein', forms: { attributive: 'kleine', comparative: 'kleinere', superlative: 'kleinste' } }),
  good: new AdjectiveTranslation({ defaultForm: 'goed', forms: { attributive: 'goede', comparative: 'betere', superlative: 'beste' } }),
  white: new AdjectiveTranslation({ defaultForm: 'wit', forms: { attributive: 'witte', comparative: 'wittere', superlative: 'witste' } }),
  loudly: new AdverbTranslation('hard'),
  slowly: new AdverbTranslation('langzaam'),
  quickly: new AdverbTranslation('snel'),
  well: new AdverbTranslation('goed'),
  and: new Translation('en'),
  but: new Translation('maar'),
  or: new Translation('of'),
  to: new PrepositionTranslation({ defaultForm: 'naar' }),
  from: new PrepositionTranslation({ defaultForm: 'van' }),
  at: new PrepositionTranslation({ defaultForm: 'naar' }),
  over: new PrepositionTranslation({ defaultForm: 'over' }),
  behind: new PrepositionTranslation({ defaultForm: 'achter' }),
  what: new Translation('wat'),
  who: new Translation('wie'),
  by_agent: new Translation('door'),
  who_rel: new Translation('die'),
  which_rel: new Translation('dat'),
  that_rel: new Translation('die'),
  because: new Translation('omdat'),
  that_conj: new Translation('dat'),
  when_conj: new Translation('wanneer'),
  // Phase 17: Tom Sawyer vocabulary — nouns
  lady: new ObjectTranslation({ defaultForm: 'dame', asActor: Word.she, asMany: 'dames' }),
  room: new ObjectTranslation({ defaultForm: 'kamer', asActor: Word.it, asMany: 'kamers' }),
  door: new ObjectTranslation({ defaultForm: 'deur', asActor: Word.it, asMany: 'deuren' }),
  boy: new ObjectTranslation({ defaultForm: 'jongen', asActor: Word.he, asMany: 'jongens' }),
  fence: new ObjectTranslation({ defaultForm: 'hek', asActor: Word.it, asSpecificObject: 'het', asMany: 'hekken' }),
  cat: new ObjectTranslation({ defaultForm: 'kat', asActor: Word.it, asMany: 'katten' }),
  noise: new ObjectTranslation({ defaultForm: 'geluid', asActor: Word.it, asSpecificObject: 'het', asMany: 'geluiden' }),
  air: new ObjectTranslation({ defaultForm: 'lucht', asActor: Word.it }),
  name_noun: new ObjectTranslation({ defaultForm: 'naam', asActor: Word.it, asMany: 'namen' }),
  lad: new ObjectTranslation({ defaultForm: 'knaap', asActor: Word.he, asMany: 'knapen' }),
  stranger: new ObjectTranslation({ defaultForm: 'vreemdeling', asActor: Word.he, asMany: 'vreemdelingen' }),
  window: new ObjectTranslation({ defaultForm: 'raam', asActor: Word.it, asSpecificObject: 'het', asMany: 'ramen' }),
  clothes: new ObjectTranslation({ defaultForm: 'kleren', asActor: Word.it }),
  switch_noun: new ObjectTranslation({ defaultForm: 'roede', asActor: Word.it, asMany: 'roeden' }),
  time_noun: new ObjectTranslation({ defaultForm: 'tijd', asActor: Word.it }),
  voice: new ObjectTranslation({ defaultForm: 'stem', asActor: Word.it, asMany: 'stemmen' }),
  jam: new ObjectTranslation({ defaultForm: 'jam', asActor: Word.it }),
  summer: new ObjectTranslation({ defaultForm: 'zomer', asActor: Word.it }),
  // Phase 17: Tom Sawyer vocabulary — verbs
  finish: new ActionTranslationNl({ root: 'eindig', conjugationRoots: { past: 'eindigde' }, conjugations: { past: { plural: 'eindigden' } } }),
  shout: new ActionTranslationNl({ root: 'schreeuw', conjugationRoots: { past: 'schreeuwde' }, conjugations: { past: { plural: 'schreeuwden' } } }),
  turn: new ActionTranslationNl({ root: 'draai', conjugationRoots: { past: 'draaide' }, conjugations: { past: { plural: 'draaiden' } } }),
  seize: new ActionTranslationNl({ root: 'grijp', conjugationRoots: { past: 'greep' }, conjugations: { past: { plural: 'grepen' } } }),
  flee: new ActionTranslationNl({ root: 'vlucht', conjugationRoots: { past: 'vluchtte' }, conjugations: { past: { plural: 'vluchtten' } } }),
  hover: new ActionTranslationNl({ root: 'zweef', defaultForm: 'zweven', conjugationRoots: { past: 'zweefde' }, conjugations: { now: { plural: 'zweven' }, past: { plural: 'zweefden' } } }),
  whirl: new ActionTranslationNl({ root: 'draai', conjugationRoots: { past: 'draaide' }, conjugations: { past: { plural: 'draaiden' } } }),
  cry: new ActionTranslationNl({ root: 'huil', conjugationRoots: { past: 'huilde' }, conjugations: { past: { plural: 'huilden' } } }),
  chase: new ActionTranslationNl({ root: 'achtervolg', conjugationRoots: { past: 'achtervolgde' }, conjugations: { past: { plural: 'achtervolgden' } } }),
  climb: new ActionTranslationNl({ root: 'klim', conjugationRoots: { past: 'klom' }, conjugations: { past: { plural: 'klommen' } } }),
  know: new ActionTranslationNl({ root: 'weet', defaultForm: 'weten', conjugationRoots: { past: 'wist' }, conjugations: { now: { other_single: 'weet', plural: 'weten' }, past: { plural: 'wisten' } } }),
  lick: new ActionTranslationNl({ root: 'sla', defaultForm: 'slaan', conjugationRoots: { past: 'sloeg' }, conjugations: { now: { other_single: 'slaat', plural: 'slaan' }, past: { plural: 'sloegen' } } }),
  lift: new ActionTranslationNl({ root: 'til', conjugationRoots: { past: 'tilde' }, conjugations: { past: { plural: 'tilden' } } }),
  disappear: new ActionTranslationNl({ root: 'verdwijn', defaultForm: 'verdwijnen', conjugationRoots: { past: 'verdween' }, conjugations: { now: { plural: 'verdwijnen' }, past: { plural: 'verdwenen' } } }),
  play: new ActionTranslationNl({ root: 'speel', defaultForm: 'spelen', conjugationRoots: { past: 'speelde' }, conjugations: { now: { plural: 'spelen' }, past: { plural: 'speelden' } } }),
  dress: new ActionTranslationNl({ root: 'kleed', defaultForm: 'kleden', pastParticiple: 'gekleed', conjugationRoots: { past: 'kleedde' }, conjugations: { now: { plural: 'kleden' }, past: { plural: 'kleedden' } } }),
  // Phase 17: Tom Sawyer vocabulary — adjectives
  long: new AdjectiveTranslation({ defaultForm: 'lang', forms: { attributive: 'lange', comparative: 'langere', superlative: 'langste' } }),
  slight: new AdjectiveTranslation({ defaultForm: 'zacht', forms: { attributive: 'zachte' } }),
  afraid: new AdjectiveTranslation({ defaultForm: 'bang', forms: { attributive: 'bange' } }),
  young: new AdjectiveTranslation({ defaultForm: 'jong', forms: { attributive: 'jonge', comparative: 'jongere', superlative: 'jongste' } }),
  new_adj: new AdjectiveTranslation({ defaultForm: 'nieuw', forms: { attributive: 'nieuwe', comparative: 'nieuwere', superlative: 'nieuwste' } }),
  open_adj: new AdjectiveTranslation({ defaultForm: 'open', forms: { attributive: 'open' } }),
  surprised: new AdjectiveTranslation({ defaultForm: 'verrast' }),
  // Phase 17: Tom Sawyer vocabulary — adverbs
  cautiously: new AdverbTranslation('voorzichtig'),
  round_adv: new AdverbTranslation('rond'),
  home_adv: new AdverbTranslation('naar huis'),
  // Phase 17: Tom Sawyer vocabulary — prepositions
  in_loc: new PrepositionTranslation({ defaultForm: 'in' }),
  through_prep: new PrepositionTranslation({ defaultForm: 'door' }),
  before_prep: new PrepositionTranslation({ defaultForm: 'voor' }),
  about_prep: new PrepositionTranslation({ defaultForm: 'over' }),
  // Phase 17: existential
  there_exists: new Translation('er'),
  // Phase 18: Tom Sawyer Chapter 1 extended vocabulary — nouns
  hand: new ObjectTranslation({ defaultForm: 'hand', asActor: Word.it, asMany: 'handen' }),
  mouth: new ObjectTranslation({ defaultForm: 'mond', asActor: Word.it, asMany: 'monden' }),
  stone: new ObjectTranslation({ defaultForm: 'steen', asActor: Word.it, asMany: 'stenen' }),
  bed: new ObjectTranslation({ defaultForm: 'bed', asActor: Word.it, asSpecificObject: 'het', asMany: 'bedden' }),
  closet: new ObjectTranslation({ defaultForm: 'kast', asActor: Word.it, asMany: 'kasten' }),
  garden: new ObjectTranslation({ defaultForm: 'tuin', asActor: Word.it, asMany: 'tuinen' }),
  // Phase 18: Tom Sawyer Chapter 1 extended vocabulary — verbs
  stand: new ActionTranslationNl({ root: 'sta', defaultForm: 'staan', conjugationRoots: { past: 'stond' },
    conjugations: { now: { other_single: 'staat', plural: 'staan' }, past: { plural: 'stonden' } } }),
  laugh: new ActionTranslationNl({ root: 'lach', conjugationRoots: { past: 'lachte' },
    conjugations: { past: { plural: 'lachten' } } }),
  say: new ActionTranslationNl({ root: 'zeg', conjugationRoots: { past: 'zei' },
    conjugations: { now: { plural: 'zeggen' }, past: { plural: 'zeiden' } } }),
  think: new ActionTranslationNl({ root: 'denk', conjugationRoots: { past: 'dacht' },
    conjugations: { past: { plural: 'dachten' } } }),
  run: new ActionTranslationNl({ root: 'ren', defaultForm: 'rennen', conjugationRoots: { past: 'rende' },
    conjugations: { past: { plural: 'renden' } } }),
  hit: new ActionTranslationNl({ root: 'raak', conjugationRoots: { past: 'raakte' },
    conjugations: { past: { plural: 'raakten' } } }),
  throw_action: new ActionTranslationNl({ root: 'gooi', conjugationRoots: { past: 'gooide' },
    conjugations: { past: { plural: 'gooiden' } } }),
  // Phase 18: Tom Sawyer Chapter 1 extended vocabulary — adjectives
  dark: new AdjectiveTranslation({ defaultForm: 'donker', forms: { attributive: 'donkere', comparative: 'donkerder', superlative: 'donkerste' } }),
  warm: new AdjectiveTranslation({ defaultForm: 'warm', forms: { attributive: 'warme', comparative: 'warmer', superlative: 'warmste' } }),
  quiet: new AdjectiveTranslation({ defaultForm: 'stil', forms: { attributive: 'stille', comparative: 'stiller', superlative: 'stilste' } }),
  gentle: new AdjectiveTranslation({ defaultForm: 'zacht', forms: { attributive: 'zachte', comparative: 'zachter', superlative: 'zachtste' } }),
  // Phase 18: Tom Sawyer Chapter 1 extended vocabulary — adverbs
  late_adv: new AdverbTranslation('laat'),
  gently: new AdverbTranslation('zachtjes'),
  // Phase 18: Tom Sawyer Chapter 1 extended vocabulary — prepositions
  under: new PrepositionTranslation({ defaultForm: 'onder' }),
  in_at: new PrepositionTranslation({ defaultForm: 'door' }),
  // Phase 19: Faithful Tom Sawyer encoding
  find: new ActionTranslationNl({
    root: 'vind',
    conjugationRoots: { past: 'vond' },
    conjugations: { past: { plural: 'vonden' } }
  }),
  trick: new ObjectTranslation({ defaultForm: 'streek', asActor: Word.it, asSpecificObject: 'de', asMany: 'streken' }),
  torment: new ActionTranslationNl({
    root: 'kwel',
    defaultForm: 'kwellen',
    conjugationRoots: { past: 'kwelde' },
    conjugations: { past: { plural: 'kwelden' } }
  }),
  off_adv: new AdverbTranslation('weg'),
  duty: new ObjectTranslation({ defaultForm: 'plicht', asActor: Word.it, asSpecificObject: 'de', asMany: 'plichten' }),
  traitor: new ObjectTranslation({ defaultForm: 'verrader', asActor: Word.he, asMany: 'verraders' }),
  large: new AdjectiveTranslation({ defaultForm: 'groot', forms: { attributive: 'grote', comparative: 'grotere', superlative: 'grootste' } }),
  pull: new ActionTranslationNl({ root: 'trek', defaultForm: 'trekken', conjugationRoots: { past: 'trok' }, conjugations: { past: { plural: 'trokken' } } }),
  spectacles: new ObjectTranslation({ defaultForm: 'bril', asActor: Word.he }),
  down_adv: new AdverbTranslation('omlaag'),
  around_prep: new PrepositionTranslation({ defaultForm: 'door' })
};

//TODO: Create a separate class ObjectTranslationNl and move most of the logic now in the language class to their: mode modular and object-oriented
//TODO: Define the proper articles for all ObjectTranslation for Dutch
class Dutch extends Language {

  constructor(translations: WordTranslations) {
    super('Dutch', translations);
  }

  //TODO: Do we need a separate method 'getArticleForObject'?
  getArticleForObject(_object: Word): string {
    //TODO: Implement getting the actual article, should depend also on the specifier, merge with getArticle method
    return 'de';
  }

  getArticle(specifier: Word | undefined, objectTranslation: ObjectTranslation): string {
    const wordThis = (Word as unknown as Record<string, Word>)['this'];
    if (specifier === wordThis || specifier === Word.that) {
      return isDefined(objectTranslation.asSpecificObject) ? objectTranslation.asSpecificObject as string : 'de';
    }
    if (specifier === Word.one) {
      return objectTranslation.isCountable ? 'een' : '';
    }
    return '';
  }

  private getHebbenForm(time: Word, actor: Word | Actor): string {
    const personId = actor instanceof Actor ? actor.person.id : actor.id;
    if (time === Word.past) {
      return ['we', 'you_plural', 'you_plural_formal', 'they'].includes(personId) ? 'hadden' : 'had';
    }
    if (['he', 'she', 'it'].includes(personId)) return 'heeft';
    if (['we', 'you_plural', 'you_plural_formal', 'they'].includes(personId)) return 'hebben';
    if (personId === 'you' || personId === 'you_formal') return 'hebt';
    return 'heb';
  }

  translateAspectSentence(actor: Word | Actor | Entity, action: Word | Action, time: Word, aspect: Word): string {
    const primaryAction = action instanceof Action ? action.primary : action;
    const translation = this.wordTranslations[primaryAction.id] as ActionTranslation;
    const resolvedActor = this.resolveActorForConjugation(actor);
    const actorForm = this.translateActor(actor);
    const rest = this.getActionRest(action);

    if (aspect === Word.progressive) {
      // Dutch: zijn(conjugated) + "aan het" + infinitive
      const beTranslation = this.wordTranslations['be'] as ActionTranslation;
      const beForm = beTranslation.timeActorForm(time, resolvedActor);
      const infinitive = translation.defaultForm;
      return [actorForm, beForm, 'aan het', infinitive, rest].filter(Boolean).join(' ').trim();
    }

    if (aspect === Word.perfect) {
      const hebbenForm = this.getHebbenForm(time, resolvedActor);
      const participle = translation.opts.pastParticiple || `ge${translation.defaultForm}d`;
      return [actorForm, hebbenForm, participle, rest].filter(Boolean).join(' ').trim();
    }

    return super.translateAspectSentence(actor, action, time, aspect);
  }

  translateConditional(actor: Word | Actor | Entity, action: Word | Action): string {
    const primaryAction = action instanceof Action ? action.primary : action;
    const translation = this.wordTranslations[primaryAction.id] as ActionTranslation;
    const resolvedActor = this.resolveActorForConjugation(actor);
    const personId = resolvedActor instanceof Actor ? resolvedActor.person.id : (resolvedActor as Word).id;
    const actorForm = this.translateActor(actor);
    const isNegated = action instanceof Action ? action.negated : false;

    const pluralPersons = ['we', 'you_plural', 'you_plural_formal', 'they'];
    const zouForm = pluralPersons.includes(personId) ? 'zouden' : 'zou';
    const verbForm = translation?.defaultForm || this.translateWord(primaryAction);
    const rest = this.getActionRest(action);

    if (isNegated) {
      return [actorForm, zouForm, verbForm, 'niet', rest].filter(Boolean).join(' ').trim();
    }
    return [actorForm, zouForm, verbForm, rest].filter(Boolean).join(' ').trim();
  }

  translateQuestion(question: Question): string {
    const { sentence, questionWord } = question;
    const { actor, action, time } = sentence;

    const primaryAction = action instanceof Action ? action.primary : action;
    const translation = this.wordTranslations[primaryAction.id] as ActionTranslation;
    const resolvedActor = this.resolveActorForConjugation(actor);
    const actorForm = this.translateActor(actor);
    const rest = this.getActionRest(action);

    let verbForm = translation.timeActorForm(time, resolvedActor);

    // 2nd person singular: drop -t in inversion
    const personId = resolvedActor instanceof Actor ? resolvedActor.person.id : (resolvedActor as Word).id;
    if (personId === 'you' && verbForm.endsWith('t')) {
      verbForm = verbForm.slice(0, -1);
    }

    if (questionWord) {
      const qWordForm = this.translateWord(questionWord);
      return [qWordForm, verbForm, actorForm, rest].filter(Boolean).join(' ').trim() + '?';
    }

    return [verbForm, actorForm, rest].filter(Boolean).join(' ').trim() + '?';
  }

  translateImperative(action: Word | Action, _actor: Word | Actor | Entity): string {
    const primaryAction = action instanceof Action ? action.primary : action;
    const isNegated = action instanceof Action ? action.negated : false;
    const actionSubject = action instanceof Action ? action.subject : undefined;
    const translation = this.wordTranslations[primaryAction.id] as ActionTranslation;
    // Dutch imperative is the I-form (stem) from present tense
    const form = translation?.timeActorForm(Word.now, Word.I) || this.translateWord(primaryAction);
    let result = isNegated ? `${form} niet` : form;
    if (actionSubject) {
      result = `${result} ${this.translateActionSubject(actionSubject)}`;
    }
    if (action instanceof Action && action.prepositionalPhrases.length > 0) {
      const ppForms = action.prepositionalPhrases.map(pp => this.translatePrepositionalPhrase(pp));
      result = `${result} ${ppForms.join(' ')}`;
    }
    return result;
  }

  translatePossessive(possessor: Word, object?: Word): string {
    const form = POSSESSIVE_FORMS[possessor.id] || possessor.id;
    // "ons" is only for het-words; de-words use "onze"
    if (form === 'ons' && object) {
      const objectTranslation = this.wordTranslations[object.id];
      if (objectTranslation instanceof ObjectTranslation && objectTranslation.asSpecificObject !== 'het') {
        return 'onze';
      }
    }
    return form;
  }

  translateObject(object: Word, specifier: Word | undefined, context?: { isSubject?: boolean; adjective?: Word; adjectiveDegree?: import('./grammar').AdjectiveDegree; possessor?: Word }): string {
    const objectTranslation = this.wordTranslations[object.id] as ObjectTranslation;
    const objectForm = this.translateWord(object, context);
    let adjectiveForm = context?.adjective ? this.translateAdjective(context.adjective, object, context.adjectiveDegree) : undefined;

    // Dutch grammar: indefinite neuter nouns use base adjective form, not attributive
    // e.g., "een zacht geluid" (correct) not "een zachte geluid"
    if (adjectiveForm && specifier === Word.one && objectTranslation.asSpecificObject === 'het') {
      const adjTranslation = this.wordTranslations[context!.adjective!.id];
      if (adjTranslation instanceof AdjectiveTranslation) {
        adjectiveForm = adjTranslation.defaultForm;
      }
    }
    const possessiveForm = context?.possessor ? this.translatePossessive(context.possessor, object) : undefined;

    // Possessive replaces article
    if (possessiveForm) {
      if (specifier === Word.many) {
        const nounForm = isDefined(objectTranslation.asMany) ? objectTranslation.asMany as string : `${objectForm}en`;
        return [possessiveForm, adjectiveForm, nounForm].filter(Boolean).join(' ');
      }
      return [possessiveForm, adjectiveForm, objectForm].filter(Boolean).join(' ');
    }

    if (specifier !== Word.many) {
      return [this.getArticle(specifier, objectTranslation), adjectiveForm, objectForm].filter(s => s !== '' && s !== undefined).join(' ').trim();
    } else {
      const nounForm = isDefined(objectTranslation.asMany) ? objectTranslation.asMany as string : `${objectForm}en`;
      return adjectiveForm ? `${adjectiveForm} ${nounForm}` : nounForm;
    }
  }

  translateAdjective(adjective: Word, _object?: Word, degree?: import('./grammar').AdjectiveDegree): string {
    const translation = this.wordTranslations[adjective.id];
    if (translation instanceof AdjectiveTranslation && translation.forms) {
      if (degree === 'comparative' && translation.forms.comparative) {
        return translation.forms.comparative;
      }
      if (degree === 'superlative' && translation.forms.superlative) {
        return translation.forms.superlative;
      }
      if (translation.forms.attributive) {
        return translation.forms.attributive;
      }
    }
    return translation ? translation.defaultForm : adjective.id;
  }

  translateComplement(complement: Word, _actor: Word | import('./grammar').Actor | import('./grammar').Entity, degree?: import('./grammar').AdjectiveDegree): string {
    // Predicate adjectives use base form in Dutch, not attributive
    const translation = this.wordTranslations[complement.id];
    if (translation instanceof AdjectiveTranslation) {
      if (degree === 'comparative' && translation.forms?.comparative) {
        // Predicative comparative: strip attributive -e suffix (grotere → groter)
        const comp = translation.forms.comparative;
        return comp.endsWith('ere') ? comp.slice(0, -1) : comp;
      }
      if (degree === 'superlative' && translation.forms?.superlative) return translation.forms.superlative;
      return translation.defaultForm;
    }
    return translation ? translation.defaultForm : complement.id;
  }

  insertNegatedAdverb(verbPhrase: string, adverbForm: string): string {
    return `${verbPhrase} niet ${adverbForm}`;
  }

  translateActor(actor: Word | import('./grammar').Actor | import('./grammar').Entity): string {
    if (actor instanceof Entity) {
      return super.translateActor(actor);
    }
    return this.isActualPerson(actor) ? super.translateActor(actor) : `${this.getArticleForObject(actor as Word)} ${super.translateActor(actor)}`;
  }
}

export default new Dutch(translations);
