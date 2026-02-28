import { Translation, ObjectTranslation, ActionTranslation, ActionTranslationOpts, AdjectiveTranslation, AdverbTranslation, PrepositionTranslation, Language, WordTranslations } from './lang';
import { Word, Actor, Action, Entity } from './grammar';
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
    conjugations: {
      past: 'sang'
    }
  }),
  do: new ActionTranslationEn({
    root: 'do',
    conjugations: {
      now: {
        he_she_it: 'does'
      },
      past: 'did'
    }
  }),
  sew: new ActionTranslationEn({
    root: 'sew'
  }),
  go: new ActionTranslationEn({
    root: 'go',
    conjugations: {
      now: {
        he_she_it: 'goes'
      },
      past: 'went'
    }
  }),
  build: new ActionTranslationEn({
    root: 'build',
    conjugations: {
      past: 'built'
    }
  }),
  give: new ActionTranslationEn({
    root: 'give',
    conjugations: {
      past: 'gave'
    }
  }),
  look: new ActionTranslationEn({
    root: 'look'
  }),
  see: new ActionTranslationEn({
    root: 'see',
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
    conjugations: {
      past: 'shone'
    }
  }),
  be: new ActionTranslationEn({
    root: 'be',
    selfNegating: true,
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
  I: new Translation('I'),
  you: new Translation('you'),
  you_formal: new Translation('you'),
  he: new Translation('he'),
  she: new Translation('she'),
  it: new Translation('it'),
  we: new Translation('we'),
  you_plural: new Translation('you'),
  you_plural_formal: new Translation('you'),
  they: new Translation('they'),
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
  bright: new AdjectiveTranslation({ defaultForm: 'bright' }),
  old: new AdjectiveTranslation({ defaultForm: 'old' }),
  big: new AdjectiveTranslation({ defaultForm: 'big' }),
  small: new AdjectiveTranslation({ defaultForm: 'small' }),
  good: new AdjectiveTranslation({ defaultForm: 'good' }),
  white: new AdjectiveTranslation({ defaultForm: 'white' }),
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
  behind: new PrepositionTranslation({ defaultForm: 'behind' })
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
    return result;
  }

  translatePossessive(possessor: Word): string {
    return POSSESSIVE_FORMS[possessor.id] || possessor.id;
  }

  translateObject(object: Word, specifier: Word | undefined, context?: { isSubject?: boolean; adjective?: Word; possessor?: Word }): string {
    const objectTranslation = this.wordTranslations[object.id] as ObjectTranslation;
    const objectForm = this.translateWord(object, context);
    const adjectiveForm = context?.adjective ? this.translateAdjective(context.adjective, object) : undefined;
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
