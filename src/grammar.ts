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
  'or',
  'what',
  'who',
  'because',
  'that_conj',
  'when_conj',
  'progressive',
  'perfect',
  'by_agent',
  'who_rel',
  'which_rel',
  'that_rel',
  'conditional',
  // Phase 17: Tom Sawyer vocabulary
  'lady', 'room', 'door', 'boy', 'fence', 'cat', 'noise', 'air',
  'name_noun', 'lad', 'stranger', 'window', 'clothes',
  'switch_noun', 'time_noun', 'voice', 'jam', 'summer',
  'finish', 'shout', 'turn', 'seize', 'flee', 'hover', 'whirl',
  'cry', 'chase', 'climb', 'know', 'lick', 'lift', 'disappear', 'play', 'dress',
  'long', 'slight', 'afraid', 'young', 'new_adj', 'open_adj', 'surprised',
  'cautiously', 'round_adv', 'home_adv',
  'in_loc', 'through_prep', 'before_prep', 'about_prep',
  'there_exists',
  // Phase 18: Tom Sawyer Chapter 1 extended vocabulary
  'hand', 'mouth', 'stone', 'bed', 'closet', 'garden',
  'stand', 'laugh', 'say', 'think', 'run', 'hit', 'throw_action',
  'dark', 'warm', 'quiet', 'gentle',
  'late_adv', 'gently',
  'under'
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
  export let what: Word; export let who: Word;
  export let because: Word; export let that_conj: Word; export let when_conj: Word;
  export let progressive: Word; export let perfect: Word;
  export let by_agent: Word;
  export let who_rel: Word; export let which_rel: Word; export let that_rel: Word;
  export let conditional: Word;
  // Phase 17: Tom Sawyer vocabulary
  export let lady: Word; export let room: Word; export let door: Word; export let boy: Word;
  export let fence: Word; export let cat: Word; export let noise: Word; export let air: Word;
  export let name_noun: Word; export let lad: Word; export let stranger: Word;
  export let window: Word; export let clothes: Word;
  export let switch_noun: Word; export let time_noun: Word; export let voice: Word;
  export let jam: Word; export let summer: Word;
  export let finish: Word; export let shout: Word; export let turn: Word;
  export let seize: Word; export let flee: Word; export let hover: Word;
  export let whirl: Word; export let cry: Word; export let chase: Word;
  export let climb: Word; export let know: Word; export let lick: Word;
  export let lift: Word; export let disappear: Word; export let play: Word;
  export let dress: Word;
  export let long: Word; export let slight: Word; export let afraid: Word;
  export let young: Word; export let new_adj: Word; export let open_adj: Word;
  export let surprised: Word;
  export let cautiously: Word; export let round_adv: Word; export let home_adv: Word;
  export let in_loc: Word; export let through_prep: Word;
  export let before_prep: Word; export let about_prep: Word;
  export let there_exists: Word;
  // Phase 18: Tom Sawyer Chapter 1 extended vocabulary
  export let hand: Word; export let mouth: Word; export let stone: Word;
  export let bed: Word; export let closet: Word; export let garden: Word;
  export let stand: Word; export let laugh: Word; export let say: Word;
  export let think: Word; export let run: Word; export let hit: Word; export let throw_action: Word;
  export let dark: Word; export let warm: Word; export let quiet: Word; export let gentle: Word;
  export let late_adv: Word; export let gently: Word;
  export let under: Word;
}

export class RelativeClause {
  readonly relativePronoun: Word;
  readonly sentence: Sentence;

  constructor(relativePronoun: Word, sentence: Sentence) {
    this.relativePronoun = relativePronoun;
    this.sentence = sentence;
  }
}

export type AdjectiveDegree = 'comparative' | 'superlative';

export class Entity {
  readonly word: Word;
  readonly specifier: Word | undefined;
  readonly adjective: Word | undefined;
  readonly adjectiveDegree: AdjectiveDegree | undefined;
  readonly possessor: Word | undefined;
  readonly relativeClause: RelativeClause | undefined;

  constructor(word: Word, specifier: Word | undefined, adjective?: Word, possessor?: Word, relativeClause?: RelativeClause, adjectiveDegree?: AdjectiveDegree) {
    this.word = word;
    this.specifier = specifier;
    this.adjective = adjective;
    this.adjectiveDegree = adjectiveDegree;
    this.possessor = possessor;
    this.relativeClause = relativeClause;
  }

  static $(word: Word): EntityBuilder {
    return new EntityBuilder(word);
  }
}

class EntityBuilder {
  private readonly _word: Word;
  private _specifier: Word | undefined;
  private _adjective: Word | undefined;
  private _adjectiveDegree: AdjectiveDegree | undefined;
  private _possessor: Word | undefined;
  private _relativeClause: RelativeClause | undefined;

  constructor(word: Word) {
    this._word = word;
  }

  specifier(specifier: Word): this {
    this._specifier = specifier;
    return this;
  }

  adjective(adjective: Word, degree?: AdjectiveDegree): this {
    this._adjective = adjective;
    this._adjectiveDegree = degree;
    return this;
  }

  possessor(possessor: Word): this {
    this._possessor = possessor;
    return this;
  }

  relativeClause(relativePronoun: Word, sentence: Sentence): this {
    this._relativeClause = new RelativeClause(relativePronoun, sentence);
    return this;
  }

  get $(): Entity {
    return new Entity(this._word, this._specifier, this._adjective, this._possessor, this._relativeClause, this._adjectiveDegree);
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
  private _prepositionalPhrases: PrepositionalPhrase[] = [];
  private _passive: boolean = false;
  private _agent: Word | Entity | undefined;
  private _complement: Word | undefined;
  private _complementDegree: AdjectiveDegree | undefined;

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
    this._prepositionalPhrases.push(pp);
    return this;
  }

  passive(): this {
    this._passive = true;
    return this;
  }

  agent(agent: Word | Entity): this {
    this._agent = agent;
    return this;
  }

  complement(word: Word, degree?: AdjectiveDegree): this {
    this._complement = word;
    this._complementDegree = degree;
    return this;
  }

  get $(): Action {
    return new Action(this._primary!, this._secondary, this._subject, this._negated, this._adverb, this._adverbNegated, this._prepositionalPhrases, this._passive, this._agent, this._complement, this._complementDegree);
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
  readonly prepositionalPhrases: PrepositionalPhrase[];
  readonly passive: boolean;
  readonly agent: Word | Entity | undefined;
  readonly complement: Word | undefined;
  readonly complementDegree: AdjectiveDegree | undefined;

  constructor(primary: Word, secondary?: Word, subject?: Word | Entity, negated: boolean = false, adverb?: Word, adverbNegated: boolean = false, prepositionalPhrases: PrepositionalPhrase[] = [], passive: boolean = false, agent?: Word | Entity, complement?: Word, complementDegree?: AdjectiveDegree) {
    this.primary = primary;
    this.secondary = secondary;
    this.subject = subject;
    this.negated = negated;
    this.adverb = adverb;
    this.adverbNegated = adverbNegated;
    this.prepositionalPhrases = prepositionalPhrases;
    this.passive = passive;
    this.agent = agent;
    this.complement = complement;
    this.complementDegree = complementDegree;
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
  private _actor: Word | Actor | Entity | undefined;
  private _action: Word | Action | undefined;
  private _time: Word | undefined;
  private _aspect: Word | undefined;

  actor(actor: Word | Actor | Entity): this {
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

  aspect(aspect: Word): this {
    this._aspect = aspect;
    return this;
  }

  get $(): Sentence {
    return new Sentence(this._actor!, this._action!, this._time!, this._aspect);
  }
}

export class Sentence {
  readonly actor: Word | Actor | Entity;
  readonly action: Word | Action;
  readonly time: Word;
  readonly aspect: Word | undefined;

  constructor(actor: Word | Actor | Entity, action: Word | Action, time: Word, aspect?: Word) {
    this.actor = actor;
    this.action = action;
    this.time = time;
    this.aspect = aspect;
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

class QuestionBuilder {
  private _actor: Word | Actor | Entity | undefined;
  private _action: Word | Action | undefined;
  private _time: Word | undefined;
  private _questionWord: Word | undefined;

  actor(actor: Word | Actor | Entity): this {
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

  questionWord(questionWord: Word): this {
    this._questionWord = questionWord;
    return this;
  }

  get $(): Question {
    const sentence = new Sentence(this._actor!, this._action!, this._time!);
    return new Question(sentence, this._questionWord);
  }
}

export class Question {
  readonly sentence: Sentence;
  readonly questionWord: Word | undefined;

  constructor(sentence: Sentence, questionWord?: Word) {
    this.sentence = sentence;
    this.questionWord = questionWord;
  }

  static get $(): QuestionBuilder {
    return new QuestionBuilder();
  }
}

class SubordinateSentenceBuilder {
  private _main: Sentence | undefined;
  private _subordinator: Word | undefined;
  private _subordinate: Sentence | undefined;
  private _subordinateFirst: boolean = false;

  main(main: Sentence): this {
    this._main = main;
    return this;
  }

  subordinator(subordinator: Word): this {
    this._subordinator = subordinator;
    return this;
  }

  subordinate(subordinate: Sentence): this {
    this._subordinate = subordinate;
    return this;
  }

  subordinateFirst(): this {
    this._subordinateFirst = true;
    return this;
  }

  get $(): SubordinateSentence {
    return new SubordinateSentence(this._main!, this._subordinator!, this._subordinate!, this._subordinateFirst);
  }
}

export class SubordinateSentence {
  readonly main: Sentence;
  readonly subordinator: Word;
  readonly subordinate: Sentence;
  readonly isSubordinateFirst: boolean;

  constructor(main: Sentence, subordinator: Word, subordinate: Sentence, subordinateFirst: boolean = false) {
    this.main = main;
    this.subordinator = subordinator;
    this.subordinate = subordinate;
    this.isSubordinateFirst = subordinateFirst;
  }

  static get $(): SubordinateSentenceBuilder {
    return new SubordinateSentenceBuilder();
  }
}
