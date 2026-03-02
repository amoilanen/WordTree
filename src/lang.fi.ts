import { Translation, ObjectTranslation, ActionTranslation, ActionTranslationOpts, AdjectiveTranslation, AdverbTranslation, PrepositionTranslation, Language, WordTranslations } from './lang';
import { Word, Actor, Action, Entity, PrepositionalPhrase, Question } from './grammar';
import { isDefined } from './util';

const POSSESSIVE_FORMS: Record<string, string> = {
  I: 'minun', you: 'sinun', you_formal: 'sinun',
  he: 'hänen', she: 'hänen', it: 'sen',
  we: 'meidän', you_plural: 'teidän', you_plural_formal: 'teidän', they: 'heidän'
};

const NEGATIVE_AUX: Record<string, string> = {
  I: 'en',
  you: 'et',
  you_formal: 'et',
  he: 'ei',
  she: 'ei',
  it: 'ei',
  we: 'emme',
  you_plural: 'ette',
  you_plural_formal: 'ette',
  they: 'eivät'
};

class ActionTranslationFi extends ActionTranslation {
  private _pastParticiple: string;
  private _negationStem: string | undefined;

  constructor(opts: ActionTranslationOpts & { keyVowel?: string; pastParticiple?: string; negationStem?: string }) {
    opts.keyVowel = opts.keyVowel || '';
    if (!opts.imperative) {
      opts.imperative = opts.root + opts.keyVowel;
    }
    opts.futureMatchesNow = true;
    super(opts);
    this._pastParticiple = opts.pastParticiple || '';
    this._negationStem = opts.negationStem;
    super.conjugate();
  }

  get keyVowel(): string {
    return this.opts.keyVowel || '';
  }

  get negationStem(): string {
    return this._negationStem || (this.conjugationRoots.now + this.keyVowel);
  }

  getNegatedTimeActorForm(time: Word, actor: Word | Actor): string {
    const personWord = actor instanceof Actor ? actor.person : actor;
    const aux = NEGATIVE_AUX[personWord.id];
    if (time === Word.past) {
      return `${aux} ${this._pastParticiple}`;
    }
    return `${aux} ${this.negationStem}`;
  }

  getNegatedPrimaryTimeActorForm(time: Word, actor: Word | Actor): string {
    return this.getNegatedTimeActorForm(time, actor);
  }

  getPresentForms(): Record<string, string> {
    const base = this.conjugationRoots.now + this.keyVowel;

    return {
      I: `${base}n`,
      you: `${base}t`,
      you_formal: `${base}t`,
      he: `${base}${this.keyVowel}`,
      she: `${base}${this.keyVowel}`,
      it: `${base}${this.keyVowel}`,
      we: `${base}mme`,
      you_plural_formal: `${base}tte`,
      you_plural: `${base}tte`,
      they: `${base}vat`
    };
  }

  getPastForms(): Record<string, string> {
    const base = this.conjugationRoots.past;

    return {
      I: `${base}in`,
      you: `${base}it`,
      you_formal: `${base}it`,
      he: `${base}i`,
      she: `${base}i`,
      it: `${base}i`,
      we: `${base}imme`,
      you_plural_formal: `${base}itte`,
      you_plural: `${base}itte`,
      they: `${base}ivat`
    };
  }
}

const translations: WordTranslations = {
  sun: new ObjectTranslation({
    defaultForm: 'aurinko',
    asActor: Word.it,
    asSubject: 'auringon'
  }),
  sing: new ActionTranslationFi({
    root: 'laul',
    keyVowel: 'a',
    defaultForm: 'laulaa',
    pastParticiple: 'laulanut',
    conjugationRoots: {
      past: 'laulo'
    }
  }),
  do: new ActionTranslationFi({
    root: 'te',
    keyVowel: 'e',
    defaultForm: 'tehdä',
    pastParticiple: 'tehnyt',
    conjugationRoots: {
      now: 'te',
      past: 'te'
    },
    conjugations: {
      now: {
        he_she_it: 'tekee',
        they: 'tekevät'
      },
      past: {
        he_she_it: 'teki',
        they: 'tekivät'
      }
    }
  }),
  go: new ActionTranslationFi({
    root: 'men',
    keyVowel: 'e',
    defaultForm: 'mennä',
    pastParticiple: 'mennyt',
    conjugations: {
      now: {
        they: 'menevät'
      },
      past: {
        they: 'menivät'
      }
    }
  }),
  sew: new ActionTranslationFi({
    root: 'omel',
    defaultForm: 'omella',
    keyVowel: 'e',
    pastParticiple: 'omellut'
  }),
  build: new ActionTranslationFi({
    root: 'raken',
    defaultForm: 'rakentaa',
    imperative: 'rakenna',
    keyVowel: 'a',
    pastParticiple: 'rakentanut',
    conjugationRoots: {
      now: 'rakenn',
      past: 'rakens'
    },
    conjugations: {
      now: {
        he_she_it: 'rakentaa',
        they: 'rakentavat'
      }
    }
  }),
  give: new ActionTranslationFi({
    root: 'an',
    defaultForm: 'antaa',
    imperative: 'anna',
    keyVowel: 'a',
    pastParticiple: 'antanut',
    conjugationRoots: {
      now: 'ann',
      past: 'anno'
    },
    conjugations: {
      now: {
        he_she_it: 'antaa',
        they: 'antavat'
      },
      past: {
        he_she_it: 'antoi',
        they: 'antoivat'
      }
    }
  }),
  look: new ActionTranslationFi({
    root: 'kats',
    defaultForm: 'katsoa',
    keyVowel: 'o',
    pastParticiple: 'katsonut',
    conjugationRoots: {
      past: 'katso'
    }
  }),
  see: new ActionTranslationFi({
    root: 'nä',
    defaultForm: 'nähdä',
    keyVowel: 'e',
    pastParticiple: 'nähnyt',
    conjugations: {
      now: {
        he_she_it: 'näkee',
        they: 'näkevät'
      },
      past: {
        he_she_it: 'näki',
        they: 'näkivät'
      }
    }
  }),
  want: new ActionTranslationFi({
    root: 'halu',
    keyVowel: 'a',
    pastParticiple: 'halunnut',
    conjugationRoots: {
      past: 'halus'
    }
  }),
  can: new ActionTranslationFi({
    root: 'vo',
    keyVowel: 'i',
    pastParticiple: 'voinut',
    conjugationRoots: {
      past: 'vois'
    },
    conjugations: {
      now: {
        he_she_it: 'voi'
      }
    }
  }),
  shine: new ActionTranslationFi({
    root: 'paist',
    keyVowel: 'a',
    pastParticiple: 'paistanut',
    conjugationRoots: {
      past: 'paisto'
    }
  }),
  be: new ActionTranslationFi({
    root: 'ol',
    keyVowel: 'e',
    defaultForm: 'olla',
    pastParticiple: 'ollut',
    negationStem: 'ole',
    conjugations: {
      now: {
        I: 'olen',
        you: 'olet', you_formal: 'olet',
        he: 'on', she: 'on', it: 'on',
        we: 'olemme', you_plural: 'olette', you_plural_formal: 'olette',
        they: 'ovat'
      },
      past: {
        I: 'olin',
        you: 'olit', you_formal: 'olit',
        he: 'oli', she: 'oli', it: 'oli',
        we: 'olimme', you_plural: 'olitte', you_plural_formal: 'olitte',
        they: 'olivat'
      }
    }
  }),
  now: new Translation('nyt'),
  future: new Translation('tulevaisuus'),
  past: new Translation('menneisyys'),
  I: new ObjectTranslation({
    defaultForm: 'minä',
    asActor: Word.I,
    asSubject: 'minut',
    asPartitive: 'minua', asAllative: 'minulle', asElative: 'minusta',
    asGenitive: 'minun', asAdessive: 'minulla'
  }),
  you: new ObjectTranslation({
    defaultForm: 'sinä',
    asActor: Word.you,
    asSubject: 'sinut',
    asPartitive: 'sinua', asAllative: 'sinulle', asElative: 'sinusta',
    asGenitive: 'sinun', asAdessive: 'sinulla'
  }),
  you_formal: new ObjectTranslation({
    defaultForm: 'sinä',
    asActor: Word.you_formal,
    asPartitive: 'sinua', asAllative: 'sinulle', asElative: 'sinusta',
    asGenitive: 'sinun', asAdessive: 'sinulla'
  }),
  he: new ObjectTranslation({
    defaultForm: 'hän',
    asActor: Word.he,
    asSubject: 'hänet',
    asPartitive: 'häntä', asAllative: 'hänelle', asElative: 'hänestä',
    asGenitive: 'hänen', asAdessive: 'hänellä'
  }),
  she: new ObjectTranslation({
    defaultForm: 'hän',
    asActor: Word.she,
    asSubject: 'hänet',
    asPartitive: 'häntä', asAllative: 'hänelle', asElative: 'hänestä',
    asGenitive: 'hänen', asAdessive: 'hänellä'
  }),
  it: new ObjectTranslation({
    defaultForm: 'se',
    asActor: Word.it,
    asSubject: 'sitä',
    asPartitive: 'sitä', asAllative: 'sille', asElative: 'siitä',
    asGenitive: 'sen', asAdessive: 'sillä'
  }),
  we: new ObjectTranslation({
    defaultForm: 'me',
    asActor: Word.we,
    asSubject: 'meidät',
    asPartitive: 'meitä', asAllative: 'meille', asElative: 'meistä',
    asGenitive: 'meidän', asAdessive: 'meillä'
  }),
  you_plural: new ObjectTranslation({
    defaultForm: 'te',
    asActor: Word.you_plural,
    asPartitive: 'teitä', asAllative: 'teille', asElative: 'teistä',
    asGenitive: 'teidän', asAdessive: 'teillä'
  }),
  you_plural_formal: new ObjectTranslation({
    defaultForm: 'te',
    asActor: Word.you_plural_formal,
    asPartitive: 'teitä', asAllative: 'teille', asElative: 'teistä',
    asGenitive: 'teidän', asAdessive: 'teillä'
  }),
  they: new ObjectTranslation({
    defaultForm: 'ne',
    asActor: Word.they,
    asPartitive: 'niitä', asAllative: 'niille', asElative: 'niistä',
    asGenitive: 'niiden', asAdessive: 'niillä'
  }),
  wet_snow_with_mud_and_ground: new Translation('loska'),
  snow_on_tree_branch: new Translation('tykky'),
  snow: new Translation('lumi'),
  this: new ObjectTranslation({
    defaultForm: 'tämä',
    asActor: Word.it,
    asSubject: 'tämän'
  }),
  that: new Translation('että'),
  one: new Translation('yksi'),
  one_of_some_kind: new Translation('yksi'),
  lake: new ObjectTranslation({
    defaultForm: 'järvi',
    asActor: Word.it,
    asMany: 'järviä',
    asAllative: 'järvelle',
    asElative: 'järvestä',
    asAdessive: 'järvellä',
    asGenitive: 'järven',
    asInessive: 'järvessä'
  }),
  bird: new ObjectTranslation({
    defaultForm: 'lintu',
    asActor: Word.it,
    asSubject: 'linnun',
    asMany: 'lintuja',
    asAllative: 'linnulle',
    asElative: 'linnusta',
    asAdessive: 'linnulla',
    asPartitive: 'lintua'
  }),
  wolf: new ObjectTranslation({
    defaultForm: 'susi',
    asActor: Word.it,
    asMany: 'susia',
    asAllative: 'sudelle',
    asElative: 'sudesta',
    asAdessive: 'sudella',
    asGenitive: 'suden'
  }),
  house: new ObjectTranslation({
    defaultForm: 'talo',
    asActor: Word.it
  }),
  bright: new AdjectiveTranslation({ defaultForm: 'kirkas', forms: { comparative: 'kirkkaampi', superlative: 'kirkkain' } }),
  old: new AdjectiveTranslation({ defaultForm: 'vanha', forms: { comparative: 'vanhempi', superlative: 'vanhin' } }),
  big: new AdjectiveTranslation({ defaultForm: 'suuri', forms: { comparative: 'suurempi', superlative: 'suurin' } }),
  small: new AdjectiveTranslation({ defaultForm: 'pieni', forms: { comparative: 'pienempi', superlative: 'pienin' } }),
  good: new AdjectiveTranslation({ defaultForm: 'hyvä', forms: { comparative: 'parempi', superlative: 'paras' } }),
  white: new AdjectiveTranslation({ defaultForm: 'valkoinen', forms: { comparative: 'valkoisempi', superlative: 'valkoisin' } }),
  loudly: new AdverbTranslation('kovaa'),
  slowly: new AdverbTranslation('hitaasti'),
  quickly: new AdverbTranslation('nopeasti'),
  well: new AdverbTranslation('hyvin'),
  and: new Translation('ja'),
  but: new Translation('mutta'),
  or: new Translation('tai'),
  to: new PrepositionTranslation({ defaultForm: 'to' }),
  from: new PrepositionTranslation({ defaultForm: 'from' }),
  at: new PrepositionTranslation({ defaultForm: 'at' }),
  over: new PrepositionTranslation({ defaultForm: 'yli' }),
  behind: new PrepositionTranslation({ defaultForm: 'takana' }),
  what: new Translation('mitä'),
  who: new Translation('kuka'),
  by_agent: new Translation(''),
  who_rel: new Translation('joka'),
  which_rel: new Translation('joka'),
  that_rel: new Translation('joka'),
  because: new Translation('koska'),
  that_conj: new Translation('että'),
  when_conj: new Translation('kun'),
  // Phase 17: Tom Sawyer vocabulary — nouns
  lady: new ObjectTranslation({
    defaultForm: 'rouva', asActor: Word.she, asMany: 'rouvat',
    asPartitive: 'rouvaa', asAllative: 'rouvalle', asElative: 'rouvasta',
    asGenitive: 'rouvan', asAdessive: 'rouvalla', asInessive: 'rouvassa'
  }),
  room: new ObjectTranslation({
    defaultForm: 'huone', asActor: Word.it, asMany: 'huoneet',
    asPartitive: 'huonetta', asAllative: 'huoneelle', asElative: 'huoneesta',
    asGenitive: 'huoneen', asAdessive: 'huoneella', asInessive: 'huoneessa'
  }),
  door: new ObjectTranslation({
    defaultForm: 'ovi', asActor: Word.it, asMany: 'ovet',
    asPartitive: 'ovea', asAllative: 'ovelle', asElative: 'ovesta',
    asGenitive: 'oven', asAdessive: 'ovella', asInessive: 'ovessa'
  }),
  boy: new ObjectTranslation({
    defaultForm: 'poika', asActor: Word.he, asMany: 'pojat',
    asPartitive: 'poikaa', asAllative: 'pojalle', asElative: 'pojasta',
    asGenitive: 'pojan', asAdessive: 'pojalla', asInessive: 'pojassa'
  }),
  fence: new ObjectTranslation({
    defaultForm: 'aita', asActor: Word.it, asMany: 'aidat',
    asPartitive: 'aitaa', asAllative: 'aidalle', asElative: 'aidasta',
    asGenitive: 'aidan', asAdessive: 'aidalla', asInessive: 'aidassa'
  }),
  cat: new ObjectTranslation({
    defaultForm: 'kissa', asActor: Word.it, asMany: 'kissat',
    asPartitive: 'kissaa', asAllative: 'kissalle', asElative: 'kissasta',
    asGenitive: 'kissan', asAdessive: 'kissalla', asInessive: 'kissassa'
  }),
  noise: new ObjectTranslation({
    defaultForm: 'ääni', asActor: Word.it, asMany: 'äänet',
    asPartitive: 'ääntä', asAllative: 'äänelle', asElative: 'äänestä',
    asGenitive: 'äänen', asAdessive: 'äänellä', asInessive: 'äänessä'
  }),
  air: new ObjectTranslation({
    defaultForm: 'ilma', asActor: Word.it,
    asPartitive: 'ilmaa', asAllative: 'ilmalle', asElative: 'ilmasta',
    asGenitive: 'ilman', asAdessive: 'ilmalla', asInessive: 'ilmassa'
  }),
  name_noun: new ObjectTranslation({
    defaultForm: 'nimi', asActor: Word.it, asMany: 'nimet',
    asPartitive: 'nimeä', asAllative: 'nimelle', asElative: 'nimestä',
    asGenitive: 'nimen', asAdessive: 'nimellä', asInessive: 'nimessä'
  }),
  lad: new ObjectTranslation({
    defaultForm: 'nuorukainen', asActor: Word.he, asMany: 'nuorukaiset',
    asPartitive: 'nuorukaista', asAllative: 'nuorukaiselle', asElative: 'nuorukaisesta',
    asGenitive: 'nuorukaisen', asAdessive: 'nuorukaisella', asInessive: 'nuorukaisessa'
  }),
  stranger: new ObjectTranslation({
    defaultForm: 'muukalainen', asActor: Word.he, asMany: 'muukalaiset',
    asPartitive: 'muukalaista', asAllative: 'muukalaiselle', asElative: 'muukalaisesta',
    asGenitive: 'muukalaisen', asAdessive: 'muukalaisella', asInessive: 'muukalaisessa'
  }),
  window: new ObjectTranslation({
    defaultForm: 'ikkuna', asActor: Word.it, asMany: 'ikkunat',
    asPartitive: 'ikkunaa', asAllative: 'ikkunalle', asElative: 'ikkunasta',
    asGenitive: 'ikkunan', asAdessive: 'ikkunalla', asInessive: 'ikkunassa'
  }),
  clothes: new ObjectTranslation({
    defaultForm: 'vaatteet', asActor: Word.it,
    asPartitive: 'vaatteita', asAllative: 'vaatteille', asElative: 'vaatteista',
    asGenitive: 'vaatteiden', asAdessive: 'vaatteilla', asInessive: 'vaatteissa'
  }),
  switch_noun: new ObjectTranslation({
    defaultForm: 'vitsa', asActor: Word.it, asMany: 'vitsat',
    asPartitive: 'vitsaa', asAllative: 'vitsalle', asElative: 'vitsasta',
    asGenitive: 'vitsan', asAdessive: 'vitsalla', asInessive: 'vitsassa'
  }),
  time_noun: new ObjectTranslation({
    defaultForm: 'aika', asActor: Word.it, asMany: 'ajat',
    asPartitive: 'aikaa', asAllative: 'ajalle', asElative: 'ajasta',
    asGenitive: 'ajan', asAdessive: 'ajalla', asInessive: 'ajassa'
  }),
  voice: new ObjectTranslation({
    defaultForm: 'ääni', asActor: Word.it,
    asPartitive: 'ääntä', asAllative: 'äänelle', asElative: 'äänestä',
    asGenitive: 'äänen', asAdessive: 'äänellä', asInessive: 'äänessä'
  }),
  jam: new ObjectTranslation({ defaultForm: 'hillo', asActor: Word.it }),
  summer: new ObjectTranslation({
    defaultForm: 'kesä', asActor: Word.it,
    asPartitive: 'kesää', asAllative: 'kesälle', asElative: 'kesästä',
    asGenitive: 'kesän', asAdessive: 'kesällä', asInessive: 'kesässä'
  }),
  // Phase 17: Tom Sawyer vocabulary — verbs
  finish: new ActionTranslationFi({
    root: 'lopet', keyVowel: 'a', defaultForm: 'lopettaa', pastParticiple: 'lopettanut',
    negationStem: 'lopeta',
    conjugationRoots: { now: 'lopett', past: 'lopett' },
    conjugations: { now: { he_she_it: 'lopettaa', they: 'lopettavat' } }
  }),
  shout: new ActionTranslationFi({
    root: 'huut', keyVowel: 'a', defaultForm: 'huutaa', pastParticiple: 'huutanut',
    negationStem: 'huuda',
    conjugationRoots: { now: 'huud', past: 'huus' },
    conjugations: { now: { he_she_it: 'huutaa', they: 'huutavat' } }
  }),
  turn: new ActionTranslationFi({
    root: 'käänt', keyVowel: 'y', defaultForm: 'kääntyä', pastParticiple: 'kääntynyt',
    negationStem: 'käänny',
    conjugationRoots: { now: 'käänn', past: 'käänty' }
  }),
  seize: new ActionTranslationFi({
    root: 'tarttu', keyVowel: 'a', defaultForm: 'tarttua', pastParticiple: 'tarttunut',
    negationStem: 'tartu',
    conjugationRoots: { past: 'tarttu' }
  }),
  flee: new ActionTranslationFi({
    root: 'paken', keyVowel: 'e', defaultForm: 'paeta', pastParticiple: 'paennut',
    negationStem: 'pakene',
    conjugationRoots: { past: 'paken' },
    conjugations: { now: { he_she_it: 'pakenee', they: 'pakenevat' } }
  }),
  hover: new ActionTranslationFi({
    root: 'leiju', keyVowel: 'a', defaultForm: 'leijua', pastParticiple: 'leijunut',
    conjugationRoots: { past: 'leiju' }
  }),
  whirl: new ActionTranslationFi({
    root: 'pyör', keyVowel: 'i', defaultForm: 'pyöriä', pastParticiple: 'pyörinyt',
    negationStem: 'pyöri',
    conjugationRoots: { now: 'pyöri', past: 'pyör' },
    conjugations: { now: { he_she_it: 'pyörii', they: 'pyörivät' } }
  }),
  cry: new ActionTranslationFi({
    root: 'itk', keyVowel: 'e', defaultForm: 'itkeä', pastParticiple: 'itkenyt',
    negationStem: 'itke',
    conjugationRoots: { past: 'itk' },
    conjugations: { now: { he_she_it: 'itkee', they: 'itkevät' } }
  }),
  chase: new ActionTranslationFi({
    root: 'jahd', keyVowel: 'a', defaultForm: 'jahtaa', pastParticiple: 'jahtannut',
    negationStem: 'jahtaa',
    conjugationRoots: { now: 'jaht', past: 'jahtas' },
    conjugations: { now: { he_she_it: 'jahtaa', they: 'jahtaavat' } }
  }),
  climb: new ActionTranslationFi({
    root: 'kiipe', keyVowel: 'ä', defaultForm: 'kiivetä', pastParticiple: 'kiivennyt',
    negationStem: 'kiipeä',
    conjugationRoots: { now: 'kiipe', past: 'kiipes' },
    conjugations: { now: { he_she_it: 'kiipeää', they: 'kiipeävät' } }
  }),
  know: new ActionTranslationFi({
    root: 'tied', keyVowel: 'ä', defaultForm: 'tietää', pastParticiple: 'tiennyt',
    negationStem: 'tiedä',
    conjugationRoots: { now: 'tied', past: 'ties' },
    conjugations: { now: { he_she_it: 'tietää', they: 'tietävät' } }
  }),
  lick: new ActionTranslationFi({
    root: 'lyö', keyVowel: '', defaultForm: 'lyödä', pastParticiple: 'lyönyt',
    negationStem: 'lyö',
    conjugationRoots: { past: 'lö' },
    conjugations: { now: { I: 'lyön', you: 'lyöt', you_formal: 'lyöt', he: 'lyö', she: 'lyö', it: 'lyö', we: 'lyömme', you_plural: 'lyötte', you_plural_formal: 'lyötte', they: 'lyövät' } }
  }),
  lift: new ActionTranslationFi({
    root: 'nost', keyVowel: 'a', defaultForm: 'nostaa', pastParticiple: 'nostanut',
    negationStem: 'nosta',
    conjugationRoots: { past: 'nost' },
    conjugations: { now: { he_she_it: 'nostaa', they: 'nostavat' } }
  }),
  disappear: new ActionTranslationFi({
    root: 'kato', keyVowel: 'a', defaultForm: 'kadota', pastParticiple: 'kadonnut',
    negationStem: 'katoa',
    conjugationRoots: { now: 'kato', past: 'katos' },
    conjugations: { now: { he_she_it: 'katoaa', they: 'katoavat' } }
  }),
  play: new ActionTranslationFi({
    root: 'leikki', keyVowel: '', defaultForm: 'leikkiä', pastParticiple: 'leikkinyt',
    negationStem: 'leiki',
    conjugationRoots: { now: 'leikki', past: 'leikk' },
    conjugations: { now: { he_she_it: 'leikkii', they: 'leikkivät' } }
  }),
  dress: new ActionTranslationFi({
    root: 'puke', keyVowel: 'a', defaultForm: 'pukea', pastParticiple: 'pukenut',
    negationStem: 'pue',
    conjugationRoots: { now: 'puke', past: 'puk' },
    conjugations: { now: { he_she_it: 'pukeaa', they: 'pukeavat' } }
  }),
  // Phase 17: Tom Sawyer vocabulary — adjectives
  long: new AdjectiveTranslation({ defaultForm: 'pitkä', forms: { comparative: 'pidempi', superlative: 'pisin' } }),
  slight: new AdjectiveTranslation({ defaultForm: 'hiljainen' }),
  afraid: new AdjectiveTranslation({ defaultForm: 'peloissaan' }),
  young: new AdjectiveTranslation({ defaultForm: 'nuori', forms: { comparative: 'nuorempi', superlative: 'nuorin' } }),
  new_adj: new AdjectiveTranslation({ defaultForm: 'uusi', forms: { comparative: 'uudempi', superlative: 'uusin' } }),
  open_adj: new AdjectiveTranslation({ defaultForm: 'avoin' }),
  surprised: new AdjectiveTranslation({ defaultForm: 'yllättynyt' }),
  // Phase 17: Tom Sawyer vocabulary — adverbs
  cautiously: new AdverbTranslation('varovasti'),
  round_adv: new AdverbTranslation('ympäri'),
  home_adv: new AdverbTranslation('kotiin'),
  // Phase 17: Tom Sawyer vocabulary — prepositions
  in_loc: new PrepositionTranslation({ defaultForm: 'in_loc' }),
  through_prep: new PrepositionTranslation({ defaultForm: 'through_prep' }),
  before_prep: new PrepositionTranslation({ defaultForm: 'before_prep' }),
  about_prep: new PrepositionTranslation({ defaultForm: 'about_prep' }),
  // Phase 17: existential
  there_exists: new Translation(''),
  // Phase 18: Tom Sawyer Chapter 1 extended vocabulary — nouns
  hand: new ObjectTranslation({
    defaultForm: 'käsi', asActor: Word.it, asMany: 'kädet',
    asPartitive: 'kättä', asAllative: 'kädelle', asElative: 'kädestä',
    asGenitive: 'käden', asAdessive: 'kädellä', asInessive: 'kädessä'
  }),
  mouth: new ObjectTranslation({
    defaultForm: 'suu', asActor: Word.it, asMany: 'suut',
    asPartitive: 'suuta', asAllative: 'suulle', asElative: 'suusta',
    asGenitive: 'suun', asAdessive: 'suulla', asInessive: 'suussa'
  }),
  stone: new ObjectTranslation({
    defaultForm: 'kivi', asActor: Word.it, asMany: 'kivet',
    asPartitive: 'kiveä', asAllative: 'kivelle', asElative: 'kivestä',
    asGenitive: 'kiven', asAdessive: 'kivellä', asInessive: 'kivessä'
  }),
  bed: new ObjectTranslation({
    defaultForm: 'sänky', asActor: Word.it, asMany: 'sängyt',
    asPartitive: 'sänkyä', asAllative: 'sängylle', asElative: 'sängystä',
    asGenitive: 'sängyn', asAdessive: 'sängyllä', asInessive: 'sängyssä'
  }),
  closet: new ObjectTranslation({
    defaultForm: 'kaappi', asActor: Word.it, asMany: 'kaapit',
    asPartitive: 'kaappia', asAllative: 'kaapille', asElative: 'kaapista',
    asGenitive: 'kaapin', asAdessive: 'kaapilla', asInessive: 'kaapissa'
  }),
  garden: new ObjectTranslation({
    defaultForm: 'puutarha', asActor: Word.it, asMany: 'puutarhat',
    asPartitive: 'puutarhaa', asAllative: 'puutarhalle', asElative: 'puutarhasta',
    asGenitive: 'puutarhan', asAdessive: 'puutarhalla', asInessive: 'puutarhassa'
  }),
  // Phase 18: Tom Sawyer Chapter 1 extended vocabulary — verbs
  stand: new ActionTranslationFi({
    root: 'seis', keyVowel: 'o', defaultForm: 'seisoa', pastParticiple: 'seisonut',
    conjugationRoots: { past: 'seiso' }
  }),
  laugh: new ActionTranslationFi({
    root: 'naur', keyVowel: 'a', defaultForm: 'nauraa', pastParticiple: 'nauranut',
    conjugationRoots: { now: 'naur', past: 'nauro' },
    conjugations: { now: { he_she_it: 'nauraa', they: 'nauravat' } }
  }),
  say: new ActionTranslationFi({
    root: 'san', keyVowel: 'o', defaultForm: 'sanoa', pastParticiple: 'sanonut',
    conjugationRoots: { past: 'sano' }
  }),
  think: new ActionTranslationFi({
    root: 'ajattel', keyVowel: 'e', defaultForm: 'ajatella', pastParticiple: 'ajatellut',
    negationStem: 'ajattele',
    conjugationRoots: { now: 'ajattel', past: 'ajattel' },
    conjugations: { now: { he_she_it: 'ajattelee', they: 'ajattelevat' } }
  }),
  run: new ActionTranslationFi({
    root: 'juoks', keyVowel: 'e', defaultForm: 'juosta', pastParticiple: 'juossut',
    negationStem: 'juokse',
    conjugationRoots: { now: 'juoks', past: 'juoks' },
    conjugations: { now: { he_she_it: 'juoksee', they: 'juoksevat' } }
  }),
  hit: new ActionTranslationFi({
    root: 'isk', keyVowel: 'e', defaultForm: 'iskeä', pastParticiple: 'iskenyt',
    negationStem: 'iske',
    conjugationRoots: { now: 'isk', past: 'isk' },
    conjugations: { now: { he_she_it: 'iskee', they: 'iskevät' } }
  }),
  throw_action: new ActionTranslationFi({
    root: 'heitt', keyVowel: 'ä', defaultForm: 'heittää', pastParticiple: 'heittänyt',
    negationStem: 'heitä',
    conjugationRoots: { now: 'heit', past: 'heitt' },
    conjugations: { now: { he_she_it: 'heittää', they: 'heittävät' } }
  }),
  // Phase 18: Tom Sawyer Chapter 1 extended vocabulary — adjectives
  dark: new AdjectiveTranslation({ defaultForm: 'pimeä', forms: { comparative: 'pimeämpi', superlative: 'pimein' } }),
  warm: new AdjectiveTranslation({ defaultForm: 'lämmin', forms: { comparative: 'lämpimämpi', superlative: 'lämpimin' } }),
  quiet: new AdjectiveTranslation({ defaultForm: 'hiljainen', forms: { comparative: 'hiljaisempi', superlative: 'hiljaisin' } }),
  gentle: new AdjectiveTranslation({ defaultForm: 'lempeä', forms: { comparative: 'lempeämpi', superlative: 'lempein' } }),
  // Phase 18: Tom Sawyer Chapter 1 extended vocabulary — adverbs
  late_adv: new AdverbTranslation('myöhään'),
  gently: new AdverbTranslation('lempeästi'),
  // Phase 18: Tom Sawyer Chapter 1 extended vocabulary — prepositions
  under: new PrepositionTranslation({ defaultForm: 'under' }),
  in_at: new PrepositionTranslation({ defaultForm: 'in_at' }),
  // Phase 19: Faithful Tom Sawyer encoding
  find: new ActionTranslationFi({
    root: 'löy', keyVowel: 'tä', defaultForm: 'löytää', pastParticiple: 'löytänyt',
    negationStem: 'löydä',
    conjugationRoots: { now: 'löydä', past: 'löys' },
    conjugations: { now: { he_she_it: 'löytää', they: 'löytävät' } }
  }),
  trick: new ObjectTranslation({
    defaultForm: 'temppu', asActor: Word.it, asMany: 'temppuja',
    asPartitive: 'temppua', asAllative: 'tempulle', asElative: 'tempusta',
    asGenitive: 'tempun', asInessive: 'tempussa'
  }),
  torment: new ActionTranslationFi({
    root: 'kiusaa', keyVowel: '', defaultForm: 'kiusata', pastParticiple: 'kiusannut',
    negationStem: 'kiusaa',
    conjugationRoots: { now: 'kiusaa', past: 'kiusas' },
    conjugations: { now: { he_she_it: 'kiusaa', they: 'kiusaavat' } }
  }),
  off_adv: new AdverbTranslation('pois'),
  duty: new ObjectTranslation({
    defaultForm: 'velvollisuus', asActor: Word.it,
    asPartitive: 'velvollisuutta', asGenitive: 'velvollisuuden'
  })
};

class Finnish extends Language {

  constructor(translations: WordTranslations) {
    super('Finnish', translations);
  }

  translateAspectSentence(actor: Word | Actor, action: Word | Action, time: Word, aspect: Word): string {
    if (aspect === Word.progressive) {
      // Finnish: use simple tense for progressive
      return [
        this.translateActor(actor),
        this.translateAction(actor, action, time)
      ].join(' ').trim();
    }

    if (aspect === Word.perfect) {
      const primaryAction = action instanceof Action ? action.primary : action;
      const translation = this.wordTranslations[primaryAction.id] as ActionTranslationFi;
      const resolvedActor = this.resolveActorForConjugation(actor);
      const actorForm = this.translateActor(actor);
      const beTranslation = this.wordTranslations['be'] as ActionTranslation;
      const beForm = beTranslation.timeActorForm(time, resolvedActor);
      const participle = translation.opts.pastParticiple || '';
      const rest = this.getActionRest(action);
      return [actorForm, beForm, participle, rest].filter(Boolean).join(' ').trim();
    }

    return super.translateAspectSentence(actor, action, time, aspect);
  }

  translateConditional(actor: Word | Actor | Entity, action: Word | Action): string {
    const primaryAction = action instanceof Action ? action.primary : action;
    const translation = this.wordTranslations[primaryAction.id] as ActionTranslationFi;
    const resolvedActor = this.resolveActorForConjugation(actor);
    const personId = resolvedActor instanceof Actor ? resolvedActor.person.id : (resolvedActor as Word).id;
    const isNegated = action instanceof Action ? action.negated : false;

    // Finnish conditional: stem + isi + personal ending
    // Key vowels a/o/u are kept before -isi-, while e/i are replaced
    const base = translation.conjugationRoots['now'] || translation.root;
    const keepVowel = /[aou]/.test(translation.keyVowel);
    const stem = keepVowel ? base + translation.keyVowel : base;
    const endings: Record<string, string> = {
      I: 'n', you: 't', you_formal: 't',
      he: '', she: '', it: '',
      we: 'mme', you_plural: 'tte', you_plural_formal: 'tte', they: 'vat'
    };
    const conditionalForm = `${stem}isi${endings[personId] || ''}`;
    const rest = this.getActionRest(action);

    if (isNegated) {
      const aux = NEGATIVE_AUX[personId];
      return [aux, `${stem}isi`, rest].filter(Boolean).join(' ').trim();
    }

    return [conditionalForm, rest].filter(Boolean).join(' ').trim();
  }

  getQuestionSuffix(verbForm: string): string {
    return /[aou]/.test(verbForm) ? 'ko' : 'kö';
  }

  translateQuestion(question: Question): string {
    const { sentence, questionWord } = question;
    const { actor, action, time } = sentence;

    const primaryAction = action instanceof Action ? action.primary : action;
    const translation = this.wordTranslations[primaryAction.id] as ActionTranslationFi;
    const resolvedActor = this.resolveActorForConjugation(actor);
    const verbForm = translation.timeActorForm(time, resolvedActor);
    const actorForm = this.translateActor(actor);
    const rest = this.getActionRest(action);

    if (questionWord) {
      const qWordForm = this.translateWord(questionWord);
      return [qWordForm, verbForm, actorForm, rest].filter(Boolean).join(' ').trim() + '?';
    }

    // Yes/no: verb+ko/kö
    const suffix = this.getQuestionSuffix(verbForm);
    const questionVerb = `${verbForm}${suffix}`;
    return [questionVerb, actorForm, rest].filter(Boolean).join(' ').trim() + '?';
  }

  translateObject(object: Word, specifier: Word | undefined, context?: { isSubject?: boolean; adjective?: Word; adjectiveDegree?: import('./grammar').AdjectiveDegree; possessor?: Word }): string {
    const objectTranslation = this.wordTranslations[object.id] as ObjectTranslation;
    const objectForm = this.translateWord(object, context);
    const adjectiveForm = context?.adjective ? this.translateAdjective(context.adjective, object, context.adjectiveDegree) : undefined;
    const possessiveForm = context?.possessor ? this.translatePossessive(context.possessor) : undefined;

    let nounForm: string;
    if ((specifier === Word.many) && isDefined(objectTranslation.asMany)) {
      nounForm = objectTranslation.asMany as string;
    } else {
      nounForm = objectForm;
    }
    return [possessiveForm, adjectiveForm, nounForm].filter(Boolean).join(' ');
  }

  translatePrepositionalPhrase(pp: PrepositionalPhrase): string {
    const objectWord = pp.object instanceof Entity ? pp.object.word : pp.object;
    const objectTranslation = this.wordTranslations[objectWord.id] as ObjectTranslation;
    // Case-only prepositions (no separate preposition word needed)
    const caseOnlyMap: Record<string, string> = {
      to: 'asAllative', from: 'asElative', at: 'asPartitive',
      in_loc: 'asInessive', through_prep: 'asElative', about_prep: 'asElative', in_at: 'asElative'
    };
    const caseKey = caseOnlyMap[pp.preposition.id];
    if (caseKey && objectTranslation && objectTranslation[caseKey]) {
      const caseForm = objectTranslation[caseKey] as string;
      if (pp.object instanceof Entity && pp.object.adjective) {
        const adjForm = this.translateAdjective(pp.object.adjective, objectWord, pp.object.adjectiveDegree);
        return `${adjForm} ${caseForm}`;
      }
      return caseForm;
    }
    // Postpositions: genitive + postposition word
    const postpositionMap: Record<string, string> = {
      over: 'yli', behind: 'takana', before_prep: 'edessä', under: 'alla'
    };
    const postposition = postpositionMap[pp.preposition.id];
    if (postposition && objectTranslation && objectTranslation['asGenitive']) {
      const genForm = objectTranslation['asGenitive'] as string;
      if (pp.object instanceof Entity && pp.object.adjective) {
        const adjForm = this.translateAdjective(pp.object.adjective, objectWord, pp.object.adjectiveDegree);
        return `${adjForm} ${genForm} ${postposition}`;
      }
      return `${genForm} ${postposition}`;
    }
    return super.translatePrepositionalPhrase(pp);
  }

  translateImperative(action: Word | Action, _actor: Word | Actor): string {
    const primaryAction = action instanceof Action ? action.primary : action;
    const isNegated = action instanceof Action ? action.negated : false;
    const actionSubject = action instanceof Action ? action.subject : undefined;
    const translation = this.wordTranslations[primaryAction.id] as ActionTranslationFi;
    const form = translation?.opts?.imperative || translation?.negationStem || translation?.defaultForm || this.translateWord(primaryAction);
    let result = isNegated ? `älä ${form}` : form;
    if (actionSubject) {
      // Finnish imperative objects use nominative, not accusative
      let subjectWord: Word;
      let specifier: Word | undefined;
      let adjective: Word | undefined;
      let possessor: Word | undefined;
      if (actionSubject instanceof Entity) {
        subjectWord = actionSubject.word;
        specifier = actionSubject.specifier;
        adjective = actionSubject.adjective;
        possessor = actionSubject.possessor;
      } else {
        subjectWord = actionSubject;
      }
      result = `${result} ${this.translateObject(subjectWord, specifier, { adjective, possessor })}`;
    }
    if (action instanceof Action && action.prepositionalPhrases.length > 0) {
      const ppForms = action.prepositionalPhrases.map((pp: PrepositionalPhrase) => this.translatePrepositionalPhrase(pp));
      result = `${result} ${ppForms.join(' ')}`;
    }
    return result;
  }

  translatePossessive(possessor: Word): string {
    return POSSESSIVE_FORMS[possessor.id] || possessor.id;
  }

  insertNegatedAdverb(verbPhrase: string, adverbForm: string): string {
    return `${verbPhrase} ei ${adverbForm}`;
  }

  translateActor(actor: Word | Actor | Entity): string {
    if (actor instanceof Entity) return super.translateActor(actor);
    return this.isActualPerson(actor) ? '' : super.translateActor(actor);
  }
}

export default new Finnish(translations);
