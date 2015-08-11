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
    'snow'
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

    constructor(word) {
      this.word = word;
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

    get $() {
      return new Action(this._primary, this._secondary);
    }
  }

  class Action {

    constructor(primary, secondary) {
      this.primary = primary;
      this.secondary = secondary;
    }

    static get $() {
      return new ActionBuilder();
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
    Time: Time,
    Sentence: Sentence
  };
});