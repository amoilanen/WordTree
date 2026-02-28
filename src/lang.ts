/*
 * Base classes to base the implementation of particular languages from:
 *
 * Translation - specifies how a word is translated in a specific language
 *
 * Language - base class for a specific language, defines how the universal grammar structure
 * is to be translated into that language
 *
 */
import { Word, Entity, Actor, Action, Sentence } from './grammar';
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
};

type Fragment = Word | Entity | Sentence;

export class Language {
  name: string;
  wordTranslations: WordTranslations;

  constructor(name: string, wordTranslations: WordTranslations) {
    this.name = name;
    this.wordTranslations = wordTranslations;
  }

  translate(fragment: Fragment): string {
    if (fragment instanceof Word) {
      return this.translateWord(fragment);
    }
    if (fragment instanceof Entity) {
      const { word, specifier, adjective } = fragment;
      return this.translateObject(word, specifier, { adjective });
    }

    const { actor, action, time } = fragment as Sentence;

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

  translateActor(actor: Word | Actor): string {
    return actor instanceof Actor ? this.translateWord(actor.person) : this.translateWord(actor);
  }

  translateObject(object: Word, specifier: Word | undefined, context?: TranslateContext): string {
    const objectForm = this.translateWord(object, context);
    const adjectiveForm = context?.adjective ? this.translateAdjective(context.adjective, object) : undefined;
    return adjectiveForm ? `${adjectiveForm} ${objectForm}` : objectForm;
  }

  translateAdjective(adjective: Word, _object?: Word): string {
    const translation = this.wordTranslations[adjective.id];
    if (translation instanceof AdjectiveTranslation) {
      return translation.defaultForm;
    }
    return translation ? translation.defaultForm : adjective.id;
  }

  //TODO: Refactor and simplify this method
  translateActionSubject(subject: Word | Entity): string {
    let specifier: Word | undefined;
    let adjective: Word | undefined;
    let subjectWord: Word;
    if (subject instanceof Entity) {
      specifier = subject.specifier;
      adjective = subject.adjective;
      subjectWord = subject.word;
    } else {
      subjectWord = subject;
    }
    const subjectTranslation = this.wordTranslations[subjectWord.id];

    if (subjectTranslation instanceof ObjectTranslation) {
      return this.translateObject(subjectWord, specifier, { isSubject: true, adjective });
    } else {
      return this.translateWord(subjectWord);
    }
  }

  isActualPerson(actor: Word | Actor): boolean {
    const word = actor instanceof Actor ? actor.person : actor;
    return (PERSONS as readonly string[]).indexOf(word.id) >= 0;
  }

  translateAdverb(adverb: Word): string {
    const translation = this.wordTranslations[adverb.id];
    return translation ? translation.defaultForm : adverb.id;
  }

  translateAction(actor: Word | Actor, action: Word | Action, time: Word): string {
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
    if (!(actor instanceof Actor)) {
      const actorTranslation = this.wordTranslations[actor.id];
      if (isDefined(actorTranslation) && ('asActor' in actorTranslation)) {
        actor = (actorTranslation as ObjectTranslation).asActor!;
      }
    }

    const translation = this.wordTranslations[primaryAction.id];

    let result: string = translation && (translation as ActionTranslation).conjugations ?
      (isNegated ?
        (translation as ActionTranslation).getNegatedTimeActorForm(time, actor) :
        (translation as ActionTranslation).timeActorForm(time, actor)
      ) : this.translateWord(primaryAction);

    if (secondaryAction) {
      result = isNegated ?
        (translation as ActionTranslation).getNegatedPrimaryTimeActorForm(time, actor) :
        (translation as ActionTranslation).asPrimaryTimeActorForm(time, actor);
      result = `${result} ${(this.wordTranslations[secondaryAction.id] as ActionTranslation).asSecondary()}`;
    }
    if (adverb) {
      const adverbForm = this.translateAdverb(adverb);
      if (adverbNegated) {
        result = this.insertNegatedAdverb(result, adverbForm);
      } else {
        result = this.insertAdverb(result, adverbForm);
      }
    }
    if (actionSubject) {
      result = `${result} ${this.translateActionSubject(actionSubject)}`;
    }
    return result;
  }

  insertAdverb(verbPhrase: string, adverbForm: string): string {
    return `${verbPhrase} ${adverbForm}`;
  }

  insertNegatedAdverb(verbPhrase: string, adverbForm: string): string {
    return `${verbPhrase} not ${adverbForm}`;
  }
}
