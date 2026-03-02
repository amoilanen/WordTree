/*
 * Base classes to base the implementation of particular languages from:
 *
 * Translation - specifies how a word is translated in a specific language
 *
 * Language - base class for a specific language, defines how the universal grammar structure
 * is to be translated into that language
 *
 */
import { Word, Entity, Actor, Action, Sentence, PrepositionalPhrase, CompoundSentence, Question, SubordinateSentence, RelativeClause, AdjectiveDegree } from './grammar';
import { isDefined } from './util';

export const PERSONS = [
  'I',
  'you',
  'you_formal',
  'he',
  'she',
  'it',
  'we',
  'you_plural_formal',
  'you_plural',
  'they'
] as const;

export const GENDERS = [
  'he',
  'she',
  'it'
] as const;

export const TENSES = [
  'now',
  'past',
  'future'
] as const;

type PersonForms = Record<string, string>;
type ConjugationMap = Record<string, PersonForms | string>;
type ResolvedConjugations = Record<string, PersonForms>;

export interface ObjectTranslationOpts {
  defaultForm: string;
  asSubject?: string;
  isCountable?: boolean;
  asActor?: Word;
  asMany?: string;
  asSpecificObject?: string;
  [key: string]: unknown;
}

export interface ActionTranslationOpts {
  root: string;
  defaultForm?: string;
  keyVowel?: string;
  conjugationRoots?: Record<string, string>;
  conjugations?: ConjugationMap;
  futureMatchesNow?: boolean;
  dependentActionConnector?: string;
  selfNegating?: boolean;
  imperative?: string;
  presentParticiple?: string;
  pastParticiple?: string;
}

export class Translation {
  defaultForm: string;

  constructor(defaultForm: string) {
    this.defaultForm = defaultForm;
  }
}

export class ObjectTranslation extends Translation {
  asSubject?: string;
  isCountable?: boolean;
  asActor?: Word;
  asMany?: string;
  asSpecificObject?: string;
  [key: string]: unknown;

  constructor(opts: ObjectTranslationOpts) {
    super(opts.defaultForm);
    if (!isDefined(opts.asSubject)) {
      opts.asSubject = opts.defaultForm;
    }
    if (!isDefined(opts.isCountable)) {
      opts.isCountable = true;
    }

    Object.getOwnPropertyNames(opts).forEach(propertyName => {
      (this as Record<string, unknown>)[propertyName] = opts[propertyName];
    });
  }
}

export interface AdjectiveTranslationOpts {
  defaultForm: string;
  forms?: Record<string, string>;
}

export class AdjectiveTranslation extends Translation {
  forms?: Record<string, string>;

  constructor(opts: AdjectiveTranslationOpts) {
    super(opts.defaultForm);
    this.forms = opts.forms;
  }

  getForm(gender?: string): string {
    if (this.forms && gender && this.forms[gender]) {
      return this.forms[gender];
    }
    return this.defaultForm;
  }
}

export class AdverbTranslation extends Translation {
  constructor(defaultForm: string) {
    super(defaultForm);
  }
}

export interface PrepositionTranslationOpts {
  defaultForm: string;
  governedCase?: string;
}

export class PrepositionTranslation extends Translation {
  governedCase?: string;

  constructor(opts: PrepositionTranslationOpts) {
    super(opts.defaultForm);
    this.governedCase = opts.governedCase;
  }
}

export class ActionTranslation extends Translation {
  root: string;
  opts: ActionTranslationOpts;
  conjugationRoots: Record<string, string>;
  conjugations: ConjugationMap | ResolvedConjugations;

  constructor(opts: ActionTranslationOpts) {
    super(opts.root);
    this.root = opts.root;
    this.defaultForm = isDefined(opts.defaultForm) ? opts.defaultForm! : opts.root;
    this.opts = opts;
    this.conjugationRoots = opts.conjugationRoots || {};
    this.conjugations = opts.conjugations || {};
  }

  conjugate(): void {
    this.prepareConjugationRoots();
    this.expandExceptionalConjugations();
    this.determineConjugations();
  }

  prepareConjugationRoots(): void {
    TENSES.forEach(time => {
      if (!this.conjugationRoots[time]) {
        this.conjugationRoots[time] = this.getDefaultConjugationRoot();
      }
    });
    if (this.opts.futureMatchesNow) {
      const conjugations = this.conjugations as ConjugationMap;
      if (isDefined(this.conjugationRoots['now'])) {
        this.conjugationRoots['future'] = this.conjugationRoots['now'];
      }
      if (isDefined(conjugations['now'])) {
        conjugations['future'] = conjugations['now'];
      }
    }
  }

  expandExceptionalConjugations(): void {
    TENSES.forEach(time => {
      const conjugations = this.conjugations as ConjugationMap;
      if (isDefined(conjugations[time])) {
        const timeForms = conjugations[time];
        if (typeof timeForms === 'object') {
          const heSheItConjugation = timeForms['he_she_it'];
          if (isDefined(heSheItConjugation)) {
            timeForms['he'] = heSheItConjugation as string;
            timeForms['she'] = heSheItConjugation as string;
            timeForms['it'] = heSheItConjugation as string;
          }

          const otherConjugation = timeForms['other_single'];
          if (isDefined(otherConjugation)) {
            timeForms['he'] = otherConjugation as string;
            timeForms['she'] = otherConjugation as string;
            timeForms['it'] = otherConjugation as string;
            timeForms['you'] = otherConjugation as string;
            timeForms['you_formal'] = otherConjugation as string;
          }

          const pluralConjugation = timeForms['plural'];
          if (isDefined(pluralConjugation)) {
            timeForms['we'] = pluralConjugation as string;
            timeForms['you_plural_formal'] = pluralConjugation as string;
            timeForms['you_plural'] = pluralConjugation as string;
            timeForms['they'] = pluralConjugation as string;
          }
        }
      }
    });
  }

  determineConjugations(): void {
    const result: ResolvedConjugations = {
      now: this.getPresentForms(),
      future: this.getFutureForms() || {},
      past: this.getPastForms()
    };

    const conjugations = this.conjugations as ConjugationMap;
    //Override with the explicitly specified conjugations in case of irregular conjugations
    TENSES.forEach(time => {
      PERSONS.forEach(person => {
        if (isDefined(conjugations[time])) {
          if (typeof conjugations[time] === 'string') {
            result[time][person] = conjugations[time] as string;
          } else {
            const timeForms = conjugations[time] as PersonForms;
            if (typeof timeForms[person] === 'string') {
              result[time][person] = timeForms[person];
            }
          }
        }
      });
    });
    this.conjugations = result;
  }

  getFutureForms(): PersonForms | undefined {
    if (this.opts.futureMatchesNow) {
      return this.getPresentForms();
    }
    return undefined;
  }

  getPresentForms(): PersonForms {
    return this.forAllPersons('');
  }

  getPastForms(): PersonForms {
    return this.forAllPersons('');
  }

  timeActorForm(time: Word, actor: Word | Actor): string {
    const personWord = actor instanceof Actor ? actor.person : actor;
    const resolvedConjugations = this.conjugations as ResolvedConjugations;
    return resolvedConjugations[time.id][personWord.id];
  }

  asPrimaryTimeActorForm(time: Word, actor: Word | Actor): string {
    return this.timeActorForm(time, actor);
  }

  asSecondary(): string {
    return this.defaultForm;
  }

  getNegatedTimeActorForm(time: Word, actor: Word | Actor): string {
    return this.timeActorForm(time, actor);
  }

  getNegatedPrimaryTimeActorForm(time: Word, actor: Word | Actor): string {
    return this.getNegatedTimeActorForm(time, actor);
  }

  forAllPersons(form: string): PersonForms {
    return {
      I: form,
      you: form,
      you_formal: form,
      he: form,
      she: form,
      it: form,
      we: form,
      you_plural_formal: form,
      you_plural: form,
      they: form
    };
  }

  getDefaultConjugationRoot(): string {
    return this.root;
  }
}

export type TranslationValue = Translation | ObjectTranslation | ActionTranslation;
export type WordTranslations = Record<string, TranslationValue>;

type TranslateContext = {
  isSubject?: boolean;
  adjective?: Word;
  adjectiveDegree?: AdjectiveDegree;
  possessor?: Word;
};

export type Fragment = Word | Entity | Sentence | CompoundSentence | Question | SubordinateSentence;

export class Language {
  name: string;
  wordTranslations: WordTranslations;

  constructor(name: string, wordTranslations: WordTranslations) {
    this.name = name;
    this.wordTranslations = wordTranslations;
  }

  translate(fragment: Fragment | Fragment[]): string {
    if (Array.isArray(fragment)) {
      return fragment.map(f => {
        const translated = this.translate(f);
        if (/[.!?]$/.test(translated)) return translated;
        return translated + '.';
      }).join(' ');
    }
    if (fragment instanceof SubordinateSentence) {
      return this.translateSubordinateSentence(fragment);
    }
    if (fragment instanceof Question) {
      return this.translateQuestion(fragment);
    }
    if (fragment instanceof CompoundSentence) {
      return this.translateCompoundSentence(fragment);
    }
    if (fragment instanceof Word) {
      return this.translateWord(fragment);
    }
    if (fragment instanceof Entity) {
      const { word, specifier, adjective, adjectiveDegree, possessor, relativeClause } = fragment;
      let result = this.translateObject(word, specifier, { adjective, adjectiveDegree, possessor });
      if (relativeClause) {
        result = `${result} ${this.translateRelativeClause(relativeClause)}`;
      }
      return result;
    }

    const { actor, action, time, aspect } = fragment as Sentence;

    if (time === Word.imperative) {
      return this.translateAction(actor, action, time).trim();
    }

    if (time === Word.conditional) {
      return this.translateConditional(actor, action);
    }

    if (aspect) {
      return this.translateAspectSentence(actor, action, time, aspect);
    }

    return [
      this.translateActor(actor),
      this.translateAction(actor, action, time)
    ].join(' ').trim();
  }

  translateWord(word: Word, context: TranslateContext = {}): string {
    const translation = this.wordTranslations[word.id];

    if (translation instanceof ObjectTranslation) {
      return context.isSubject ? (translation.asSubject as string || translation.defaultForm) : translation.defaultForm;
    } else if (translation) {
      return translation.defaultForm;
    }
    return word.id;
  }

  translateActor(actor: Word | Actor | Entity): string {
    if (actor instanceof Entity) {
      let result = this.translateObject(actor.word, actor.specifier, { adjective: actor.adjective, adjectiveDegree: actor.adjectiveDegree, possessor: actor.possessor });
      if (actor.relativeClause) {
        result = `${result} ${this.translateRelativeClause(actor.relativeClause)}`;
      }
      return result;
    }
    return actor instanceof Actor ? this.translateWord(actor.person) : this.translateWord(actor);
  }

  translateObject(object: Word, specifier: Word | undefined, context?: TranslateContext): string {
    const objectForm = this.translateWord(object, context);
    const adjectiveForm = context?.adjective ? this.translateAdjective(context.adjective, object, context.adjectiveDegree) : undefined;
    const possessiveForm = context?.possessor ? this.translatePossessive(context.possessor, object) : undefined;
    return [possessiveForm, adjectiveForm, objectForm].filter(Boolean).join(' ');
  }

  translatePossessive(possessor: Word, _object?: Word): string {
    return this.translateWord(possessor);
  }

  translateAdjective(adjective: Word, _object?: Word, degree?: AdjectiveDegree): string {
    const translation = this.wordTranslations[adjective.id];
    if (translation instanceof AdjectiveTranslation) {
      if (degree === 'comparative' && translation.forms?.comparative) {
        return translation.forms.comparative;
      }
      if (degree === 'superlative' && translation.forms?.superlative) {
        return translation.forms.superlative;
      }
      return translation.defaultForm;
    }
    return translation ? translation.defaultForm : adjective.id;
  }

  translateActionSubject(subject: Word | Entity): string {
    let specifier: Word | undefined;
    let adjective: Word | undefined;
    let adjectiveDegree: AdjectiveDegree | undefined;
    let possessor: Word | undefined;
    let relativeClause: RelativeClause | undefined;
    let subjectWord: Word;
    if (subject instanceof Entity) {
      specifier = subject.specifier;
      adjective = subject.adjective;
      adjectiveDegree = subject.adjectiveDegree;
      possessor = subject.possessor;
      relativeClause = subject.relativeClause;
      subjectWord = subject.word;
    } else {
      subjectWord = subject;
    }
    const subjectTranslation = this.wordTranslations[subjectWord.id];

    let result: string;
    if (subjectTranslation instanceof ObjectTranslation) {
      result = this.translateObject(subjectWord, specifier, { isSubject: true, adjective, adjectiveDegree, possessor });
    } else {
      result = this.translateWord(subjectWord);
    }
    if (relativeClause) {
      result = `${result} ${this.translateRelativeClause(relativeClause)}`;
    }
    return result;
  }

  isActualPerson(actor: Word | Actor): boolean {
    const word = actor instanceof Actor ? actor.person : actor;
    return (PERSONS as readonly string[]).indexOf(word.id) >= 0;
  }

  translateAdverb(adverb: Word): string {
    const translation = this.wordTranslations[adverb.id];
    return translation ? translation.defaultForm : adverb.id;
  }

  translateImperative(action: Word | Action, _actor: Word | Actor | Entity): string {
    const primaryAction = action instanceof Action ? action.primary : action;
    const isNegated = action instanceof Action ? action.negated : false;
    const actionSubject = action instanceof Action ? action.subject : undefined;
    const translation = this.wordTranslations[primaryAction.id] as ActionTranslation;
    const form = translation?.opts?.imperative || translation?.defaultForm || this.translateWord(primaryAction);
    let result = isNegated ? `not ${form}` : form;
    if (actionSubject) {
      result = `${result} ${this.translateActionSubject(actionSubject)}`;
    }
    if (action instanceof Action && action.complement) {
      result = `${result} ${this.translateComplement(action.complement, _actor, action.complementDegree)}`;
    }
    if (action instanceof Action && action.prepositionalPhrases.length > 0) {
      const ppForms = action.prepositionalPhrases.map(pp => this.translatePrepositionalPhrase(pp));
      result = `${result} ${ppForms.join(' ')}`;
    }
    return result;
  }

  translateAction(actor: Word | Actor | Entity, action: Word | Action, time: Word): string {
    if (time === Word.imperative) {
      return this.translateImperative(action, actor);
    }

    if (action instanceof Action && action.passive) {
      return this.translatePassiveAction(actor, action, time);
    }

    let secondaryAction: Word | undefined;
    let actionSubject: Word | Entity | undefined;
    let primaryAction: Word;
    let isNegated = false;
    let adverb: Word | undefined;
    let adverbNegated = false;

    //If action is not a simple word
    if (action instanceof Action) {
      secondaryAction = action.secondary;
      actionSubject = action.subject;
      primaryAction = action.primary;
      isNegated = action.negated;
      adverb = action.adverb;
      adverbNegated = action.adverbNegated;
    } else {
      primaryAction = action;
    }

    //Handling the case when the actor is some object that can be viewed as a person
    if (actor instanceof Entity) {
      const actorTranslation = this.wordTranslations[actor.word.id];
      if (isDefined(actorTranslation) && ('asActor' in actorTranslation)) {
        actor = (actorTranslation as ObjectTranslation).asActor!;
      }
    } else if (!(actor instanceof Actor)) {
      const actorTranslation = this.wordTranslations[actor.id];
      if (isDefined(actorTranslation) && ('asActor' in actorTranslation)) {
        actor = (actorTranslation as ObjectTranslation).asActor!;
      }
    }

    const translation = this.wordTranslations[primaryAction.id];
    // At this point, actor has been resolved from Entity to Word|Actor above
    const resolvedActor = actor as Word | Actor;

    let result: string = translation && (translation as ActionTranslation).conjugations ?
      (isNegated ?
        (translation as ActionTranslation).getNegatedTimeActorForm(time, resolvedActor) :
        (translation as ActionTranslation).timeActorForm(time, resolvedActor)
      ) : this.translateWord(primaryAction);

    if (secondaryAction) {
      result = isNegated ?
        (translation as ActionTranslation).getNegatedPrimaryTimeActorForm(time, resolvedActor) :
        (translation as ActionTranslation).asPrimaryTimeActorForm(time, resolvedActor);
      result = `${result} ${(this.wordTranslations[secondaryAction.id] as ActionTranslation).asSecondary()}`;
    }
    if (actionSubject) {
      result = `${result} ${this.translateActionSubject(actionSubject)}`;
    }
    if (adverb) {
      const adverbForm = this.translateAdverb(adverb);
      if (adverbNegated) {
        result = this.insertNegatedAdverb(result, adverbForm);
      } else {
        result = this.insertAdverb(result, adverbForm);
      }
    }
    if (action instanceof Action && action.complement) {
      const complementForm = this.translateComplement(action.complement, actor, action.complementDegree);
      result = `${result} ${complementForm}`;
    }
    if (action instanceof Action && action.prepositionalPhrases.length > 0) {
      const ppForms = action.prepositionalPhrases.map(pp => this.translatePrepositionalPhrase(pp));
      result = `${result} ${ppForms.join(' ')}`;
    }
    return result.replace(/\s+/g, ' ').trim();
  }

  translateComplement(complement: Word, _actor: Word | Actor | Entity, degree?: AdjectiveDegree): string {
    return this.translateAdjective(complement, undefined, degree);
  }

  translatePrepositionalPhrase(pp: PrepositionalPhrase): string {
    const prepForm = this.translateWord(pp.preposition);
    let objectForm: string;
    if (pp.object instanceof Entity) {
      const { word, specifier, adjective, possessor } = pp.object;
      objectForm = this.translateObject(word, specifier, { adjective, possessor });
    } else {
      const translation = this.wordTranslations[pp.object.id];
      if (translation instanceof ObjectTranslation && translation['asOblique']) {
        objectForm = translation['asOblique'] as string;
      } else {
        objectForm = this.translateWord(pp.object);
      }
    }
    return `${prepForm} ${objectForm}`;
  }

  translateCompoundSentence(compound: CompoundSentence): string {
    const coordinatorForm = this.translateWord(compound.coordinator);
    const parts: string[] = [];
    for (let i = 0; i < compound.sentences.length; i++) {
      const s = compound.sentences[i];
      if (i > 0 && this.sameActor(compound.sentences[i - 1].actor, s.actor)) {
        parts.push(this.translateElidedSentence(s));
      } else {
        parts.push(this.translate(s));
      }
    }
    return parts.join(` ${coordinatorForm} `);
  }

  protected sameActor(a: Word | Actor | Entity, b: Word | Actor | Entity): boolean {
    if (a === b) return true;
    if (a instanceof Entity && b instanceof Entity) {
      return a.word === b.word && a.specifier === b.specifier
        && a.adjective === b.adjective && a.possessor === b.possessor;
    }
    return false;
  }

  protected translateElidedSentence(s: Sentence): string {
    return this.translateAction(s.actor, s.action, s.time);
  }

  resolveActorForConjugation(actor: Word | Actor | Entity): Word | Actor {
    if (actor instanceof Entity) {
      const actorTranslation = this.wordTranslations[actor.word.id];
      if (isDefined(actorTranslation) && ('asActor' in actorTranslation)) {
        return (actorTranslation as ObjectTranslation).asActor!;
      }
      return actor.word;
    }
    if (!(actor instanceof Actor)) {
      const actorTranslation = this.wordTranslations[actor.id];
      if (isDefined(actorTranslation) && ('asActor' in actorTranslation)) {
        return (actorTranslation as ObjectTranslation).asActor!;
      }
    }
    return actor;
  }

  getActionRest(action: Word | Action): string {
    const parts: string[] = [];
    if (action instanceof Action) {
      if (action.secondary) {
        parts.push((this.wordTranslations[action.secondary.id] as ActionTranslation).asSecondary());
      }
      if (action.subject) {
        parts.push(this.translateActionSubject(action.subject));
      }
      if (action.complement) {
        parts.push(this.translateComplement(action.complement, Word.it, action.complementDegree));
      }
      if (action.prepositionalPhrases.length > 0) {
        action.prepositionalPhrases.forEach(pp => {
          parts.push(this.translatePrepositionalPhrase(pp));
        });
      }
    }
    return parts.join(' ');
  }

  translatePassiveAction(actor: Word | Actor | Entity, action: Action, time: Word): string {
    // Default: be(conjugated) + past participle + optional "by" agent
    const resolvedActor = this.resolveActorForConjugation(actor);
    const translation = this.wordTranslations[action.primary.id] as ActionTranslation;
    const beTranslation = this.wordTranslations['be'] as ActionTranslation;
    const beForm = beTranslation.timeActorForm(time, resolvedActor);
    const participle = translation.opts.pastParticiple || translation.defaultForm;
    const parts = [beForm, participle];
    if (action.adverb) {
      const adverbForm = this.translateAdverb(action.adverb);
      parts.push(adverbForm);
    }
    if (action.agent) {
      const byForm = this.translateWord(Word.by_agent);
      if (action.agent instanceof Entity) {
        const { word, specifier, adjective, possessor } = action.agent;
        parts.push(byForm, this.translateObject(word, specifier, { adjective, possessor }));
      } else {
        const agentTranslation = this.wordTranslations[action.agent.id];
        if (agentTranslation instanceof ObjectTranslation && agentTranslation['asOblique']) {
          parts.push(byForm, agentTranslation['asOblique'] as string);
        } else {
          parts.push(byForm, this.translateWord(action.agent));
        }
      }
    }
    return parts.filter(Boolean).join(' ');
  }

  translateAspectSentence(actor: Word | Actor | Entity, action: Word | Action, time: Word, aspect: Word): string {
    // Default: just translate as regular sentence (languages override this)
    return [
      this.translateActor(actor),
      this.translateAction(actor, action, time)
    ].join(' ').trim();
  }

  translateRelativeClause(rc: RelativeClause): string {
    const pronounForm = this.translateWord(rc.relativePronoun);
    // Only translate the action — the actor is represented by the relative pronoun
    const actionForm = this.translateAction(rc.sentence.actor, rc.sentence.action, rc.sentence.time);
    return `${pronounForm} ${actionForm}`;
  }

  translateConditional(actor: Word | Actor | Entity, action: Word | Action): string {
    const primaryAction = action instanceof Action ? action.primary : action;
    const translation = this.wordTranslations[primaryAction.id] as ActionTranslation;
    const actorForm = this.translateActor(actor);
    const verbForm = translation?.defaultForm || this.translateWord(primaryAction);
    const rest = this.getActionRest(action);
    return [actorForm, 'would', verbForm, rest].filter(Boolean).join(' ').trim();
  }

  translateSubordinateSentence(sub: SubordinateSentence): string {
    const mainForm = this.translate(sub.main);
    const subordinatorForm = this.translateWord(sub.subordinator);
    const subordinateForm = this.translate(sub.subordinate);
    if (sub.isSubordinateFirst) {
      return `${subordinatorForm} ${subordinateForm}, ${mainForm}`;
    }
    return `${mainForm} ${subordinatorForm} ${subordinateForm}`;
  }

  translateQuestion(question: Question): string {
    const { sentence, questionWord } = question;
    const statementForm = this.translate(sentence);
    if (questionWord) {
      return `${this.translateWord(questionWord)} ${statementForm}?`;
    }
    return `${statementForm}?`;
  }

  insertAdverb(verbPhrase: string, adverbForm: string): string {
    return `${verbPhrase} ${adverbForm}`;
  }

  insertNegatedAdverb(verbPhrase: string, adverbForm: string): string {
    return `${verbPhrase} not ${adverbForm}`;
  }
}
