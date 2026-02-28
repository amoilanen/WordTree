import { Translation, ObjectTranslation, ActionTranslation, ActionTranslationOpts, AdjectiveTranslation, AdverbTranslation, Language, WordTranslations } from './lang';
import { Word, Actor } from './grammar';
import { isDefined } from './util';

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
  I: new Translation('minä'),
  you: new ObjectTranslation({
    defaultForm: 'sinä',
    asActor: Word.you,
    asSubject: 'sinut'
  }),
  you_formal: new Translation('sinä'),
  he: new Translation('hän'),
  she: new Translation('hän'),
  it: new ObjectTranslation({
    defaultForm: 'se',
    asActor: Word.it,
    asSubject: 'sitä'
  }),
  we: new Translation('me'),
  you_plural: new Translation('te'),
  you_plural_formal: new Translation('te'),
  they: new Translation('ne'),
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
    asMany: 'järviä'
  }),
  bird: new ObjectTranslation({
    defaultForm: 'lintu',
    asActor: Word.it,
    asMany: 'lintuja'
  }),
  wolf: new ObjectTranslation({
    defaultForm: 'susi',
    asActor: Word.it,
    asMany: 'susia'
  }),
  bright: new AdjectiveTranslation({ defaultForm: 'kirkas' }),
  old: new AdjectiveTranslation({ defaultForm: 'vanha' }),
  big: new AdjectiveTranslation({ defaultForm: 'suuri' }),
  small: new AdjectiveTranslation({ defaultForm: 'pieni' }),
  good: new AdjectiveTranslation({ defaultForm: 'hyvä' }),
  white: new AdjectiveTranslation({ defaultForm: 'valkoinen' }),
  loudly: new AdverbTranslation('kovaa'),
  slowly: new AdverbTranslation('hitaasti'),
  quickly: new AdverbTranslation('nopeasti'),
  well: new AdverbTranslation('hyvin')
};

class Finnish extends Language {

  constructor(translations: WordTranslations) {
    super('Finnish', translations);
  }

  translateObject(object: Word, specifier: Word | undefined, context?: { isSubject?: boolean; adjective?: Word }): string {
    const objectTranslation = this.wordTranslations[object.id] as ObjectTranslation;
    const objectForm = this.translateWord(object, context);
    const adjectiveForm = context?.adjective ? this.translateAdjective(context.adjective, object) : undefined;

    let nounForm: string;
    if ((specifier === Word.many) && isDefined(objectTranslation.asMany)) {
      nounForm = objectTranslation.asMany as string;
    } else {
      nounForm = objectForm;
    }
    return adjectiveForm ? `${adjectiveForm} ${nounForm}` : nounForm;
  }

  insertNegatedAdverb(verbPhrase: string, adverbForm: string): string {
    return `${verbPhrase} ei ${adverbForm}`;
  }

  translateActor(actor: Word | Actor): string {
    return this.isActualPerson(actor) ? '' : super.translateActor(actor);
  }
}

export default new Finnish(translations);
