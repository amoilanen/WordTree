import { Translation, ObjectTranslation, ActionTranslation, ActionTranslationOpts, Language, WordTranslations } from './lang';
import { Word } from './grammar';
import { isDefined, extend } from './util';

class ActionTranslationEn extends ActionTranslation {

  constructor(opts: ActionTranslationOpts) {
    opts.defaultForm = opts.root;
    super(opts);
    this.opts.dependentActionConnector = isDefined(this.opts.dependentActionConnector) ?
      this.opts.dependentActionConnector : 'to';
    super.conjugate();
  }

  getPresentForms(): Record<string, string> {
    return extend(this.forAllPersons(this.defaultForm), {
      he: this.defaultForm + 's',
      she: this.defaultForm + 's',
      it: this.defaultForm + 's'
    }) as Record<string, string>;
  }

  getFutureForms(): Record<string, string> {
    return this.forAllPersons(`will ${this.defaultForm}`);
  }

  getPastForms(): Record<string, string> {
    return this.forAllPersons(`${this.defaultForm}ed`);
  }

  asPrimaryTimeActorForm(time: Word, actor: Word | import('./grammar').Actor): string {
    return `${this.timeActorForm(time, actor)} ${this.opts.dependentActionConnector}`.trim();
  }
}

const translations: WordTranslations = {
  sun: new ObjectTranslation({
    defaultForm: 'sun',
    asActor: Word.it
  }),
  sing: new ActionTranslationEn({
    root: 'sing',
    conjugations: {
      past: 'sang'
    }
  }),
  do: new ActionTranslationEn({
    root: 'do',
    conjugations: {
      now: {
        he_she_it: 'does'
      },
      past: 'did'
    }
  }),
  sew: new ActionTranslationEn({
    root: 'sew'
  }),
  go: new ActionTranslationEn({
    root: 'go',
    conjugations: {
      now: {
        he_she_it: 'goes'
      },
      past: 'went'
    }
  }),
  build: new ActionTranslationEn({
    root: 'build',
    conjugations: {
      past: 'built'
    }
  }),
  give: new ActionTranslationEn({
    root: 'give',
    conjugations: {
      past: 'gave'
    }
  }),
  look: new ActionTranslationEn({
    root: 'look'
  }),
  see: new ActionTranslationEn({
    root: 'see',
    conjugations: {
      past: 'saw'
    }
  }),
  want: new ActionTranslationEn({
    root: 'want'
  }),
  can: new ActionTranslationEn({
    root: 'can',
    dependentActionConnector: '',
    conjugations: {
      now: 'can',
      future: 'can',
      past: 'could'
    }
  }),
  shine: new ActionTranslationEn({
    root: 'shine',
    conjugations: {
      past: 'shone'
    }
  }),
  now: new Translation('now'),
  future: new Translation('future'),
  past: new Translation('past'),
  I: new Translation('I'),
  you: new Translation('you'),
  you_formal: new Translation('you'),
  he: new Translation('he'),
  she: new Translation('she'),
  it: new Translation('it'),
  we: new Translation('we'),
  you_plural: new Translation('you'),
  you_plural_formal: new Translation('you'),
  they: new Translation('they'),
  wet_snow_with_mud_and_ground: new ObjectTranslation({
    defaultForm: 'snow',
    asActor: Word.it,
    isCountable: false
  }),
  snow_on_tree_branch: new ObjectTranslation({
    defaultForm: 'snow',
    asActor: Word.it,
    isCountable: false
  }),
  snow: new ObjectTranslation({
    defaultForm: 'snow',
    asActor: Word.it,
    isCountable: false
  }),
  this: new Translation('this'),
  that: new Translation('that'),
  one: new Translation('one'),
  one_of_some_kind: new Translation('a'),
  lake: new Translation('lake'),
  bird: new Translation('bird'),
  wolf: new ObjectTranslation({
    defaultForm: 'wolf',
    asActor: Word.it,
    asMany: 'wolves'
  })
};

class English extends Language {

  constructor(translations: WordTranslations) {
    super('English', translations);
  }

  getArticle(specifier: Word | undefined, objectTranslation: ObjectTranslation): string | undefined {
    const wordThis = (Word as unknown as Record<string, Word>)['this'];
    if (specifier === wordThis || specifier === Word.that) {
      return 'the';
    }
    if ((specifier === Word.one) && objectTranslation.isCountable) {
      return 'a';
    }
    return undefined;
  }

  translateObject(object: Word, specifier: Word | undefined, context?: { isSubject?: boolean }): string {
    const objectTranslation = this.wordTranslations[object.id] as ObjectTranslation;
    const objectForm = this.translateWord(object, context);
    const wordThis = (Word as unknown as Record<string, Word>)['this'];

    if (specifier === wordThis || specifier === Word.that || specifier === Word.one) {
      return [this.getArticle(specifier, objectTranslation), objectForm].filter(Boolean).join(' ').trim();
    } else if (specifier === Word.many) {
      if (isDefined(objectTranslation.asMany)) {
        return objectTranslation.asMany as string;
      }
      return objectForm + 's';
    }
    return objectForm;
  }
}

export default new English(translations);
