/**
 * Grammar common for all the languages.
 */

const VOCABULARY = [
  'sun',
  'sing',
  'do',
  'go',
  'sew',
  'build',
  'give',
  'want',
  'can',
  'look',
  'see',
  'shine',
  'now',
  'future',
  'past',
  'I',
  'you',
  'you_formal',
  'he',
  'she',
  'it',
  'we',
  'you_plural',
  'you_plural_formal',
  'they',
  'wet_snow_with_mud_and_ground',
  'snow_on_tree_branch',
  'snow',
  'this',
  'that',
  'one',
  'one_of_some_kind',
  'lake',
  'bird',
  'wolf',
  'many',
  'be',
  'bright',
  'old',
  'big',
  'small',
  'good',
  'white',
  'loudly',
  'slowly',
  'quickly',
  'well',
  'house',
  'imperative',
  'to',
  'from',
  'at',
  'over',
  'behind',
  'and',
  'but',
  'or'
] as const;

export type VocabularyTerm = typeof VOCABULARY[number];

export class Word {
  readonly id: string;

  constructor(id: string) {
    this.id = id;
  }
}

VOCABULARY.forEach(term => {
  (Word as unknown as Record<string, Word>)[term] = new Word(term);
});

// Declaration merging: adds typed static vocabulary properties to the Word class.
// Both the namespace and its members must be exported for the merge to apply to
// the exported class type and be visible to consumers of this module.
// Reserved words 'do' and 'this' cannot appear in a namespace declaration;
// access those with (Word as unknown as Record<string, Word>)['do'] etc.
export declare namespace Word {
  export let sun: Word; export let sing: Word; export let go: Word; export let sew: Word;
  export let build: Word; export let give: Word; export let want: Word; export let can: Word;
  export let look: Word; export let see: Word; export let shine: Word;
  export let now: Word; export let future: Word; export let past: Word;
  export let I: Word; export let you: Word; export let you_formal: Word;
  export let he: Word; export let she: Word; export let it: Word; export let we: Word;
  export let you_plural: Word; export let you_plural_formal: Word; export let they: Word;
  export let wet_snow_with_mud_and_ground: Word;
  export let snow_on_tree_branch: Word; export let snow: Word;
  export let that: Word; export let one: Word; export let one_of_some_kind: Word;
  export let lake: Word; export let bird: Word; export let wolf: Word; export let many: Word;
  export let be: Word;
  export let bright: Word; export let old: Word; export let big: Word;
  export let small: Word; export let good: Word; export let white: Word;
  export let loudly: Word; export let slowly: Word; export let quickly: Word; export let well: Word;
  export let house: Word;
  export let imperative: Word;
  export let to: Word; export let from: Word; export let at: Word;
  export let over: Word; export let behind: Word;
  export let and: Word; export let but: Word; export let or: Word;
}

export class Entity {
  readonly word: Word;
  readonly specifier: Word | undefined;
  readonly adjective: Word | undefined;
  readonly possessor: Word | undefined;

  constructor(word: Word, specifier: Word | undefined, adjective?: Word, possessor?: Word) {
    this.word = word;
    this.specifier = specifier;
    this.adjective = adjective;
    this.possessor = possessor;
  }

  static $(word: Word): EntityBuilder {
    return new EntityBuilder(word);
  }
}

class EntityBuilder {
  private readonly _word: Word;
  private _specifier: Word | undefined;
  private _adjective: Word | undefined;
  private _possessor: Word | undefined;

  constructor(word: Word) {
    this._word = word;
  }

  specifier(specifier: Word): this {
    this._specifier = specifier;
    return this;
  }

  adjective(adjective: Word): this {
    this._adjective = adjective;
    return this;
  }

  possessor(possessor: Word): this {
    this._possessor = possessor;
    return this;
  }

  get $(): Entity {
    return new Entity(this._word, this._specifier, this._adjective, this._possessor);
  }
}

export class Actor {
  readonly person: Word;
  readonly gender: Word | undefined;

  constructor(person: Word, gender?: Word) {
    this.person = person;
    this.gender = gender;
  }

  static get $(): ActorBuilder {
    return new ActorBuilder();
  }
}

class ActorBuilder {
  private _person: Word | undefined;
  private _gender: Word | undefined;

  person(person: Word): this {
    this._person = person;
    return this;
  }

  gender(gender: Word): this {
    this._gender = gender;
    return this;
  }

  get $(): Actor {
    return new Actor(this._person!, this._gender);
  }
}

class ActionBuilder {
  private _primary: Word | undefined;
  private _secondary: Word | undefined;
  private _subject: Word | Entity | undefined;
  private _negated: boolean = false;
  private _adverb: Word | undefined;
  private _adverbNegated: boolean = false;
  private _prepositionalPhrase: PrepositionalPhrase | undefined;

  primary(primary: Word): this {
    this._primary = primary;
    return this;
  }

  secondary(secondary: Word): this {
    this._secondary = secondary;
    return this;
  }

  subject(subject: Word | Entity): this {
    this._subject = subject;
    return this;
  }

  negated(): this {
    this._negated = true;
    return this;
  }

  adverb(adverb: Word, opts?: { negated?: boolean }): this {
    this._adverb = adverb;
    if (opts?.negated) {
      this._adverbNegated = true;
    }
    return this;
  }

  prepositionalPhrase(pp: PrepositionalPhrase): this {
    this._prepositionalPhrase = pp;
    return this;
  }

  get $(): Action {
    return new Action(this._primary!, this._secondary, this._subject, this._negated, this._adverb, this._adverbNegated, this._prepositionalPhrase);
  }
}

export class PrepositionalPhrase {
  readonly preposition: Word;
  readonly object: Word | Entity;

  constructor(preposition: Word, object: Word | Entity) {
    this.preposition = preposition;
    this.object = object;
  }

  static $(preposition: Word): PrepositionalPhraseBuilder {
    return new PrepositionalPhraseBuilder(preposition);
  }
}

class PrepositionalPhraseBuilder {
  private readonly _preposition: Word;
  private _object: Word | Entity | undefined;

  constructor(preposition: Word) {
    this._preposition = preposition;
  }

  object(object: Word | Entity): this {
    this._object = object;
    return this;
  }

  get $(): PrepositionalPhrase {
    return new PrepositionalPhrase(this._preposition, this._object!);
  }
}

export class Action {
  readonly primary: Word;
  readonly secondary: Word | undefined;
  readonly subject: Word | Entity | undefined;
  readonly negated: boolean;
  readonly adverb: Word | undefined;
  readonly adverbNegated: boolean;
  readonly prepositionalPhrase: PrepositionalPhrase | undefined;

  constructor(primary: Word, secondary?: Word, subject?: Word | Entity, negated: boolean = false, adverb?: Word, adverbNegated: boolean = false, prepositionalPhrase?: PrepositionalPhrase) {
    this.primary = primary;
    this.secondary = secondary;
    this.subject = subject;
    this.negated = negated;
    this.adverb = adverb;
    this.adverbNegated = adverbNegated;
    this.prepositionalPhrase = prepositionalPhrase;
  }

  static get $(): ActionBuilder {
    return new ActionBuilder();
  }
}

export class Time {
  readonly word: Word;

  constructor(word: Word) {
    this.word = word;
  }
}

class SentenceBuilder {
  private _actor: Word | Actor | undefined;
  private _action: Word | Action | undefined;
  private _time: Word | undefined;

  actor(actor: Word | Actor): this {
    this._actor = actor;
    return this;
  }

  action(action: Word | Action): this {
    this._action = action;
    return this;
  }

  time(time: Word): this {
    this._time = time;
    return this;
  }

  get $(): Sentence {
    return new Sentence(this._actor!, this._action!, this._time!);
  }
}

export class Sentence {
  readonly actor: Word | Actor;
  readonly action: Word | Action;
  readonly time: Word;

  constructor(actor: Word | Actor, action: Word | Action, time: Word) {
    this.actor = actor;
    this.action = action;
    this.time = time;
  }

  static get $(): SentenceBuilder {
    return new SentenceBuilder();
  }
}

class CompoundSentenceBuilder {
  private _sentences: Sentence[] = [];
  private _coordinator: Word | undefined;

  sentence(sentence: Sentence): this {
    this._sentences.push(sentence);
    return this;
  }

  coordinator(coordinator: Word): this {
    this._coordinator = coordinator;
    return this;
  }

  get $(): CompoundSentence {
    return new CompoundSentence(this._sentences, this._coordinator!);
  }
}

export class CompoundSentence {
  readonly sentences: Sentence[];
  readonly coordinator: Word;

  constructor(sentences: Sentence[], coordinator: Word) {
    this.sentences = sentences;
    this.coordinator = coordinator;
  }

  static get $(): CompoundSentenceBuilder {
    return new CompoundSentenceBuilder();
  }
}
