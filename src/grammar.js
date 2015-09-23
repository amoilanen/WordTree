/**
 * Grammar common for all the languages.
 */
define('grammar', function() {

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
    'that'
  ];

  class Word {

    constructor(id) {
      this.id = id;
    }
  }

  VOCABULARY.forEach(function(term) {
    Word[term] = new Word(term);
  });

  class Actor {

    constructor(_person, _gender) {
      this.person = _person;
      this.gender = _gender;
    }

    static get $() {
      return new ActorBuilder();
    }
  }

  class ActorBuilder {

    person(_person) {
      this._person = _person;
      return this;
    }

    gender(_gender) {
      this._gender = _gender;
      return this;
    }

    get $() {
      return new Actor(this._person, this._gender);
    }
  }

  class ActionBuilder {

    primary(_primary) {
      this._primary = _primary;
      return this;
    }

    secondary(_secondary) {
      this._secondary = _secondary;
      return this;
    }

    subject(_subject) {
      this._subject = _subject;
      return this;
    }

    get $() {
      return new Action(this._primary, this._secondary, this._subject);
    }
  }

  class Action {

    constructor(primary, secondary, subject) {
      this.primary = primary;
      this.secondary = secondary;
      this.subject = subject;
    }

    static get $() {
      return new ActionBuilder();
    }
  }

  class Gender {

    constructor(word) {
      this.word = word;
    }
  }

  class Time {

    constructor(word) {
      this.word = word;
    }
  }

  class SentenceBuilder {

    actor(_actor) {
      this._actor = _actor;
      return this;
    }

    action(_action) {
      this._action = _action;
      return this;
    }

    time(_time) {
      this._time = _time;
      return this;
    }

    get $() {
      return new Sentence(this._actor, this._action, this._time);
    }
  }

  class Sentence {

    constructor(actor, action, time) {
      this.actor = actor;
      this.action = action;
      this.time = time;
    }

    static get $() {
      return new SentenceBuilder();
    }
  }

  return {
    Word: Word,
    Actor: Actor,
    Action: Action,
    Gender: Gender,
    Time: Time,
    Sentence: Sentence
  };
});