define('grammar', function() {

  const VOCABULARY = [
    'sun',
    'sing',
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
    'they'
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
      this._word = word;
    }
  }

  class Action {

    constructor(word) {
      this._word = word;
    }
  }

  class Time {

    constructor(word) {
      this._word = word;
    }
  }

  class Sentence {

    constructor(_actor, _action, _time) {
      this._actor = _actor;
      this._action = _action;
      this._time = _time;
    }

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
  }

  return {
    Word: Word,
    Actor: Actor,
    Action: Action,
    Time: Time,
    Sentence: Sentence
  };
});