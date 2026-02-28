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
  'many'
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
}

export class Entity {
  readonly word: Word;
  readonly specifier: Word | undefined;

  constructor(word: Word, specifier: Word | undefined) {
    this.word = word;
    this.specifier = specifier;
  }

  static $(word: Word): EntityBuilder {
    return new EntityBuilder(word);
  }
}

class EntityBuilder {
  private readonly _word: Word;
  private _specifier: Word | undefined;

  constructor(word: Word) {
    this._word = word;
  }

  specifier(specifier: Word): this {
    this._specifier = specifier;
    return this;
  }

  get $(): Entity {
    return new Entity(this._word, this._specifier);
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

  get $(): Action {
    return new Action(this._primary!, this._secondary, this._subject);
  }
}

export class Action {
  readonly primary: Word;
  readonly secondary: Word | undefined;
  readonly subject: Word | Entity | undefined;

  constructor(primary: Word, secondary?: Word, subject?: Word | Entity) {
    this.primary = primary;
    this.secondary = secondary;
    this.subject = subject;
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
