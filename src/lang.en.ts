import { Translation, ObjectTranslation, ActionTranslation, ActionTranslationOpts, AdjectiveTranslation, AdverbTranslation, PrepositionTranslation, Language, WordTranslations } from './lang';
import { Word, Actor, Action, Entity, Question } from './grammar';
import { isDefined, extend } from './util';

const THIRD_PERSON_SINGULAR = ['he', 'she', 'it'];

const POSSESSIVE_FORMS: Record<string, string> = {
  I: 'my', you: 'your', you_formal: 'your',
  he: 'his', she: 'her', it: 'its',
  we: 'our', you_plural: 'your', you_plural_formal: 'your', they: 'their'
};

class ActionTranslationEn extends ActionTranslation {

  constructor(opts: ActionTranslationOpts) {
    opts.defaultForm = opts.root;
    super(opts);
    this.opts.dependentActionConnector = isDefined(this.opts.dependentActionConnector) ?
      this.opts.dependentActionConnector : 'to';
    super.conjugate();
  }

  getPresentForms(): Record<string, string> {
    return extend(this.forAllPersons(this.defaultForm), {
      he: this.defaultForm + 's',
      she: this.defaultForm + 's',
      it: this.defaultForm + 's'
    }) as Record<string, string>;
  }

  getFutureForms(): Record<string, string> {
    return this.forAllPersons(`will ${this.defaultForm}`);
  }

  getPastForms(): Record<string, string> {
    return this.forAllPersons(`${this.defaultForm}ed`);
  }

  asPrimaryTimeActorForm(time: Word, actor: Word | Actor): string {
    return `${this.timeActorForm(time, actor)} ${this.opts.dependentActionConnector}`.trim();
  }

  private getPersonId(actor: Word | Actor): string {
    return actor instanceof Actor ? actor.person.id : actor.id;
  }

  getNegatedTimeActorForm(time: Word, actor: Word | Actor): string {
    if (this.opts.selfNegating) {
      if (time === Word.future) return `will not ${this.defaultForm}`;
      return `${this.timeActorForm(time, actor)} not`;
    }
    const personId = this.getPersonId(actor);
    if (time === Word.future) return `will not ${this.defaultForm}`;
    if (time === Word.past) return `did not ${this.defaultForm}`;
    const doForm = THIRD_PERSON_SINGULAR.includes(personId) ? 'does' : 'do';
    return `${doForm} not ${this.defaultForm}`;
  }

  getNegatedPrimaryTimeActorForm(time: Word, actor: Word | Actor): string {
    if (this.opts.selfNegating) {
      if (time === Word.future) {
        const connector = this.opts.dependentActionConnector || '';
        return `will not ${this.defaultForm} ${connector}`.trim();
      }
      const negated = `${this.timeActorForm(time, actor)} not`;
      const connector = this.opts.dependentActionConnector || '';
      return connector ? `${negated} ${connector}` : negated;
    }
    const personId = this.getPersonId(actor);
    const connector = isDefined(this.opts.dependentActionConnector) ? this.opts.dependentActionConnector : 'to';
    if (time === Word.future) return `will not ${this.defaultForm} ${connector}`.trim();
    if (time === Word.past) return `did not ${this.defaultForm} ${connector}`.trim();
    const doForm = THIRD_PERSON_SINGULAR.includes(personId) ? 'does' : 'do';
    return `${doForm} not ${this.defaultForm} ${connector}`.trim();
  }
}

const translations: WordTranslations = {
  sun: new ObjectTranslation({
    defaultForm: 'sun',
    asActor: Word.it
  }),
  sing: new ActionTranslationEn({
    root: 'sing',
    presentParticiple: 'singing',
    pastParticiple: 'sung',
    conjugations: {
      past: 'sang'
    }
  }),
  do: new ActionTranslationEn({
    root: 'do',
    presentParticiple: 'doing',
    pastParticiple: 'done',
    conjugations: {
      now: {
        he_she_it: 'does'
      },
      past: 'did'
    }
  }),
  sew: new ActionTranslationEn({
    root: 'sew',
    pastParticiple: 'sewn'
  }),
  go: new ActionTranslationEn({
    root: 'go',
    presentParticiple: 'going',
    pastParticiple: 'gone',
    conjugations: {
      now: {
        he_she_it: 'goes'
      },
      past: 'went'
    }
  }),
  build: new ActionTranslationEn({
    root: 'build',
    pastParticiple: 'built',
    conjugations: {
      past: 'built'
    }
  }),
  give: new ActionTranslationEn({
    root: 'give',
    presentParticiple: 'giving',
    pastParticiple: 'given',
    conjugations: {
      past: 'gave'
    }
  }),
  look: new ActionTranslationEn({
    root: 'look'
  }),
  see: new ActionTranslationEn({
    root: 'see',
    pastParticiple: 'seen',
    conjugations: {
      past: 'saw'
    }
  }),
  want: new ActionTranslationEn({
    root: 'want'
  }),
  can: new ActionTranslationEn({
    root: 'can',
    dependentActionConnector: '',
    selfNegating: true,
    conjugations: {
      now: 'can',
      future: 'can',
      past: 'could'
    }
  }),
  shine: new ActionTranslationEn({
    root: 'shine',
    presentParticiple: 'shining',
    pastParticiple: 'shone',
    conjugations: {
      past: 'shone'
    }
  }),
  be: new ActionTranslationEn({
    root: 'be',
    selfNegating: true,
    presentParticiple: 'being',
    pastParticiple: 'been',
    conjugations: {
      now: {
        I: 'am',
        you: 'are', you_formal: 'are',
        he: 'is', she: 'is', it: 'is',
        we: 'are', you_plural: 'are', you_plural_formal: 'are', they: 'are'
      },
      past: {
        I: 'was',
        you: 'were', you_formal: 'were',
        he: 'was', she: 'was', it: 'was',
        we: 'were', you_plural: 'were', you_plural_formal: 'were', they: 'were'
      },
      future: 'will be'
    }
  }),
  now: new Translation('now'),
  future: new Translation('future'),
  past: new Translation('past'),
  I: new ObjectTranslation({ defaultForm: 'I', asActor: Word.I, asSubject: 'me', asOblique: 'me' }),
  you: new Translation('you'),
  you_formal: new Translation('you'),
  he: new ObjectTranslation({ defaultForm: 'he', asActor: Word.he, asSubject: 'him', asOblique: 'him' }),
  she: new ObjectTranslation({ defaultForm: 'she', asActor: Word.she, asSubject: 'her', asOblique: 'her' }),
  it: new Translation('it'),
  we: new ObjectTranslation({ defaultForm: 'we', asActor: Word.we, asSubject: 'us', asOblique: 'us' }),
  you_plural: new Translation('you'),
  you_plural_formal: new Translation('you'),
  they: new ObjectTranslation({ defaultForm: 'they', asActor: Word.they, asSubject: 'them', asOblique: 'them' }),
  wet_snow_with_mud_and_ground: new ObjectTranslation({
    defaultForm: 'snow',
    asActor: Word.it,
    isCountable: false
  }),
  snow_on_tree_branch: new ObjectTranslation({
    defaultForm: 'snow',
    asActor: Word.it,
    isCountable: false
  }),
  snow: new ObjectTranslation({
    defaultForm: 'snow',
    asActor: Word.it,
    isCountable: false
  }),
  this: new Translation('this'),
  that: new Translation('that'),
  one: new Translation('one'),
  one_of_some_kind: new Translation('a'),
  lake: new ObjectTranslation({
    defaultForm: 'lake',
    asActor: Word.it
  }),
  bird: new ObjectTranslation({
    defaultForm: 'bird',
    asActor: Word.it
  }),
  wolf: new ObjectTranslation({
    defaultForm: 'wolf',
    asActor: Word.it,
    asMany: 'wolves'
  }),
  house: new ObjectTranslation({
    defaultForm: 'house',
    asActor: Word.it
  }),
  bright: new AdjectiveTranslation({ defaultForm: 'bright', forms: { comparative: 'brighter', superlative: 'brightest' } }),
  old: new AdjectiveTranslation({ defaultForm: 'old', forms: { comparative: 'older', superlative: 'oldest' } }),
  big: new AdjectiveTranslation({ defaultForm: 'big', forms: { comparative: 'bigger', superlative: 'biggest' } }),
  small: new AdjectiveTranslation({ defaultForm: 'small', forms: { comparative: 'smaller', superlative: 'smallest' } }),
  good: new AdjectiveTranslation({ defaultForm: 'good', forms: { comparative: 'better', superlative: 'best' } }),
  white: new AdjectiveTranslation({ defaultForm: 'white', forms: { comparative: 'whiter', superlative: 'whitest' } }),
  loudly: new AdverbTranslation('loudly'),
  slowly: new AdverbTranslation('slowly'),
  quickly: new AdverbTranslation('quickly'),
  well: new AdverbTranslation('well'),
  and: new Translation('and'),
  but: new Translation('but'),
  or: new Translation('or'),
  to: new PrepositionTranslation({ defaultForm: 'to' }),
  from: new PrepositionTranslation({ defaultForm: 'from' }),
  at: new PrepositionTranslation({ defaultForm: 'at' }),
  over: new PrepositionTranslation({ defaultForm: 'over' }),
  behind: new PrepositionTranslation({ defaultForm: 'behind' }),
  what: new Translation('what'),
  who: new Translation('who'),
  by_agent: new PrepositionTranslation({ defaultForm: 'by' }),
  who_rel: new Translation('who'),
  which_rel: new Translation('which'),
  that_rel: new Translation('that'),
  because: new Translation('because'),
  that_conj: new Translation('that'),
  when_conj: new Translation('when'),
  // Phase 17: Tom Sawyer vocabulary — nouns
  lady: new ObjectTranslation({ defaultForm: 'lady', asActor: Word.she, asMany: 'ladies' }),
  room: new ObjectTranslation({ defaultForm: 'room', asActor: Word.it }),
  door: new ObjectTranslation({ defaultForm: 'door', asActor: Word.it }),
  boy: new ObjectTranslation({ defaultForm: 'boy', asActor: Word.he }),
  fence: new ObjectTranslation({ defaultForm: 'fence', asActor: Word.it }),
  cat: new ObjectTranslation({ defaultForm: 'cat', asActor: Word.it }),
  noise: new ObjectTranslation({ defaultForm: 'noise', asActor: Word.it }),
  air: new ObjectTranslation({ defaultForm: 'air', asActor: Word.it, isCountable: false }),
  name_noun: new ObjectTranslation({ defaultForm: 'name', asActor: Word.it }),
  lad: new ObjectTranslation({ defaultForm: 'lad', asActor: Word.he }),
  stranger: new ObjectTranslation({ defaultForm: 'stranger', asActor: Word.he }),
  window: new ObjectTranslation({ defaultForm: 'window', asActor: Word.it }),
  clothes: new ObjectTranslation({ defaultForm: 'clothes', asActor: Word.it, isCountable: false }),
  switch_noun: new ObjectTranslation({ defaultForm: 'switch', asActor: Word.it }),
  time_noun: new ObjectTranslation({ defaultForm: 'time', asActor: Word.it }),
  voice: new ObjectTranslation({ defaultForm: 'voice', asActor: Word.it }),
  jam: new ObjectTranslation({ defaultForm: 'jam', asActor: Word.it, isCountable: false }),
  summer: new ObjectTranslation({ defaultForm: 'summer', asActor: Word.it, isCountable: false }),
  // Phase 17: Tom Sawyer vocabulary — verbs
  finish: new ActionTranslationEn({ root: 'finish', conjugations: { now: { he_she_it: 'finishes' } } }),
  shout: new ActionTranslationEn({ root: 'shout' }),
  turn: new ActionTranslationEn({ root: 'turn' }),
  seize: new ActionTranslationEn({ root: 'seize', presentParticiple: 'seizing', conjugations: { past: 'seized' } }),
  flee: new ActionTranslationEn({ root: 'flee', presentParticiple: 'fleeing', pastParticiple: 'fled', conjugations: { past: 'fled' } }),
  hover: new ActionTranslationEn({ root: 'hover' }),
  whirl: new ActionTranslationEn({ root: 'whirl' }),
  cry: new ActionTranslationEn({ root: 'cry', presentParticiple: 'crying', conjugations: { now: { he_she_it: 'cries' }, past: 'cried' } }),
  chase: new ActionTranslationEn({ root: 'chase', presentParticiple: 'chasing', conjugations: { past: 'chased' } }),
  climb: new ActionTranslationEn({ root: 'climb' }),
  know: new ActionTranslationEn({ root: 'know', pastParticiple: 'known', conjugations: { past: 'knew' } }),
  lick: new ActionTranslationEn({ root: 'lick' }),
  lift: new ActionTranslationEn({ root: 'lift' }),
  disappear: new ActionTranslationEn({ root: 'disappear' }),
  play: new ActionTranslationEn({ root: 'play' }),
  dress: new ActionTranslationEn({ root: 'dress', pastParticiple: 'dressed', conjugations: { now: { he_she_it: 'dresses' } } }),
  // Phase 17: Tom Sawyer vocabulary — adjectives
  long: new AdjectiveTranslation({ defaultForm: 'long', forms: { comparative: 'longer', superlative: 'longest' } }),
  slight: new AdjectiveTranslation({ defaultForm: 'slight' }),
  afraid: new AdjectiveTranslation({ defaultForm: 'afraid' }),
  young: new AdjectiveTranslation({ defaultForm: 'young', forms: { comparative: 'younger', superlative: 'youngest' } }),
  new_adj: new AdjectiveTranslation({ defaultForm: 'new', forms: { comparative: 'newer', superlative: 'newest' } }),
  open_adj: new AdjectiveTranslation({ defaultForm: 'open' }),
  surprised: new AdjectiveTranslation({ defaultForm: 'surprised' }),
  // Phase 17: Tom Sawyer vocabulary — adverbs
  cautiously: new AdverbTranslation('cautiously'),
  round_adv: new AdverbTranslation('round'),
  home_adv: new AdverbTranslation('home'),
  // Phase 17: Tom Sawyer vocabulary — prepositions
  in_loc: new PrepositionTranslation({ defaultForm: 'in' }),
  through_prep: new PrepositionTranslation({ defaultForm: 'through' }),
  before_prep: new PrepositionTranslation({ defaultForm: 'before' }),
  about_prep: new PrepositionTranslation({ defaultForm: 'about' }),
  // Phase 17: existential
  there_exists: new Translation('there')
};

class English extends Language {

  constructor(translations: WordTranslations) {
    super('English', translations);
  }

  getArticle(specifier: Word | undefined, objectTranslation: ObjectTranslation): string | undefined {
    const wordThis = (Word as unknown as Record<string, Word>)['this'];
    if (specifier === wordThis || specifier === Word.that) {
      return 'the';
    }
    if ((specifier === Word.one) && objectTranslation.isCountable) {
      return 'a';
    }
    return undefined;
  }

  translateImperative(action: Word | Action, _actor: Word | Actor): string {
    const primaryAction = action instanceof Action ? action.primary : action;
    const isNegated = action instanceof Action ? action.negated : false;
    const actionSubject = action instanceof Action ? action.subject : undefined;
    const translation = this.wordTranslations[primaryAction.id] as ActionTranslation;
    const form = translation?.defaultForm || this.translateWord(primaryAction);
    let result = isNegated ? `do not ${form}` : form;
    if (actionSubject) {
      result = `${result} ${this.translateActionSubject(actionSubject)}`;
    }
    if (action instanceof Action && action.prepositionalPhrases.length > 0) {
      const ppForms = action.prepositionalPhrases.map(pp => this.translatePrepositionalPhrase(pp));
      result = `${result} ${ppForms.join(' ')}`;
    }
    return result;
  }

  translatePossessive(possessor: Word): string {
    return POSSESSIVE_FORMS[possessor.id] || possessor.id;
  }

  private getHaveForm(time: Word, actor: Word | Actor): string {
    const personId = actor instanceof Actor ? actor.person.id : actor.id;
    if (time === Word.future) return 'will have';
    if (time === Word.past) return 'had';
    return THIRD_PERSON_SINGULAR.includes(personId) ? 'has' : 'have';
  }

  translateAspectSentence(actor: Word | Actor, action: Word | Action, time: Word, aspect: Word): string {
    const primaryAction = action instanceof Action ? action.primary : action;
    const translation = this.wordTranslations[primaryAction.id] as ActionTranslation;
    const resolvedActor = this.resolveActorForConjugation(actor);
    const actorForm = this.translateActor(actor);
    const rest = this.getActionRest(action);

    if (aspect === Word.progressive) {
      const beTranslation = this.wordTranslations['be'] as ActionTranslation;
      const beForm = beTranslation.timeActorForm(time, resolvedActor);
      const participle = translation.opts.presentParticiple || (translation.defaultForm + 'ing');
      return [actorForm, beForm, participle, rest].filter(Boolean).join(' ').trim();
    }

    if (aspect === Word.perfect) {
      const haveForm = this.getHaveForm(time, resolvedActor);
      const participle = translation.opts.pastParticiple || (translation.defaultForm + 'ed');
      return [actorForm, haveForm, participle, rest].filter(Boolean).join(' ').trim();
    }

    return super.translateAspectSentence(actor, action, time, aspect);
  }

  translateConditional(actor: Word | Actor | Entity, action: Word | Action): string {
    const primaryAction = action instanceof Action ? action.primary : action;
    const translation = this.wordTranslations[primaryAction.id] as ActionTranslation;
    const actorForm = this.translateActor(actor);
    const isNegated = action instanceof Action ? action.negated : false;
    const verbForm = translation?.defaultForm || this.translateWord(primaryAction);
    const rest = this.getActionRest(action);
    const wouldForm = isNegated ? 'would not' : 'would';
    return [actorForm, wouldForm, verbForm, rest].filter(Boolean).join(' ').trim();
  }

  translateQuestion(question: Question): string {
    const { sentence, questionWord } = question;
    const { actor, action, time } = sentence;

    const primaryAction = action instanceof Action ? action.primary : action;
    const translation = this.wordTranslations[primaryAction.id] as ActionTranslation;
    const resolvedActor = this.resolveActorForConjugation(actor);
    const actorForm = this.translateActor(actor);
    const rest = this.getActionRest(action);
    const selfNegating = translation?.opts?.selfNegating;

    if (questionWord) {
      const qWordForm = this.translateWord(questionWord);
      if (selfNegating) {
        const verbForm = translation.timeActorForm(time, resolvedActor);
        return [qWordForm, verbForm, actorForm, rest].filter(Boolean).join(' ').trim() + '?';
      }
      if (time === Word.future) {
        return [qWordForm, 'will', actorForm, translation.defaultForm, rest].filter(Boolean).join(' ').trim() + '?';
      }
      if (time === Word.past) {
        return [qWordForm, 'did', actorForm, translation.defaultForm, rest].filter(Boolean).join(' ').trim() + '?';
      }
      const personId = resolvedActor instanceof Actor ? resolvedActor.person.id : (resolvedActor as Word).id;
      const doForm = THIRD_PERSON_SINGULAR.includes(personId) ? 'does' : 'do';
      return [qWordForm, doForm, actorForm, translation.defaultForm, rest].filter(Boolean).join(' ').trim() + '?';
    }

    // Yes/no question
    if (selfNegating) {
      const verbForm = translation.timeActorForm(time, resolvedActor);
      return [verbForm, actorForm, rest].filter(Boolean).join(' ').trim() + '?';
    }
    if (time === Word.future) {
      return ['will', actorForm, translation.defaultForm, rest].filter(Boolean).join(' ').trim() + '?';
    }
    if (time === Word.past) {
      return ['did', actorForm, translation.defaultForm, rest].filter(Boolean).join(' ').trim() + '?';
    }
    const personId = resolvedActor instanceof Actor ? resolvedActor.person.id : (resolvedActor as Word).id;
    const doForm = THIRD_PERSON_SINGULAR.includes(personId) ? 'does' : 'do';
    return [doForm, actorForm, translation.defaultForm, rest].filter(Boolean).join(' ').trim() + '?';
  }

  translateComplement(complement: Word, actor: Word | import('./grammar').Actor | import('./grammar').Entity, degree?: import('./grammar').AdjectiveDegree): string {
    return this.translateAdjective(complement, undefined, degree);
  }

  translateObject(object: Word, specifier: Word | undefined, context?: { isSubject?: boolean; adjective?: Word; adjectiveDegree?: import('./grammar').AdjectiveDegree; possessor?: Word }): string {
    const objectTranslation = this.wordTranslations[object.id] as ObjectTranslation;
    const objectForm = this.translateWord(object, context);
    const adjectiveForm = context?.adjective ? this.translateAdjective(context.adjective, object, context.adjectiveDegree) : undefined;
    const possessiveForm = context?.possessor ? this.translatePossessive(context.possessor) : undefined;
    const wordThis = (Word as unknown as Record<string, Word>)['this'];

    // Possessive replaces article
    if (possessiveForm) {
      if (specifier === Word.many) {
        const nounForm = isDefined(objectTranslation.asMany) ? objectTranslation.asMany as string : objectForm + 's';
        return [possessiveForm, adjectiveForm, nounForm].filter(Boolean).join(' ');
      }
      return [possessiveForm, adjectiveForm, objectForm].filter(Boolean).join(' ');
    }

    if (specifier === wordThis || specifier === Word.that || specifier === Word.one) {
      return [this.getArticle(specifier, objectTranslation), adjectiveForm, objectForm].filter(Boolean).join(' ').trim();
    } else if (specifier === Word.many) {
      const nounForm = isDefined(objectTranslation.asMany) ? objectTranslation.asMany as string : objectForm + 's';
      return adjectiveForm ? `${adjectiveForm} ${nounForm}` : nounForm;
    }
    return adjectiveForm ? `${adjectiveForm} ${objectForm}` : objectForm;
  }
}

export default new English(translations);
