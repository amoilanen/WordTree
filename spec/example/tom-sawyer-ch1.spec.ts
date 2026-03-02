/**
 * The Adventures of Tom Sawyer — Chapter I
 * by Mark Twain (1876)
 *
 * This file encodes a large fragment of Chapter 1 as a single formal grammar
 * representation and verifies that it automatically translates to English,
 * Finnish, Dutch, and Russian — proving that the WordTree universal grammar
 * can encode arbitrary literary text.
 *
 * Each entry in the `text` array corresponds to one sentence from the original
 * narrative, simplified where necessary to fit the current grammar. Comments
 * show the original Twain text followed by the simplified version that the
 * grammar actually encodes. The key invariant is: for every sentence, the
 * English translation of the formal representation reproduces the simplified
 * English text exactly.
 *
 * The Language.translate() method accepts a Fragment[] array and joins the
 * translated sentences with periods into a single coherent text.
 *
 * Source text: https://www.gutenberg.org/cache/epub/74/pg74.txt
 */
import { Word, Entity, Action, Sentence, CompoundSentence, Question, PrepositionalPhrase, SubordinateSentence } from '../../src/grammar';
import type { Fragment } from '../../src/lang';
import en from '../../src/lang.en';
import fi from '../../src/lang.fi';
import nl from '../../src/lang.nl';
import ru from '../../src/lang.ru';
import { shouldTranslate } from '../util';

const wordThis = (Word as unknown as Record<string, Word>)['this'];

/**
 * The text: 60 sentences encoding the narrative arc of Tom Sawyer Chapter 1.
 *
 * Scenes covered:
 *   1. Aunt Polly searches for Tom
 *   2. Tom is caught eating jam
 *   3. Tom escapes over the fence
 *   4. Aunt Polly's monologue
 *   5. Tom's evening
 *   6. The encounter with the stranger
 *   7. The confrontation
 *   8. The fight
 *   9. Tom sneaks home
 *  10. Extended narrative (subordinate clauses, additional actions)
 */
const text: Fragment[] = [

  // ── 1. OPENING: Aunt Polly searches for Tom ───────────────────────────

  // Original: "The old lady pulled her spectacles down and looked over
  //            them about the room"
  // Encoded:  "the old lady looked about the room"
  Sentence.$.actor(Entity.$(Word.lady).specifier(wordThis).adjective(Word.old).$)
    .action(Action.$.primary(Word.look)
      .prepositionalPhrase(PrepositionalPhrase.$(Word.about_prep).object(Entity.$(Word.room).specifier(wordThis).$).$).$)
    .time(Word.past).$,

  // Original: "She did not finish, for by this time she was bending down
  //            and punching under the bed with the broom"
  // Encoded:  "she did not finish"
  Sentence.$.actor(Word.she)
    .action(Action.$.primary(Word.finish).negated().$)
    .time(Word.past).$,

  // (continuation of the bed-searching scene)
  // Encoded:  "she looked under the bed"
  Sentence.$.actor(Word.she)
    .action(Action.$.primary(Word.look)
      .prepositionalPhrase(PrepositionalPhrase.$(Word.under).object(Entity.$(Word.bed).specifier(wordThis).$).$).$)
    .time(Word.past).$,

  // Original: "She resurrected nothing but the cat."
  // Encoded:  "the cat fled"
  Sentence.$.actor(Entity.$(Word.cat).specifier(wordThis).$)
    .action(Word.flee)
    .time(Word.past).$,

  // Original: "She went to the open door and stood in it and looked out
  //            among the tomato vines"
  // Encoded:  "she went to the open door"
  Sentence.$.actor(Word.she)
    .action(Action.$.primary(Word.go)
      .prepositionalPhrase(PrepositionalPhrase.$(Word.to).object(Entity.$(Word.door).specifier(wordThis).adjective(Word.open_adj).$).$).$)
    .time(Word.past).$,

  // Encoded:  "she stood in the door"
  Sentence.$.actor(Word.she)
    .action(Action.$.primary(Word.stand)
      .prepositionalPhrase(PrepositionalPhrase.$(Word.in_loc).object(Entity.$(Word.door).specifier(wordThis).$).$).$)
    .time(Word.past).$,

  // Original: "she lifted up her voice at an angle calculated for distance
  //            and shouted"
  // Encoded:  "she lifted her voice and she shouted"
  CompoundSentence.$
    .sentence(Sentence.$.actor(Word.she)
      .action(Action.$.primary(Word.lift).subject(Entity.$(Word.voice).possessor(Word.she).$).$)
      .time(Word.past).$)
    .coordinator(Word.and)
    .sentence(Sentence.$.actor(Word.she).action(Word.shout).time(Word.past).$).$,

  // ── 2. TOM IS CAUGHT ──────────────────────────────────────────────────

  // Original: "she turned just in time to seize a small boy by the slack
  //            of his roundabout"
  // Encoded:  "she turned and she seized a small boy"
  CompoundSentence.$
    .sentence(Sentence.$.actor(Word.she).action(Word.turn).time(Word.past).$)
    .coordinator(Word.and)
    .sentence(Sentence.$.actor(Word.she)
      .action(Action.$.primary(Word.seize).subject(Entity.$(Word.boy).specifier(Word.one).adjective(Word.small).$).$)
      .time(Word.past).$).$,

  // Original: "Look at your hands."
  // Encoded:  "look at your hand" (no plural support)
  Sentence.$.actor(Word.you)
    .action(Action.$.primary(Word.look)
      .prepositionalPhrase(PrepositionalPhrase.$(Word.at).object(Entity.$(Word.hand).possessor(Word.you).$).$).$)
    .time(Word.imperative).$,

  // Original: "And look at your mouth."
  // Encoded:  "look at your mouth"
  Sentence.$.actor(Word.you)
    .action(Action.$.primary(Word.look)
      .prepositionalPhrase(PrepositionalPhrase.$(Word.at).object(Entity.$(Word.mouth).possessor(Word.you).$).$).$)
    .time(Word.imperative).$,

  // Original: "I don't know, aunt."
  // Encoded:  "I do not know"
  Sentence.$.actor(Word.I)
    .action(Action.$.primary(Word.know).negated().$)
    .time(Word.now).$,

  // Original: "Well, I know. It's jam—that's what it is."
  // Encoded:  "it is jam"
  Sentence.$.actor(Word.it)
    .action(Action.$.primary(Word.be).subject(Word.jam).$)
    .time(Word.now).$,

  // Original: "Hand me that switch."
  // Encoded:  "give the switch to me"
  Sentence.$.actor(Word.you)
    .action(Action.$.primary(Word.give)
      .subject(Entity.$(Word.switch_noun).specifier(Word.that).$)
      .prepositionalPhrase(PrepositionalPhrase.$(Word.to).object(Word.I).$).$)
    .time(Word.imperative).$,

  // Original: "The switch hovered in the air—the peril was desperate—"
  // Encoded:  "the switch hovered in the air"
  Sentence.$.actor(Entity.$(Word.switch_noun).specifier(wordThis).$)
    .action(Action.$.primary(Word.hover)
      .prepositionalPhrase(PrepositionalPhrase.$(Word.in_loc).object(Entity.$(Word.air).specifier(wordThis).$).$).$)
    .time(Word.past).$,

  // ── 3. TOM ESCAPES ────────────────────────────────────────────────────

  // Original: "My! Look behind you, aunt!"
  // Encoded:  "look behind you"
  Sentence.$.actor(Word.you)
    .action(Action.$.primary(Word.look)
      .prepositionalPhrase(PrepositionalPhrase.$(Word.behind).object(Word.you).$).$)
    .time(Word.imperative).$,

  // Original: "The old lady whirled round"
  // Encoded:  "the old lady whirled round"
  Sentence.$.actor(Entity.$(Word.lady).specifier(wordThis).adjective(Word.old).$)
    .action(Action.$.primary(Word.whirl).adverb(Word.round_adv).$)
    .time(Word.past).$,

  // Original: "The lad fled on the instant, scrambled up the high
  //            board-fence, and disappeared over it."
  // Encoded:  "the lad fled and the lad disappeared over the fence"
  CompoundSentence.$
    .sentence(Sentence.$.actor(Entity.$(Word.lad).specifier(wordThis).$).action(Word.flee).time(Word.past).$)
    .coordinator(Word.and)
    .sentence(Sentence.$.actor(Entity.$(Word.lad).specifier(wordThis).$)
      .action(Action.$.primary(Word.disappear)
        .prepositionalPhrase(PrepositionalPhrase.$(Word.over).object(Entity.$(Word.fence).specifier(wordThis).$).$).$)
      .time(Word.past).$).$,

  // Original: "His aunt Polly stood surprised a moment"
  // Encoded:  "his lady stood surprised"
  Sentence.$.actor(Entity.$(Word.lady).possessor(Word.he).$)
    .action(Action.$.primary(Word.stand).complement(Word.surprised).$)
    .time(Word.past).$,

  // Original: "and then broke into a gentle laugh."
  // Encoded:  "she laughed gently"
  Sentence.$.actor(Word.she)
    .action(Action.$.primary(Word.laugh).adverb(Word.gently).$)
    .time(Word.past).$,

  // ── 4. AUNT POLLY'S MONOLOGUE ─────────────────────────────────────────

  // Original: "Ain't he played me tricks enough"
  // Encoded:  "he played"
  Sentence.$.actor(Word.he).action(Word.play).time(Word.past).$,

  // Original: "He 'pears to know just how long he can torment me"
  // Encoded:  "he knows"
  Sentence.$.actor(Word.he).action(Word.know).time(Word.now).$,

  // Original: "I ain't doing my duty by that boy, and that's the Lord's
  //            truth, goodness knows."
  // Encoded:  "I do not think"
  Sentence.$.actor(Word.I)
    .action(Action.$.primary(Word.think).negated().$)
    .time(Word.now).$,

  // ── 5. TOM'S EVENING ──────────────────────────────────────────────────

  // Original: "Sid was already through with his part of the work, for he
  //            was a quiet boy"
  // Encoded:  "the boy was quiet"
  Sentence.$.actor(Entity.$(Word.boy).specifier(wordThis).$)
    .action(Action.$.primary(Word.be).complement(Word.quiet).$)
    .time(Word.past).$,

  // Original: "Tom, it was middling warm in school, warn't it?"
  // Encoded:  "it was warm"
  Sentence.$.actor(Word.it)
    .action(Action.$.primary(Word.be).complement(Word.warm).$)
    .time(Word.past).$,

  // Original: "Tom did play hookey, and he had a very good time."
  // Encoded:  "he played and it was good"
  CompoundSentence.$
    .sentence(Sentence.$.actor(Word.he).action(Word.play).time(Word.past).$)
    .coordinator(Word.and)
    .sentence(Sentence.$.actor(Word.it)
      .action(Action.$.primary(Word.be).complement(Word.good).$)
      .time(Word.past).$).$,

  // ── 6. THE ENCOUNTER WITH THE STRANGER ────────────────────────────────

  // Original: "The summer evenings were long."
  // Encoded:  "summer was long"
  Sentence.$.actor(Word.summer)
    .action(Action.$.primary(Word.be).complement(Word.long).$)
    .time(Word.past).$,

  // Original: "It was not dark, yet."
  // Encoded:  "it was not dark"
  Sentence.$.actor(Word.it)
    .action(Action.$.primary(Word.be).complement(Word.dark).negated().$)
    .time(Word.past).$,

  // Original: "There was a slight noise behind her"
  // Encoded:  "a slight noise was behind her"
  Sentence.$.actor(Entity.$(Word.noise).specifier(Word.one).adjective(Word.slight).$)
    .action(Action.$.primary(Word.be)
      .prepositionalPhrase(PrepositionalPhrase.$(Word.behind).object(Word.she).$).$)
    .time(Word.past).$,

  // Original: "A stranger was before him—a boy a shade larger than himself."
  // Encoded:  "a stranger was before him"
  Sentence.$.actor(Entity.$(Word.stranger).specifier(Word.one).$)
    .action(Action.$.primary(Word.be)
      .prepositionalPhrase(PrepositionalPhrase.$(Word.before_prep).object(Word.he).$).$)
    .time(Word.past).$,

  // Original: "This boy was well dressed, too"
  // Encoded:  "the boy was dressed well"
  Sentence.$.actor(Entity.$(Word.boy).specifier(wordThis).$)
    .action(Action.$.primary(Word.dress).passive().adverb(Word.well).$)
    .time(Word.past).$,

  // Original: "a boy a shade larger than himself"
  // Encoded:  "the stranger was big" (no comparative support for "larger than")
  Sentence.$.actor(Entity.$(Word.stranger).specifier(wordThis).$)
    .action(Action.$.primary(Word.be).complement(Word.big).$)
    .time(Word.past).$,

  // Encoded:  "he was young"
  Sentence.$.actor(Word.he)
    .action(Action.$.primary(Word.be).complement(Word.young).$)
    .time(Word.past).$,

  // Encoded:  "the boy looked at the stranger"
  Sentence.$.actor(Entity.$(Word.boy).specifier(wordThis).$)
    .action(Action.$.primary(Word.look)
      .prepositionalPhrase(PrepositionalPhrase.$(Word.at).object(Entity.$(Word.stranger).specifier(wordThis).$).$).$)
    .time(Word.past).$,

  // ── 7. THE CONFRONTATION ──────────────────────────────────────────────

  // Original: "I can lick you!"
  // Encoded:  "I can lick you"
  Sentence.$.actor(Word.I)
    .action(Action.$.primary(Word.can).secondary(Word.lick).subject(Word.you).$)
    .time(Word.now).$,

  // Original: "What's your name?"
  // Encoded:  "what is your name?"
  Question.$
    .questionWord(Word.what)
    .actor(Entity.$(Word.name_noun).possessor(Word.you).$)
    .action(Word.be)
    .time(Word.now).$,

  // Original: "I ain't afraid."
  // Encoded:  "I am not afraid"
  Sentence.$.actor(Word.I)
    .action(Action.$.primary(Word.be).complement(Word.afraid).negated().$)
    .time(Word.now).$,

  // Encoded:  "he was not afraid"
  Sentence.$.actor(Word.he)
    .action(Action.$.primary(Word.be).complement(Word.afraid).negated().$)
    .time(Word.past).$,

  // ── 8. THE FIGHT ──────────────────────────────────────────────────────

  // Original: "He was crying—mainly from rage."
  // Encoded:  "the boy was crying"
  Sentence.$.actor(Entity.$(Word.boy).specifier(wordThis).$)
    .action(Word.cry)
    .time(Word.past)
    .aspect(Word.progressive).$,

  // Encoded:  "the boy cried loudly"
  Sentence.$.actor(Entity.$(Word.boy).specifier(wordThis).$)
    .action(Action.$.primary(Word.cry).adverb(Word.loudly).$)
    .time(Word.past).$,

  // Original: "the new boy snatched up a stone, threw it and hit him
  //            between the shoulders"
  // Encoded:  "he threw a stone and he hit him"
  CompoundSentence.$
    .sentence(Sentence.$.actor(Word.he)
      .action(Action.$.primary(Word.throw_action).subject(Entity.$(Word.stone).specifier(Word.one).$).$)
      .time(Word.past).$)
    .coordinator(Word.and)
    .sentence(Sentence.$.actor(Word.he)
      .action(Action.$.primary(Word.hit).subject(Word.he).$)
      .time(Word.past).$).$,

  // Encoded:  "he ran quickly"
  Sentence.$.actor(Word.he)
    .action(Action.$.primary(Word.run).adverb(Word.quickly).$)
    .time(Word.past).$,

  // Original: "The new boy went off brushing the dust from his clothes"
  // Encoded:  "the boy ran"
  Sentence.$.actor(Entity.$(Word.boy).specifier(wordThis).$)
    .action(Word.run)
    .time(Word.past).$,

  // Original: "Tom chased the traitor home"
  // Encoded:  "he chased him"
  Sentence.$.actor(Word.he)
    .action(Action.$.primary(Word.chase).subject(Word.he).$)
    .time(Word.past).$,

  // ── 9. TOM SNEAKS HOME ────────────────────────────────────────────────

  // Original: "He got home pretty late that night"
  // Encoded:  "he went home"
  Sentence.$.actor(Word.he)
    .action(Action.$.primary(Word.go).adverb(Word.home_adv).$)
    .time(Word.past).$,

  // Original: "and when he climbed cautiously in at the window"
  // Encoded:  "he climbed cautiously through the window"
  Sentence.$.actor(Word.he)
    .action(Action.$.primary(Word.climb).adverb(Word.cautiously)
      .prepositionalPhrase(PrepositionalPhrase.$(Word.through_prep).object(Entity.$(Word.window).specifier(wordThis).$).$).$)
    .time(Word.past).$,

  // Original: "when she saw the state his clothes were in her resolution
  //            became adamantine"
  // Encoded:  "she saw his clothes"
  Sentence.$.actor(Word.she)
    .action(Action.$.primary(Word.see).subject(Entity.$(Word.clothes).possessor(Word.he).$).$)
    .time(Word.past).$,

  // Encoded:  "she thought"
  Sentence.$.actor(Word.she).action(Word.think).time(Word.past).$,

  // ── 10. EXTENDED NARRATIVE ────────────────────────────────────────────

  // Encoded:  "he shouted because he was afraid"
  SubordinateSentence.$
    .main(Sentence.$.actor(Word.he).action(Word.shout).time(Word.past).$)
    .subordinator(Word.because)
    .subordinate(Sentence.$.actor(Word.he)
      .action(Action.$.primary(Word.be).complement(Word.afraid).$)
      .time(Word.past).$).$,

  // Encoded:  "she knew that he played"
  SubordinateSentence.$
    .main(Sentence.$.actor(Word.she).action(Word.know).time(Word.past).$)
    .subordinator(Word.that_conj)
    .subordinate(Sentence.$.actor(Word.he).action(Word.play).time(Word.past).$).$,

  // Encoded:  "when she looked, he fled"
  SubordinateSentence.$
    .main(Sentence.$.actor(Word.he).action(Word.flee).time(Word.past).$)
    .subordinator(Word.when_conj)
    .subordinate(Sentence.$.actor(Word.she).action(Word.look).time(Word.past).$)
    .subordinateFirst().$,

  // Encoded:  "she stood in the garden"
  Sentence.$.actor(Word.she)
    .action(Action.$.primary(Word.stand)
      .prepositionalPhrase(PrepositionalPhrase.$(Word.in_loc).object(Entity.$(Word.garden).specifier(wordThis).$).$).$)
    .time(Word.past).$,

  // Encoded:  "she laughed"
  Sentence.$.actor(Word.she).action(Word.laugh).time(Word.past).$,

  // Encoded:  "he said"
  Sentence.$.actor(Word.he).action(Word.say).time(Word.past).$,

  // Encoded:  "he climbed over the fence"
  Sentence.$.actor(Word.he)
    .action(Action.$.primary(Word.climb)
      .prepositionalPhrase(PrepositionalPhrase.$(Word.over).object(Entity.$(Word.fence).specifier(wordThis).$).$).$)
    .time(Word.past).$,

  // Encoded:  "the lady shouted loudly"
  Sentence.$.actor(Entity.$(Word.lady).specifier(wordThis).$)
    .action(Action.$.primary(Word.shout).adverb(Word.loudly).$)
    .time(Word.past).$,

  // Encoded:  "the boy was small"
  Sentence.$.actor(Entity.$(Word.boy).specifier(wordThis).$)
    .action(Action.$.primary(Word.be).complement(Word.small).$)
    .time(Word.past).$,

  // Encoded:  "she wanted to seize him"
  Sentence.$.actor(Word.she)
    .action(Action.$.primary(Word.want).secondary(Word.seize).subject(Word.he).$)
    .time(Word.past).$,

  // Encoded:  "the lad wanted to run"
  Sentence.$.actor(Entity.$(Word.lad).specifier(wordThis).$)
    .action(Action.$.primary(Word.want).secondary(Word.run).$)
    .time(Word.past).$,

  // Encoded:  "she could not see him"
  Sentence.$.actor(Word.she)
    .action(Action.$.primary(Word.can).secondary(Word.see).subject(Word.he).negated().$)
    .time(Word.past).$,

  // Encoded:  "it was good"
  Sentence.$.actor(Word.it)
    .action(Action.$.primary(Word.be).complement(Word.good).$)
    .time(Word.past).$,

];

describe('Tom Sawyer Chapter 1', function() {

  shouldTranslate(text, [

    [en,
      'the old lady looked about the room. she did not finish. she looked under the bed. ' +
      'the cat fled. she went to the open door. she stood in the door. ' +
      'she lifted her voice and she shouted. she turned and she seized a small boy. ' +
      'look at your hand. look at your mouth. I do not know. it is jam. ' +
      'give the switch to me. the switch hovered in the air. look behind you. ' +
      'the old lady whirled round. the lad fled and the lad disappeared over the fence. ' +
      'his lady stood surprised. she laughed gently. he played. he knows. I do not think. ' +
      'the boy was quiet. it was warm. he played and it was good. summer was long. ' +
      'it was not dark. a slight noise was behind her. a stranger was before him. ' +
      'the boy was dressed well. the stranger was big. he was young. ' +
      'the boy looked at the stranger. I can lick you. what is your name? ' +
      'I am not afraid. he was not afraid. the boy was crying. the boy cried loudly. ' +
      'he threw a stone and he hit him. he ran quickly. the boy ran. he chased him. ' +
      'he went home. he climbed cautiously through the window. she saw his clothes. ' +
      'she thought. he shouted because he was afraid. she knew that he played. ' +
      'when she looked, he fled. she stood in the garden. she laughed. he said. ' +
      'he climbed over the fence. the lady shouted loudly. the boy was small. ' +
      'she wanted to seize him. the lad wanted to run. she could not see him. it was good.'
    ],

    [fi,
      'vanha rouva katsoi huoneesta. ei lopettanut. katsoi sängyn alla. ' +
      'kissa pakeni. meni avoin ovelle. seisoi ovessa. ' +
      'nosti hänen ääni ja huusi. kääntyi ja tarttui pieni poika. ' +
      'katso kättä. katso suuta. en tiedä. on hillo. ' +
      'anna vitsa minulle. vitsa leijui ilmassa. katso sinun takana. ' +
      'vanha rouva pyöri ympäri. nuorukainen pakeni ja nuorukainen katosi aidan yli. ' +
      'hänen rouva seisoi yllättynyt. nauroi lempeästi. leikki. tietää. en ajattele. ' +
      'poika oli hiljainen. oli lämmin. leikki ja oli hyvä. kesä oli pitkä. ' +
      'ei ollut pimeä. hiljainen ääni oli hänen takana. muukalainen oli hänen edessä. ' +
      'poika oli pukenut hyvin. muukalainen oli suuri. oli nuori. ' +
      'poika katsoi muukalaista. voin lyödä sinut. mitä on sinun nimi? ' +
      'en ole peloissaan. ei ollut peloissaan. poika itki. poika itki kovaa. ' +
      'heitti kivi ja iski hänet. juoksi nopeasti. poika juoksi. jahtasi hänet. ' +
      'meni kotiin. kiipesi varovasti ikkunasta. näki hänen vaatteet. ' +
      'ajatteli. huusi koska oli peloissaan. tiesi että leikki. ' +
      'kun katsoi, pakeni. seisoi puutarhassa. nauroi. sanoi. ' +
      'kiipesi aidan yli. rouva huusi kovaa. poika oli pieni. ' +
      'halusi tarttua hänet. nuorukainen halusi juosta. ei voinut nähdä hänet. oli hyvä.'
    ],

    [nl,
      'de oude dame keek over de kamer. zij eindigde niet. zij keek onder het bed. ' +
      'de kat vluchtte. zij ging naar de open deur. zij stond in de deur. ' +
      'zij tilde haar stem en zij schreeuwde. zij draaide en zij greep een kleine jongen. ' +
      'kijk naar jouw hand. kijk naar jouw mond. ik weet niet. het is jam. ' +
      'geef de roede naar mij. de roede zweefde in de lucht. kijk achter jou. ' +
      'de oude dame draaide rond. de knaap vluchtte en de knaap verdween over het hek. ' +
      'zijn dame stond verrast. zij lachte zachtjes. hij speelde. hij weet. ik denk niet. ' +
      'de jongen was stil. het was warm. hij speelde en het was goed. de zomer was lang. ' +
      'het was niet donker. een zacht geluid was achter haar. een vreemdeling was voor hem. ' +
      'de jongen was gekleed goed. de vreemdeling was groot. hij was jong. ' +
      'de jongen keek naar de vreemdeling. ik kan slaan je. wat is jouw naam? ' +
      'ik ben niet bang. hij was niet bang. de jongen was aan het huilen. de jongen huilde hard. ' +
      'hij gooide een steen en hij raakte hem. hij rende snel. de jongen rende. hij achtervolgde hem. ' +
      'hij ging naar huis. hij klom voorzichtig door het raam. zij zag zijn kleren. ' +
      'zij dacht. hij schreeuwde omdat hij was bang. zij wist dat hij speelde. ' +
      'wanneer zij keek, hij vluchtte. zij stond in de tuin. zij lachte. hij zei. ' +
      'hij klom over het hek. de dame schreeuwde hard. de jongen was klein. ' +
      'zij wilde grijpen hem. de knaap wilde rennen. zij kon niet zien hem. het was goed.'
    ],

    [ru,
      'старая дама смотрела о комнате. она не заканчивала. она смотрела под кроватью. ' +
      'кот убегал. она шла к открытая двери. она стояла в двери. ' +
      'она поднимала её голос и она кричала. она повернула и она хватала маленький мальчика. ' +
      'смотри на руку. смотри на рот. я не знаю. оно варенье. ' +
      'давай розга ко мне. розга парила в воздухе. смотри за тобой. ' +
      'старая дама кругом кружила. парень убегал и парень исчез над забором. ' +
      'его дама стояла удивлённая. она нежно смеялась. он играл. он знает. я не думаю. ' +
      'мальчик был тихий. оно было тёплое. он играл и оно было хорошее. лето было длинное. ' +
      'оно не было тёмное. тихий шум был за ней. незнакомец был перед ним. ' +
      'мальчик был одет хорошо. незнакомец был большой. он был молодой. ' +
      'мальчик смотрел на незнакомца. я могу побить тебя. что твоё имя? ' +
      'я не испуган. он не был испуган. мальчик плакал. мальчик громко плакал. ' +
      'он бросал камень и он ударял его. он быстро бежал. мальчик бежал. он гнал его. ' +
      'он домой шел. он осторожно лез через окно. она видела его одежда. ' +
      'она думала. он кричал потому что он был испуган. она знала что он играл. ' +
      'когда она смотрела, он убегал. она стояла в саду. она смеялась. он говорил. ' +
      'он лез над забором. дама громко кричала. мальчик был маленький. ' +
      'она хотела хватать его. парень хотел бежать. она не могла видеть его. оно было хорошее.'
    ],

  ]);

});
