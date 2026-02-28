import { Translation, ObjectTranslation, ActionTranslation, ActionTranslationOpts, AdjectiveTranslation, AdverbTranslation, PrepositionTranslation, Language, WordTranslations } from './lang';
import { Word, Actor, Action, Entity } from './grammar';
import { isDefined } from './util';

const POSSESSIVE_FORMS: Record<string, string> = {
  I: 'mijn', you: 'jouw', you_formal: 'uw',
  he: 'zijn', she: 'haar', it: 'zijn',
  we: 'ons', you_plural: 'jullie', you_plural_formal: 'uw', they: 'hun'
};

class ActionTranslationNl extends ActionTranslation {

  constructor(opts: ActionTranslationOpts) {
    opts.defaultForm = opts.root + 'en';
    if (!isDefined(opts.conjugationRoots)) {
      opts.conjugationRoots = {};
    }
    if (!isDefined(opts.conjugationRoots!['past'])) {
      opts.conjugationRoots!['past'] = `${opts.root}d`;
    }
    opts.futureMatchesNow = true;
    super(opts);
    super.conjugate();
  }

  getPresentForms(): Record<string, string> {
    const base = this.conjugationRoots.now;
    const otherPersonForm = `${base}t`;
    const pluralForm = `${base}en`;

    return {
      I: base,
      you: otherPersonForm,
      you_formal: otherPersonForm,
      he: otherPersonForm,
      she: otherPersonForm,
      it: otherPersonForm,
      we: pluralForm,
      you_plural_formal: pluralForm,
      you_plural: pluralForm,
      they: pluralForm
    };
  }

  getPastForms(): Record<string, string> {
    const base = this.conjugationRoots.past;
    const pluralForm = `${base}en`;

    return {
      I: base,
      you: base,
      you_formal: base,
      he: base,
      she: base,
      it: base,
      we: pluralForm,
      you_plural_formal: pluralForm,
      you_plural: pluralForm,
      they: pluralForm
    };
  }

  getNegatedTimeActorForm(time: Word, actor: Word | Actor): string {
    return `${this.timeActorForm(time, actor)} niet`;
  }

  getNegatedPrimaryTimeActorForm(time: Word, actor: Word | Actor): string {
    return `${this.timeActorForm(time, actor)} niet`;
  }
}

const translations: WordTranslations = {
  sun: new ObjectTranslation({
    defaultForm: 'zon',
    asActor: Word.it
  }),
  sing: new ActionTranslationNl({
    root: 'zing',
    conjugationRoots: {
      past: 'zong'
    }
  }),
  do: new ActionTranslationNl({
    root: 'do',
    conjugationRoots: {
      now: 'doe',
      past: 'deed'
    },
    conjugations: {
      now: {
        plural: 'doen'
      }
    }
  }),
  go: new ActionTranslationNl({
    root: 'ga',
    conjugationRoots: {
      past: 'ging'
    },
    conjugations: {
      now: {
        other_single: 'gaat',
        plural: 'gaan'
      }
    }
  }),
  sew: new ActionTranslationNl({
    root: 'naai',
    conjugations: {
      past: {
        I: 'naaide',
        other_single: 'naaide'
      }
    }
  }),
  build: new ActionTranslationNl({
    root: 'bouw',
    conjugations: {
      past: {
        I: 'bouwde',
        other_single: 'bouwde'
      }
    }
  }),
  give: new ActionTranslationNl({
    root: 'gev',
    conjugationRoots: {
      now: 'geef',
      past: 'gaf'
    },
    conjugations: {
      now: {
        plural: 'geven'
      },
      past: {
        plural: 'gaven'
      }
    }
  }),
  look: new ActionTranslationNl({
    root: 'kijk',
    conjugationRoots: {
      past: 'keek'
    },
    conjugations: {
      past: {
        plural: 'keken'
      }
    }
  }),
  see: new ActionTranslationNl({
    root: 'zie',
    conjugationRoots: {
      past: 'zag'
    },
    conjugations: {
      now: {
        plural: 'zien'
      }
    }
  }),
  want: new ActionTranslationNl({
    root: 'wil',
    conjugationRoots: {
      past: 'wilde'
    },
    conjugations: {
      now: {
        he_she_it: 'wil',
        plural: 'willen'
      },
      past: {
        plural: 'wilden'
      }
    }
  }),
  can: new ActionTranslationNl({
    root: 'kan',
    conjugationRoots: {
      past: 'kond'
    },
    conjugations: {
      now: {
        you: 'kunt',
        you_formal: 'kunt',
        he_she_it: 'kan',
        plural: 'kunnen'
      },
      past: {
        I: 'kon',
        other_single: 'kon'
      }
    }
  }),
  shine: new ActionTranslationNl({
    root: 'schijn',
    conjugationRoots: {
      past: 'scheen'
    },
    conjugations: {
      past: {
        plural: 'schenen'
      }
    }
  }),
  be: new ActionTranslationNl({
    root: 'zijn',
    selfNegating: true,
    conjugations: {
      now: {
        I: 'ben',
        you: 'bent', you_formal: 'bent',
        he: 'is', she: 'is', it: 'is',
        we: 'zijn', you_plural: 'zijn', you_plural_formal: 'zijn',
        they: 'zijn'
      },
      past: {
        I: 'was',
        you: 'was', you_formal: 'was',
        he: 'was', she: 'was', it: 'was',
        we: 'waren', you_plural: 'waren', you_plural_formal: 'waren',
        they: 'waren'
      }
    }
  }),
  now: new Translation('nu'),
  future: new Translation('toekomst'),
  past: new Translation('verleden'),
  I: new Translation('ik'),
  you: new Translation('je'),
  you_formal: new Translation('u'),
  he: new Translation('hij'),
  she: new Translation('zij'),
  it: new Translation('het'),
  we: new Translation('we'),
  you_plural: new Translation('jullie'),
  you_plural_formal: new Translation('u'),
  they: new Translation('ze'),
  wet_snow_with_mud_and_ground: new Translation('sneeuw'),
  snow_on_tree_branch: new Translation('sneeuw'),
  snow: new ObjectTranslation({
    defaultForm: 'sneeuw',
    asActor: Word.it,
    isCountable: false
  }),
  this: new Translation('dit'),
  that: new Translation('dat'),
  one: new Translation('een'),
  one_of_some_kind: new Translation('een'),
  lake: new ObjectTranslation({
    defaultForm: 'meer',
    asActor: Word.it,
    asSpecificObject: 'het',
    asMany: 'meren'
  }),
  bird: new ObjectTranslation({
    defaultForm: 'vogel',
    asActor: Word.it,
    asMany: 'vogels'
  }),
  wolf: new ObjectTranslation({
    defaultForm: 'wolf',
    asActor: Word.it,
    asMany: 'wolven'
  }),
  house: new ObjectTranslation({
    defaultForm: 'huis',
    asActor: Word.it,
    asSpecificObject: 'het'
  }),
  bright: new AdjectiveTranslation({ defaultForm: 'fel', forms: { attributive: 'felle' } }),
  old: new AdjectiveTranslation({ defaultForm: 'oud', forms: { attributive: 'oude' } }),
  big: new AdjectiveTranslation({ defaultForm: 'groot', forms: { attributive: 'grote' } }),
  small: new AdjectiveTranslation({ defaultForm: 'klein', forms: { attributive: 'kleine' } }),
  good: new AdjectiveTranslation({ defaultForm: 'goed', forms: { attributive: 'goede' } }),
  white: new AdjectiveTranslation({ defaultForm: 'wit', forms: { attributive: 'witte' } }),
  loudly: new AdverbTranslation('hard'),
  slowly: new AdverbTranslation('langzaam'),
  quickly: new AdverbTranslation('snel'),
  well: new AdverbTranslation('goed'),
  and: new Translation('en'),
  but: new Translation('maar'),
  or: new Translation('of'),
  to: new PrepositionTranslation({ defaultForm: 'naar' }),
  from: new PrepositionTranslation({ defaultForm: 'van' }),
  at: new PrepositionTranslation({ defaultForm: 'naar' }),
  over: new PrepositionTranslation({ defaultForm: 'over' }),
  behind: new PrepositionTranslation({ defaultForm: 'achter' })
};

//TODO: Create a separate class ObjectTranslationNl and move most of the logic now in the language class to their: mode modular and object-oriented
//TODO: Define the proper articles for all ObjectTranslation for Dutch
class Dutch extends Language {

  constructor(translations: WordTranslations) {
    super('Dutch', translations);
  }

  //TODO: Do we need a separate method 'getArticleForObject'?
  getArticleForObject(_object: Word): string {
    //TODO: Implement getting the actual article, should depend also on the specifier, merge with getArticle method
    return 'de';
  }

  getArticle(specifier: Word | undefined, objectTranslation: ObjectTranslation): string {
    const wordThis = (Word as unknown as Record<string, Word>)['this'];
    if (specifier === wordThis || specifier === Word.that) {
      return isDefined(objectTranslation.asSpecificObject) ? objectTranslation.asSpecificObject as string : 'de';
    }
    if (specifier === Word.one) {
      return objectTranslation.isCountable ? 'een' : '';
    }
    return '';
  }

  translateImperative(action: Word | Action, _actor: Word | Actor): string {
    const primaryAction = action instanceof Action ? action.primary : action;
    const isNegated = action instanceof Action ? action.negated : false;
    const actionSubject = action instanceof Action ? action.subject : undefined;
    const translation = this.wordTranslations[primaryAction.id] as ActionTranslation;
    // Dutch imperative is the I-form (stem) from present tense
    const form = translation?.timeActorForm(Word.now, Word.I) || this.translateWord(primaryAction);
    let result = isNegated ? `${form} niet` : form;
    if (actionSubject) {
      result = `${result} ${this.translateActionSubject(actionSubject)}`;
    }
    return result;
  }

  translatePossessive(possessor: Word, object?: Word): string {
    const form = POSSESSIVE_FORMS[possessor.id] || possessor.id;
    // "ons" is only for het-words; de-words use "onze"
    if (form === 'ons' && object) {
      const objectTranslation = this.wordTranslations[object.id];
      if (objectTranslation instanceof ObjectTranslation && objectTranslation.asSpecificObject !== 'het') {
        return 'onze';
      }
    }
    return form;
  }

  translateObject(object: Word, specifier: Word | undefined, context?: { isSubject?: boolean; adjective?: Word; possessor?: Word }): string {
    const objectTranslation = this.wordTranslations[object.id] as ObjectTranslation;
    const objectForm = this.translateWord(object, context);
    const adjectiveForm = context?.adjective ? this.translateAdjective(context.adjective, object) : undefined;
    const possessiveForm = context?.possessor ? this.translatePossessive(context.possessor, object) : undefined;

    // Possessive replaces article
    if (possessiveForm) {
      if (specifier === Word.many) {
        const nounForm = isDefined(objectTranslation.asMany) ? objectTranslation.asMany as string : `${objectForm}en`;
        return [possessiveForm, adjectiveForm, nounForm].filter(Boolean).join(' ');
      }
      return [possessiveForm, adjectiveForm, objectForm].filter(Boolean).join(' ');
    }

    if (specifier !== Word.many) {
      return [this.getArticle(specifier, objectTranslation), adjectiveForm, objectForm].filter(s => s !== '' && s !== undefined).join(' ').trim();
    } else {
      const nounForm = isDefined(objectTranslation.asMany) ? objectTranslation.asMany as string : `${objectForm}en`;
      return adjectiveForm ? `${adjectiveForm} ${nounForm}` : nounForm;
    }
  }

  translateAdjective(adjective: Word, _object?: Word): string {
    const translation = this.wordTranslations[adjective.id];
    if (translation instanceof AdjectiveTranslation && translation.forms?.attributive) {
      return translation.forms.attributive;
    }
    return translation ? translation.defaultForm : adjective.id;
  }

  insertNegatedAdverb(verbPhrase: string, adverbForm: string): string {
    return `${verbPhrase} niet ${adverbForm}`;
  }

  translateActor(actor: Word | import('./grammar').Actor): string {
    return this.isActualPerson(actor) ? super.translateActor(actor) : `${this.getArticleForObject(actor as Word)} ${super.translateActor(actor)}`;
  }
}

export default new Dutch(translations);
