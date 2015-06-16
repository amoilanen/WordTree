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
      this.word = word;
    }
  }

  class Action {

    constructor(word) {
      this.word = word;
    }
  }

  class Time {

    constructor(word) {
      this.word = word;
    }
  }

  class Sentence {

    constructor(actor, action, time) {
      this.actor = actor;
      this.action = action;
      this.time = time;
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