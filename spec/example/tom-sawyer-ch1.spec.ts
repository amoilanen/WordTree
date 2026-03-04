/**
 * The Adventures of Tom Sawyer — Chapter I
 * by Mark Twain (1876)
 *
 * Each sentence from the narrative is encoded as a formal grammar
 * representation and verified individually against its expected English,
 * Finnish, Dutch, and Russian translations.
 *
 * Source text: https://www.gutenberg.org/cache/epub/74/pg74.txt
 */
import { Word, Entity, Action, Sentence, CompoundSentence, Question, PrepositionalPhrase, SubordinateSentence } from '../../src/grammar';
import en from '../../src/lang.en';
import fi from '../../src/lang.fi';
import nl from '../../src/lang.nl';
import ru from '../../src/lang.ru';

const wordThis = (Word as unknown as Record<string, Word>)['this'];
const wordDo = (Word as unknown as Record<string, Word>)['do'];

describe('Tom Sawyer Chapter 1', function() {

  // ── 1. OPENING: Aunt Polly searches for Tom ───────────────────────────

  // Original: "The old lady pulled her spectacles down and looked over
  //            them about the room"
  it('the old lady pulled her spectacles down and looked over them about the room', function() {
    const s = CompoundSentence.$
      .sentence(Sentence.$.actor(Entity.$(Word.lady).specifier(wordThis).adjective(Word.old).$)
        .action(Action.$.primary(Word.pull).subject(Entity.$(Word.spectacles).possessor(Word.she).$).adverb(Word.down_adv).$)
        .time(Word.past).$)
      .coordinator(Word.and)
      .sentence(Sentence.$.actor(Entity.$(Word.lady).specifier(wordThis).adjective(Word.old).$)
        .action(Action.$.primary(Word.look)
          .prepositionalPhrase(PrepositionalPhrase.$(Word.over).object(Word.they).$)
          .prepositionalPhrase(PrepositionalPhrase.$(Word.around_prep).object(Entity.$(Word.room).specifier(wordThis).$).$).$)
        .time(Word.past).$).$;
    expect(en.translate(s)).toBe('the old lady pulled her spectacles down and looked over them about the room');
    expect(fi.translate(s)).toBe('vanha rouva veti hänen silmälasit alas ja katsoi niiden yli huoneen ympäri');
    expect(nl.translate(s)).toBe('de oude dame trok haar bril omlaag en keek erover door de kamer');
    expect(ru.translate(s)).toBe('старая дама вниз тянула свои очки и смотрела над ними по комнате');
  });

  // Original: "She did not finish, for by this time she was bending down
  //            and punching under the bed with the broom"
  it('she did not finish because she was punching under the bed with the broom', function() {
    const s = SubordinateSentence.$
      .main(Sentence.$.actor(Word.she)
        .action(Action.$.primary(Word.finish).negated().$)
        .time(Word.past).$)
      .subordinator(Word.because)
      .subordinate(Sentence.$.actor(Word.she)
        .action(Action.$.primary(Word.punch)
          .prepositionalPhrase(PrepositionalPhrase.$(Word.under).object(Entity.$(Word.bed).specifier(wordThis).$).$)
          .prepositionalPhrase(PrepositionalPhrase.$(Word.with_prep).object(Entity.$(Word.broom).specifier(wordThis).$).$).$)
        .time(Word.past)
        .aspect(Word.progressive).$).$;
    expect(en.translate(s)).toBe('she did not finish because she was punching under the bed with the broom');
    expect(fi.translate(s)).toBe('ei lopettanut koska tunki sängyn alla luudalla');
    expect(nl.translate(s)).toBe('zij eindigde niet omdat zij onder het bed met de bezem aan het porren was');
    expect(ru.translate(s)).toBe('она не заканчивала потому что она тыкала под кроватью с метлой');
  });

  // Original: "She did not finish, for by this time she was bending down
  //            and punching under the bed with the broom"
  it('she looked under the bed', function() {
    const s = Sentence.$.actor(Word.she)
      .action(Action.$.primary(Word.look)
        .prepositionalPhrase(PrepositionalPhrase.$(Word.under).object(Entity.$(Word.bed).specifier(wordThis).$).$).$)
      .time(Word.past).$;
    expect(en.translate(s)).toBe('she looked under the bed');
    expect(fi.translate(s)).toBe('katsoi sängyn alla');
    expect(nl.translate(s)).toBe('zij keek onder het bed');
    expect(ru.translate(s)).toBe('она смотрела под кроватью');
  });

  // Original: "She resurrected nothing but the cat."
  it('she found the cat', function() {
    const s = Sentence.$.actor(Word.she)
      .action(Action.$.primary(Word.find).subject(Entity.$(Word.cat).specifier(wordThis).$).$)
      .time(Word.past).$;
    expect(en.translate(s)).toBe('she found the cat');
    expect(fi.translate(s)).toBe('löysi kissa');
    expect(nl.translate(s)).toBe('zij vond de kat');
    expect(ru.translate(s)).toBe('она находила кота');
  });

  // Original: "She went to the open door and stood in it and looked out
  //            among the tomato vines"
  it('she went to the open door', function() {
    const s = Sentence.$.actor(Word.she)
      .action(Action.$.primary(Word.go)
        .prepositionalPhrase(PrepositionalPhrase.$(Word.to).object(Entity.$(Word.door).specifier(wordThis).adjective(Word.open_adj).$).$).$)
      .time(Word.past).$;
    expect(en.translate(s)).toBe('she went to the open door');
    expect(fi.translate(s)).toBe('meni avoin ovelle');
    expect(nl.translate(s)).toBe('zij ging naar de open deur');
    expect(ru.translate(s)).toBe('она шла к открытая двери');
  });

  // Original: "She went to the open door and stood in it and looked out
  //            among the tomato vines"
  it('she stood in the door', function() {
    const s = Sentence.$.actor(Word.she)
      .action(Action.$.primary(Word.stand)
        .prepositionalPhrase(PrepositionalPhrase.$(Word.in_loc).object(Entity.$(Word.door).specifier(wordThis).$).$).$)
      .time(Word.past).$;
    expect(en.translate(s)).toBe('she stood in the door');
    expect(fi.translate(s)).toBe('seisoi ovessa');
    expect(nl.translate(s)).toBe('zij stond in de deur');
    expect(ru.translate(s)).toBe('она стояла в двери');
  });

  // Original: "she lifted up her voice at an angle calculated for distance
  //            and shouted"
  it('she lifted her voice and shouted', function() {
    const s = CompoundSentence.$
      .sentence(Sentence.$.actor(Word.she)
        .action(Action.$.primary(Word.lift).subject(Entity.$(Word.voice).possessor(Word.she).$).$)
        .time(Word.past).$)
      .coordinator(Word.and)
      .sentence(Sentence.$.actor(Word.she).action(Word.shout).time(Word.past).$).$;
    expect(en.translate(s)).toBe('she lifted her voice and shouted');
    expect(fi.translate(s)).toBe('nosti hänen ääni ja huusi');
    expect(nl.translate(s)).toBe('zij tilde haar stem en schreeuwde');
    expect(ru.translate(s)).toBe('она поднимала свой голос и кричала');
  });

  // ── 2. TOM IS CAUGHT ──────────────────────────────────────────────────

  // Original: "she turned just in time to seize a small boy by the slack
  //            of his roundabout"
  it('she turned and seized a small boy', function() {
    const s = CompoundSentence.$
      .sentence(Sentence.$.actor(Word.she).action(Word.turn).time(Word.past).$)
      .coordinator(Word.and)
      .sentence(Sentence.$.actor(Word.she)
        .action(Action.$.primary(Word.seize).subject(Entity.$(Word.boy).specifier(Word.one).adjective(Word.small).$).$)
        .time(Word.past).$).$;
    expect(en.translate(s)).toBe('she turned and seized a small boy');
    expect(fi.translate(s)).toBe('kääntyi ja tarttui pieni poika');
    expect(nl.translate(s)).toBe('zij draaide en greep een kleine jongen');
    expect(ru.translate(s)).toBe('она повернула и хватала маленький мальчика');
  });

  // Original: "Look at your hands."
  it('look at your hands', function() {
    const s = Sentence.$.actor(Word.you)
      .action(Action.$.primary(Word.look)
        .prepositionalPhrase(PrepositionalPhrase.$(Word.at).object(Entity.$(Word.hand).specifier(Word.many).possessor(Word.you).$).$).$)
      .time(Word.imperative).$;
    expect(en.translate(s)).toBe('look at your hands');
    expect(fi.translate(s)).toBe('katso kättä');
    expect(nl.translate(s)).toBe('kijk naar jouw handen');
    expect(ru.translate(s)).toBe('смотри на руку');
  });

  // Original: "And look at your mouth."
  it('look at your mouth', function() {
    const s = Sentence.$.actor(Word.you)
      .action(Action.$.primary(Word.look)
        .prepositionalPhrase(PrepositionalPhrase.$(Word.at).object(Entity.$(Word.mouth).possessor(Word.you).$).$).$)
      .time(Word.imperative).$;
    expect(en.translate(s)).toBe('look at your mouth');
    expect(fi.translate(s)).toBe('katso suuta');
    expect(nl.translate(s)).toBe('kijk naar jouw mond');
    expect(ru.translate(s)).toBe('смотри на рот');
  });

  // Original: "I don't know, aunt."
  it('I do not know', function() {
    const s = Sentence.$.actor(Word.I)
      .action(Action.$.primary(Word.know).negated().$)
      .time(Word.now).$;
    expect(en.translate(s)).toBe('I do not know');
    expect(fi.translate(s)).toBe('en tiedä');
    expect(nl.translate(s)).toBe('ik weet niet');
    expect(ru.translate(s)).toBe('я не знаю');
  });

  // Original: "Well, I know. It's jam—that's what it is."
  it('it is jam', function() {
    const s = Sentence.$.actor(Word.it)
      .action(Action.$.primary(Word.be).subject(Word.jam).$)
      .time(Word.now).$;
    expect(en.translate(s)).toBe('it is jam');
    expect(fi.translate(s)).toBe('on hillo');
    expect(nl.translate(s)).toBe('het is jam');
    expect(ru.translate(s)).toBe('оно варенье');
  });

  // Original: "Hand me that switch."
  it('give the switch to me', function() {
    const s = Sentence.$.actor(Word.you)
      .action(Action.$.primary(Word.give)
        .subject(Entity.$(Word.switch_noun).specifier(Word.that).$)
        .prepositionalPhrase(PrepositionalPhrase.$(Word.to).object(Word.I).$).$)
      .time(Word.imperative).$;
    expect(en.translate(s)).toBe('give the switch to me');
    expect(fi.translate(s)).toBe('anna vitsa minulle');
    expect(nl.translate(s)).toBe('geef de roede naar mij');
    expect(ru.translate(s)).toBe('давай розгу ко мне');
  });

  // Original: "The switch hovered in the air—the peril was desperate—"
  it('the switch hovered in the air', function() {
    const s = Sentence.$.actor(Entity.$(Word.switch_noun).specifier(wordThis).$)
      .action(Action.$.primary(Word.hover)
        .prepositionalPhrase(PrepositionalPhrase.$(Word.in_loc).object(Entity.$(Word.air).specifier(wordThis).$).$).$)
      .time(Word.past).$;
    expect(en.translate(s)).toBe('the switch hovered in the air');
    expect(fi.translate(s)).toBe('vitsa leijui ilmassa');
    expect(nl.translate(s)).toBe('de roede zweefde in de lucht');
    expect(ru.translate(s)).toBe('розга парила в воздухе');
  });

  // ── 3. TOM ESCAPES ────────────────────────────────────────────────────

  // Original: "My! Look behind you, aunt!"
  it('look behind you', function() {
    const s = Sentence.$.actor(Word.you)
      .action(Action.$.primary(Word.look)
        .prepositionalPhrase(PrepositionalPhrase.$(Word.behind).object(Word.you).$).$)
      .time(Word.imperative).$;
    expect(en.translate(s)).toBe('look behind you');
    expect(fi.translate(s)).toBe('katso sinun takana');
    expect(nl.translate(s)).toBe('kijk achter jou');
    expect(ru.translate(s)).toBe('смотри за тобой');
  });

  // Original: "The old lady whirled round"
  it('the old lady whirled round', function() {
    const s = Sentence.$.actor(Entity.$(Word.lady).specifier(wordThis).adjective(Word.old).$)
      .action(Action.$.primary(Word.whirl).adverb(Word.round_adv).$)
      .time(Word.past).$;
    expect(en.translate(s)).toBe('the old lady whirled round');
    expect(fi.translate(s)).toBe('vanha rouva pyöri ympäri');
    expect(nl.translate(s)).toBe('de oude dame draaide rond');
    expect(ru.translate(s)).toBe('старая дама кругом кружила');
  });

  // Original: "The lad fled on the instant, scrambled up the high
  //            board-fence, and disappeared over it."
  it('the lad fled and disappeared over the fence', function() {
    const s = CompoundSentence.$
      .sentence(Sentence.$.actor(Entity.$(Word.lad).specifier(wordThis).$).action(Word.flee).time(Word.past).$)
      .coordinator(Word.and)
      .sentence(Sentence.$.actor(Entity.$(Word.lad).specifier(wordThis).$)
        .action(Action.$.primary(Word.disappear)
          .prepositionalPhrase(PrepositionalPhrase.$(Word.over).object(Entity.$(Word.fence).specifier(wordThis).$).$).$)
        .time(Word.past).$).$;
    expect(en.translate(s)).toBe('the lad fled and disappeared over the fence');
    expect(fi.translate(s)).toBe('nuorukainen pakeni ja katosi aidan yli');
    expect(nl.translate(s)).toBe('de knaap vluchtte en verdween over het hek');
    expect(ru.translate(s)).toBe('парень убегал и исчез над забором');
  });

  // Original: "His aunt Polly stood surprised a moment"
  it('his lady stood surprised', function() {
    const s = Sentence.$.actor(Entity.$(Word.lady).possessor(Word.he).$)
      .action(Action.$.primary(Word.stand).complement(Word.surprised).$)
      .time(Word.past).$;
    expect(en.translate(s)).toBe('his lady stood surprised');
    expect(fi.translate(s)).toBe('hänen rouva seisoi yllättynyt');
    expect(nl.translate(s)).toBe('zijn dame stond verrast');
    expect(ru.translate(s)).toBe('его дама стояла удивлённая');
  });

  // Original: "and then broke into a gentle laugh."
  it('she laughed gently', function() {
    const s = Sentence.$.actor(Word.she)
      .action(Action.$.primary(Word.laugh).adverb(Word.gently).$)
      .time(Word.past).$;
    expect(en.translate(s)).toBe('she laughed gently');
    expect(fi.translate(s)).toBe('nauroi lempeästi');
    expect(nl.translate(s)).toBe('zij lachte zachtjes');
    expect(ru.translate(s)).toBe('она нежно смеялась');
  });

  // ── 4. AUNT POLLY'S MONOLOGUE ─────────────────────────────────────────

  // Original: "Ain't he played me tricks enough"
  it('he played tricks', function() {
    const s = Sentence.$.actor(Word.he)
      .action(Action.$.primary(Word.play).subject(Entity.$(Word.trick).specifier(Word.many).$).$)
      .time(Word.past).$;
    expect(en.translate(s)).toBe('he played tricks');
    expect(fi.translate(s)).toBe('leikki temppuja');
    expect(nl.translate(s)).toBe('hij speelde streken');
    expect(ru.translate(s)).toBe('он играл трюки');
  });

  // Original: "He 'pears to know just how long he can torment me"
  it('he can torment me', function() {
    const s = Sentence.$.actor(Word.he)
      .action(Action.$.primary(Word.can).secondary(Word.torment).subject(Word.I).$)
      .time(Word.now).$;
    expect(en.translate(s)).toBe('he can torment me');
    expect(fi.translate(s)).toBe('voi kiusata minut');
    expect(nl.translate(s)).toBe('hij kan kwellen mij');
    expect(ru.translate(s)).toBe('он может мучить меня');
  });

  // Original: "I ain't doing my duty by that boy"
  it('I do not do my duty', function() {
    const s = Sentence.$.actor(Word.I)
      .action(Action.$.primary(wordDo).subject(Entity.$(Word.duty).possessor(Word.I).$).negated().$)
      .time(Word.now).$;
    expect(en.translate(s)).toBe('I do not do my duty');
    expect(fi.translate(s)).toBe('en tee minun velvollisuus');
    expect(nl.translate(s)).toBe('ik doe niet mijn plicht');
    expect(ru.translate(s)).toBe('я не делаю моего долг');
  });

  // ── 5. TOM'S EVENING ──────────────────────────────────────────────────

  // Original: "Sid was already through with his part of the work, for he
  //            was a quiet boy"
  it('the boy was quiet', function() {
    const s = Sentence.$.actor(Entity.$(Word.boy).specifier(wordThis).$)
      .action(Action.$.primary(Word.be).complement(Word.quiet).$)
      .time(Word.past).$;
    expect(en.translate(s)).toBe('the boy was quiet');
    expect(fi.translate(s)).toBe('poika oli hiljainen');
    expect(nl.translate(s)).toBe('de jongen was stil');
    expect(ru.translate(s)).toBe('мальчик был тихий');
  });

  // Original: "Tom, it was middling warm in school, warn't it?"
  it('it was warm', function() {
    const s = Sentence.$.actor(Word.it)
      .action(Action.$.primary(Word.be).complement(Word.warm).$)
      .time(Word.past).$;
    expect(en.translate(s)).toBe('it was warm');
    expect(fi.translate(s)).toBe('oli lämmin');
    expect(nl.translate(s)).toBe('het was warm');
    expect(ru.translate(s)).toBe('оно было тёплое');
  });

  // Original: "Tom did play hookey, and he had a very good time."
  it('he played and it was good', function() {
    const s = CompoundSentence.$
      .sentence(Sentence.$.actor(Word.he).action(Word.play).time(Word.past).$)
      .coordinator(Word.and)
      .sentence(Sentence.$.actor(Word.it)
        .action(Action.$.primary(Word.be).complement(Word.good).$)
        .time(Word.past).$).$;
    expect(en.translate(s)).toBe('he played and it was good');
    expect(fi.translate(s)).toBe('leikki ja oli hyvä');
    expect(nl.translate(s)).toBe('hij speelde en het was goed');
    expect(ru.translate(s)).toBe('он играл и оно было хорошее');
  });

  // ── 6. THE ENCOUNTER WITH THE STRANGER ────────────────────────────────

  // Original: "The summer evenings were long."
  it('summer was long', function() {
    const s = Sentence.$.actor(Word.summer)
      .action(Action.$.primary(Word.be).complement(Word.long).$)
      .time(Word.past).$;
    expect(en.translate(s)).toBe('summer was long');
    expect(fi.translate(s)).toBe('kesä oli pitkä');
    expect(nl.translate(s)).toBe('de zomer was lang');
    expect(ru.translate(s)).toBe('лето было длинное');
  });

  // Original: "It was not dark, yet."
  it('it was not dark', function() {
    const s = Sentence.$.actor(Word.it)
      .action(Action.$.primary(Word.be).complement(Word.dark).negated().$)
      .time(Word.past).$;
    expect(en.translate(s)).toBe('it was not dark');
    expect(fi.translate(s)).toBe('ei ollut pimeä');
    expect(nl.translate(s)).toBe('het was niet donker');
    expect(ru.translate(s)).toBe('оно не было тёмное');
  });

  // Original: "There was a slight noise behind her"
  it('a slight noise was behind her', function() {
    const s = Sentence.$.actor(Entity.$(Word.noise).specifier(Word.one).adjective(Word.slight).$)
      .action(Action.$.primary(Word.be)
        .prepositionalPhrase(PrepositionalPhrase.$(Word.behind).object(Word.she).$).$)
      .time(Word.past).$;
    expect(en.translate(s)).toBe('a slight noise was behind her');
    expect(fi.translate(s)).toBe('hiljainen ääni oli hänen takana');
    expect(nl.translate(s)).toBe('een zacht geluid was achter haar');
    expect(ru.translate(s)).toBe('тихий шум был за ней');
  });

  // Original: "A stranger was before him—a boy a shade larger than himself."
  it('a stranger was before him', function() {
    const s = Sentence.$.actor(Entity.$(Word.stranger).specifier(Word.one).$)
      .action(Action.$.primary(Word.be)
        .prepositionalPhrase(PrepositionalPhrase.$(Word.before_prep).object(Word.he).$).$)
      .time(Word.past).$;
    expect(en.translate(s)).toBe('a stranger was before him');
    expect(fi.translate(s)).toBe('muukalainen oli hänen edessä');
    expect(nl.translate(s)).toBe('een vreemdeling was voor hem');
    expect(ru.translate(s)).toBe('незнакомец был перед ним');
  });

  // Original: "This boy was well dressed, too"
  it('the boy was dressed well', function() {
    const s = Sentence.$.actor(Entity.$(Word.boy).specifier(wordThis).$)
      .action(Action.$.primary(Word.dress).passive().adverb(Word.well).$)
      .time(Word.past).$;
    expect(en.translate(s)).toBe('the boy was dressed well');
    expect(fi.translate(s)).toBe('poika oli pukenut hyvin');
    expect(nl.translate(s)).toBe('de jongen was gekleed goed');
    expect(ru.translate(s)).toBe('мальчик был одет хорошо');
  });

  // Original: "a boy a shade larger than himself"
  it('the stranger was larger', function() {
    const s = Sentence.$.actor(Entity.$(Word.stranger).specifier(wordThis).$)
      .action(Action.$.primary(Word.be).complement(Word.large, 'comparative').$)
      .time(Word.past).$;
    expect(en.translate(s)).toBe('the stranger was larger');
    expect(fi.translate(s)).toBe('muukalainen oli suurempi');
    expect(nl.translate(s)).toBe('de vreemdeling was groter');
    expect(ru.translate(s)).toBe('незнакомец был больше');
  });

  // Original: "A stranger was before him—a boy a shade larger than himself."
  it('he was young', function() {
    const s = Sentence.$.actor(Word.he)
      .action(Action.$.primary(Word.be).complement(Word.young).$)
      .time(Word.past).$;
    expect(en.translate(s)).toBe('he was young');
    expect(fi.translate(s)).toBe('oli nuori');
    expect(nl.translate(s)).toBe('hij was jong');
    expect(ru.translate(s)).toBe('он был молодой');
  });

  // Original: "The two boys studied each other a moment"
  it('the boy looked at the stranger', function() {
    const s = Sentence.$.actor(Entity.$(Word.boy).specifier(wordThis).$)
      .action(Action.$.primary(Word.look)
        .prepositionalPhrase(PrepositionalPhrase.$(Word.at).object(Entity.$(Word.stranger).specifier(wordThis).$).$).$)
      .time(Word.past).$;
    expect(en.translate(s)).toBe('the boy looked at the stranger');
    expect(fi.translate(s)).toBe('poika katsoi muukalaista');
    expect(nl.translate(s)).toBe('de jongen keek naar de vreemdeling');
    expect(ru.translate(s)).toBe('мальчик смотрел на незнакомца');
  });

  // ── 7. THE CONFRONTATION ──────────────────────────────────────────────

  // Original: "I can lick you!"
  it('I can lick you', function() {
    const s = Sentence.$.actor(Word.I)
      .action(Action.$.primary(Word.can).secondary(Word.lick).subject(Word.you).$)
      .time(Word.now).$;
    expect(en.translate(s)).toBe('I can lick you');
    expect(fi.translate(s)).toBe('voin lyödä sinut');
    expect(nl.translate(s)).toBe('ik kan slaan je');
    expect(ru.translate(s)).toBe('я могу побить тебя');
  });

  // Original: "What's your name?"
  it('what is your name?', function() {
    const s = Question.$
      .questionWord(Word.what)
      .actor(Entity.$(Word.name_noun).possessor(Word.you).$)
      .action(Word.be)
      .time(Word.now).$;
    expect(en.translate(s)).toBe('what is your name?');
    expect(fi.translate(s)).toBe('mitä on sinun nimi?');
    expect(nl.translate(s)).toBe('wat is jouw naam?');
    expect(ru.translate(s)).toBe('что твоё имя?');
  });

  // Original: "I ain't afraid."
  it('I am not afraid', function() {
    const s = Sentence.$.actor(Word.I)
      .action(Action.$.primary(Word.be).complement(Word.afraid).negated().$)
      .time(Word.now).$;
    expect(en.translate(s)).toBe('I am not afraid');
    expect(fi.translate(s)).toBe('en ole peloissaan');
    expect(nl.translate(s)).toBe('ik ben niet bang');
    expect(ru.translate(s)).toBe('я не испуган');
  });

  // Original: "Neither boy spoke."
  it('he was not afraid', function() {
    const s = Sentence.$.actor(Word.he)
      .action(Action.$.primary(Word.be).complement(Word.afraid).negated().$)
      .time(Word.past).$;
    expect(en.translate(s)).toBe('he was not afraid');
    expect(fi.translate(s)).toBe('ei ollut peloissaan');
    expect(nl.translate(s)).toBe('hij was niet bang');
    expect(ru.translate(s)).toBe('он не был испуган');
  });

  // ── 8. THE FIGHT ──────────────────────────────────────────────────────

  // Original: "He was crying—mainly from rage."
  it('the boy was crying', function() {
    const s = Sentence.$.actor(Entity.$(Word.boy).specifier(wordThis).$)
      .action(Word.cry)
      .time(Word.past)
      .aspect(Word.progressive).$;
    expect(en.translate(s)).toBe('the boy was crying');
    expect(fi.translate(s)).toBe('poika itki');
    expect(nl.translate(s)).toBe('de jongen was aan het huilen');
    expect(ru.translate(s)).toBe('мальчик плакал');
  });

  // Original: "He was crying—mainly from rage."
  it('the boy cried loudly', function() {
    const s = Sentence.$.actor(Entity.$(Word.boy).specifier(wordThis).$)
      .action(Action.$.primary(Word.cry).adverb(Word.loudly).$)
      .time(Word.past).$;
    expect(en.translate(s)).toBe('the boy cried loudly');
    expect(fi.translate(s)).toBe('poika itki kovaa');
    expect(nl.translate(s)).toBe('de jongen huilde hard');
    expect(ru.translate(s)).toBe('мальчик громко плакал');
  });

  // Original: "the new boy snatched up a stone, threw it and hit him
  //            between the shoulders"
  it('he threw a stone and hit him', function() {
    const s = CompoundSentence.$
      .sentence(Sentence.$.actor(Word.he)
        .action(Action.$.primary(Word.throw_action).subject(Entity.$(Word.stone).specifier(Word.one).$).$)
        .time(Word.past).$)
      .coordinator(Word.and)
      .sentence(Sentence.$.actor(Word.he)
        .action(Action.$.primary(Word.hit).subject(Word.he).$)
        .time(Word.past).$).$;
    expect(en.translate(s)).toBe('he threw a stone and hit him');
    expect(fi.translate(s)).toBe('heitti kivi ja iski hänet');
    expect(nl.translate(s)).toBe('hij gooide een steen en raakte hem');
    expect(ru.translate(s)).toBe('он бросал камень и ударял его');
  });

  // Original: "Tom chased the traitor home, and thus found out where
  //            he lived."
  it('he ran quickly', function() {
    const s = Sentence.$.actor(Word.he)
      .action(Action.$.primary(Word.run).adverb(Word.quickly).$)
      .time(Word.past).$;
    expect(en.translate(s)).toBe('he ran quickly');
    expect(fi.translate(s)).toBe('juoksi nopeasti');
    expect(nl.translate(s)).toBe('hij rende snel');
    expect(ru.translate(s)).toBe('он быстро бежал');
  });

  // Original: "The new boy went off brushing the dust from his clothes"
  it('the new boy went off', function() {
    const s = Sentence.$.actor(Entity.$(Word.boy).specifier(wordThis).adjective(Word.new_adj).$)
      .action(Action.$.primary(Word.go).adverb(Word.off_adv).$)
      .time(Word.past).$;
    expect(en.translate(s)).toBe('the new boy went off');
    expect(fi.translate(s)).toBe('uusi poika meni pois');
    expect(nl.translate(s)).toBe('de nieuwe jongen ging weg');
    expect(ru.translate(s)).toBe('новый мальчик прочь шел');
  });

  // Original: "Tom chased the traitor home"
  it('he chased the traitor home', function() {
    const s = Sentence.$.actor(Word.he)
      .action(Action.$.primary(Word.chase).subject(Entity.$(Word.traitor).specifier(wordThis).$).adverb(Word.home_adv).$)
      .time(Word.past).$;
    expect(en.translate(s)).toBe('he chased the traitor home');
    expect(fi.translate(s)).toBe('jahtasi petturi kotiin');
    expect(nl.translate(s)).toBe('hij achtervolgde de verrader naar huis');
    expect(ru.translate(s)).toBe('он домой гнал предателя');
  });

  // ── 9. TOM SNEAKS HOME ────────────────────────────────────────────────

  // Original: "He got home pretty late that night"
  it('he went home', function() {
    const s = Sentence.$.actor(Word.he)
      .action(Action.$.primary(Word.go).adverb(Word.home_adv).$)
      .time(Word.past).$;
    expect(en.translate(s)).toBe('he went home');
    expect(fi.translate(s)).toBe('meni kotiin');
    expect(nl.translate(s)).toBe('hij ging naar huis');
    expect(ru.translate(s)).toBe('он домой шел');
  });

  // Original: "and when he climbed cautiously in at the window"
  it('he climbed cautiously in at the window', function() {
    const s = Sentence.$.actor(Word.he)
      .action(Action.$.primary(Word.climb).adverb(Word.cautiously)
        .prepositionalPhrase(PrepositionalPhrase.$(Word.in_at).object(Entity.$(Word.window).specifier(wordThis).$).$).$)
      .time(Word.past).$;
    expect(en.translate(s)).toBe('he climbed cautiously in at the window');
    expect(fi.translate(s)).toBe('kiipesi varovasti ikkunasta');
    expect(nl.translate(s)).toBe('hij klom voorzichtig door het raam');
    expect(ru.translate(s)).toBe('он осторожно лез в окно');
  });

  // Original: "when she saw the state his clothes were in"
  it('she saw his clothes', function() {
    const s = Sentence.$.actor(Word.she)
      .action(Action.$.primary(Word.see).subject(Entity.$(Word.clothes).possessor(Word.he).$).$)
      .time(Word.past).$;
    expect(en.translate(s)).toBe('she saw his clothes');
    expect(fi.translate(s)).toBe('näki hänen vaatteet');
    expect(nl.translate(s)).toBe('zij zag zijn kleren');
    expect(ru.translate(s)).toBe('она видела его одежду');
  });

  // Original: "when she saw the state his clothes were in her resolution
  //            to turn his Saturday holiday into captivity...became adamantine"
  it('she thought', function() {
    const s = Sentence.$.actor(Word.she).action(Word.think).time(Word.past).$;
    expect(en.translate(s)).toBe('she thought');
    expect(fi.translate(s)).toBe('ajatteli');
    expect(nl.translate(s)).toBe('zij dacht');
    expect(ru.translate(s)).toBe('она думала');
  });

  // ── 10. ADDITIONAL SCENES FROM CHAPTER 1 ──────────────────────────────

  // Original: "he shouted because he was afraid"
  it('he shouted because he was afraid', function() {
    const s = SubordinateSentence.$
      .main(Sentence.$.actor(Word.he).action(Word.shout).time(Word.past).$)
      .subordinator(Word.because)
      .subordinate(Sentence.$.actor(Word.he)
        .action(Action.$.primary(Word.be).complement(Word.afraid).$)
        .time(Word.past).$).$;
    expect(en.translate(s)).toBe('he shouted because he was afraid');
    expect(fi.translate(s)).toBe('huusi koska oli peloissaan');
    expect(nl.translate(s)).toBe('hij schreeuwde omdat hij bang was');
    expect(ru.translate(s)).toBe('он кричал потому что он был испуган');
  });

  // Original: "she knew that he played"
  it('she knew that he played', function() {
    const s = SubordinateSentence.$
      .main(Sentence.$.actor(Word.she).action(Word.know).time(Word.past).$)
      .subordinator(Word.that_conj)
      .subordinate(Sentence.$.actor(Word.he).action(Word.play).time(Word.past).$).$;
    expect(en.translate(s)).toBe('she knew that he played');
    expect(fi.translate(s)).toBe('tiesi että leikki');
    expect(nl.translate(s)).toBe('zij wist dat hij speelde');
    expect(ru.translate(s)).toBe('она знала что он играл');
  });

  // Original: "when she looked, he fled"
  it('when she looked, he fled', function() {
    const s = SubordinateSentence.$
      .main(Sentence.$.actor(Word.he).action(Word.flee).time(Word.past).$)
      .subordinator(Word.when_conj)
      .subordinate(Sentence.$.actor(Word.she).action(Word.look).time(Word.past).$)
      .subordinateFirst().$;
    expect(en.translate(s)).toBe('when she looked, he fled');
    expect(fi.translate(s)).toBe('kun katsoi, pakeni');
    expect(nl.translate(s)).toBe('wanneer zij keek, hij vluchtte');
    expect(ru.translate(s)).toBe('когда она смотрела, он убегал');
  });

  // Original: "and then broke into a gentle laugh"
  it('the old lady laughed', function() {
    const s = Sentence.$.actor(Entity.$(Word.lady).specifier(wordThis).adjective(Word.old).$)
      .action(Word.laugh).time(Word.past).$;
    expect(en.translate(s)).toBe('the old lady laughed');
    expect(fi.translate(s)).toBe('vanha rouva nauroi');
    expect(nl.translate(s)).toBe('de oude dame lachte');
    expect(ru.translate(s)).toBe('старая дама смеялась');
  });

  // Original: Aunt Polly's reflections on Tom
  it('she thought about him', function() {
    const s = Sentence.$.actor(Word.she)
      .action(Action.$.primary(Word.think)
        .prepositionalPhrase(PrepositionalPhrase.$(Word.about_prep).object(Word.he).$).$)
      .time(Word.past).$;
    expect(en.translate(s)).toBe('she thought about him');
    expect(fi.translate(s)).toBe('ajatteli hänestä');
    expect(nl.translate(s)).toBe('zij dacht over hem');
    expect(ru.translate(s)).toBe('она думала о нём');
  });

  // Original: "The new boy went off brushing the dust from his clothes"
  it('the boy ran home', function() {
    const s = Sentence.$.actor(Entity.$(Word.boy).specifier(wordThis).$)
      .action(Action.$.primary(Word.run).adverb(Word.home_adv).$)
      .time(Word.past).$;
    expect(en.translate(s)).toBe('the boy ran home');
    expect(fi.translate(s)).toBe('poika juoksi kotiin');
    expect(nl.translate(s)).toBe('de jongen rende naar huis');
    expect(ru.translate(s)).toBe('мальчик домой бежал');
  });

  // Original: "'I'd like to see you try it,' said the new boy."
  it('he said', function() {
    const s = Sentence.$.actor(Word.he).action(Word.say).time(Word.past).$;
    expect(en.translate(s)).toBe('he said');
    expect(fi.translate(s)).toBe('sanoi');
    expect(nl.translate(s)).toBe('hij zei');
    expect(ru.translate(s)).toBe('он говорил');
  });

  // Original: "The new boy went off brushing the dust from his clothes,
  //            sobbing, snuffling"
  it('the stranger ran quickly', function() {
    const s = Sentence.$.actor(Entity.$(Word.stranger).specifier(wordThis).$)
      .action(Action.$.primary(Word.run).adverb(Word.quickly).$)
      .time(Word.past).$;
    expect(en.translate(s)).toBe('the stranger ran quickly');
    expect(fi.translate(s)).toBe('muukalainen juoksi nopeasti');
    expect(nl.translate(s)).toBe('de vreemdeling rende snel');
    expect(ru.translate(s)).toBe('незнакомец быстро бежал');
  });

  // Original: "She went to the open door and stood in it and looked"
  it('she looked at him', function() {
    const s = Sentence.$.actor(Word.she)
      .action(Action.$.primary(Word.look)
        .prepositionalPhrase(PrepositionalPhrase.$(Word.at).object(Word.he).$).$)
      .time(Word.past).$;
    expect(en.translate(s)).toBe('she looked at him');
    expect(fi.translate(s)).toBe('katsoi häntä');
    expect(nl.translate(s)).toBe('zij keek naar hem');
    expect(ru.translate(s)).toBe('она смотрела на него');
  });

  // Original: "scrambled up the high board-fence"
  it('the boy climbed over the fence', function() {
    const s = Sentence.$.actor(Entity.$(Word.boy).specifier(wordThis).$)
      .action(Action.$.primary(Word.climb)
        .prepositionalPhrase(PrepositionalPhrase.$(Word.over).object(Entity.$(Word.fence).specifier(wordThis).$).$).$)
      .time(Word.past).$;
    expect(en.translate(s)).toBe('the boy climbed over the fence');
    expect(fi.translate(s)).toBe('poika kiipesi aidan yli');
    expect(nl.translate(s)).toBe('de jongen klom over het hek');
    expect(ru.translate(s)).toBe('мальчик лез над забором');
  });

  // Original: "he...crept to where he could contemplate"
  it('she could not see him', function() {
    const s = Sentence.$.actor(Word.she)
      .action(Action.$.primary(Word.can).secondary(Word.see).subject(Word.he).negated().$)
      .time(Word.past).$;
    expect(en.translate(s)).toBe('she could not see him');
    expect(fi.translate(s)).toBe('ei voinut nähdä hänet');
    expect(nl.translate(s)).toBe('zij kon niet zien hem');
    expect(ru.translate(s)).toBe('она не могла видеть его');
  });

  // Original: "he had a very good time"
  it('it was good', function() {
    const s = Sentence.$.actor(Word.it)
      .action(Action.$.primary(Word.be).complement(Word.good).$)
      .time(Word.past).$;
    expect(en.translate(s)).toBe('it was good');
    expect(fi.translate(s)).toBe('oli hyvä');
    expect(nl.translate(s)).toBe('het was goed');
    expect(ru.translate(s)).toBe('оно было хорошее');
  });

  // Original: "She resurrected nothing but the cat"
  it('the cat was small', function() {
    const s = Sentence.$.actor(Entity.$(Word.cat).specifier(wordThis).$)
      .action(Action.$.primary(Word.be).complement(Word.small).$)
      .time(Word.past).$;
    expect(en.translate(s)).toBe('the cat was small');
    expect(fi.translate(s)).toBe('kissa oli pieni');
    expect(nl.translate(s)).toBe('de kat was klein');
    expect(ru.translate(s)).toBe('кот был маленький');
  });

});
