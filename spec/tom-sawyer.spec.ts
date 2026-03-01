/**
 * Tom Sawyer Chapter 1 — Encoding key sentences from Mark Twain's
 * "The Adventures of Tom Sawyer" in the WordTree universal grammar format,
 * automatically translated to English, Finnish, Dutch, and Russian.
 *
 * Sentences are simplified to standard English where the original uses
 * dialect or constructions not yet supported by the grammar.
 */
import { Word, Entity, Action, Sentence, CompoundSentence, Question, PrepositionalPhrase } from '../src/grammar';
import en from '../src/lang.en';
import fi from '../src/lang.fi';
import nl from '../src/lang.nl';
import ru from '../src/lang.ru';
import { shouldTranslate } from './util';

const wordThis = (Word as unknown as Record<string, Word>)['this'];

describe('Tom Sawyer Chapter 1', function() {

  // 1. "The old lady looked about the room."
  describe('the old lady looked about the room', function() {
    shouldTranslate(
      Sentence.$.actor(Entity.$(Word.lady).specifier(wordThis).adjective(Word.old).$)
        .action(Action.$.primary(Word.look)
          .prepositionalPhrase(PrepositionalPhrase.$(Word.about_prep).object(Entity.$(Word.room).specifier(wordThis).$).$).$)
        .time(Word.past).$,
      [
        [en, 'the old lady looked about the room'],
        [fi, 'vanha rouva katsoi huoneesta'],
        [nl, 'de oude dame keek over de kamer'],
        [ru, 'старая дама смотрела о комнате']
      ]
    );
  });

  // 2. "She went to the open door."
  describe('she went to the open door', function() {
    shouldTranslate(
      Sentence.$.actor(Word.she)
        .action(Action.$.primary(Word.go)
          .prepositionalPhrase(PrepositionalPhrase.$(Word.to).object(Entity.$(Word.door).specifier(wordThis).adjective(Word.open_adj).$).$).$)
        .time(Word.past).$,
      [
        [en, 'she went to the open door'],
        [fi, 'meni avoin ovelle'],
        [nl, 'zij ging naar de open deur'],
        [ru, 'она шла к открытая двери']
      ]
    );
  });

  // 3. "She did not finish."
  describe('she did not finish', function() {
    shouldTranslate(
      Sentence.$.actor(Word.she)
        .action(Action.$.primary(Word.finish).negated().$)
        .time(Word.past).$,
      [
        [en, 'she did not finish'],
        [fi, 'ei lopettanut'],
        [nl, 'zij eindigde niet'],
        [ru, 'она не заканчивала']
      ]
    );
  });

  // 4. "She lifted her voice and shouted."
  describe('she lifted her voice and shouted', function() {
    shouldTranslate(
      CompoundSentence.$
        .sentence(Sentence.$.actor(Word.she)
          .action(Action.$.primary(Word.lift).subject(Entity.$(Word.voice).possessor(Word.she).$).$)
          .time(Word.past).$)
        .coordinator(Word.and)
        .sentence(Sentence.$.actor(Word.she).action(Word.shout).time(Word.past).$).$,
      [
        [en, 'she lifted her voice and she shouted'],
        [fi, 'nosti hänen ääni ja huusi'],
        [nl, 'zij tilde haar stem en zij schreeuwde'],
        [ru, 'она поднимала её голос и она кричала']
      ]
    );
  });

  // 5. "She turned and seized a small boy."
  describe('she turned and seized a small boy', function() {
    shouldTranslate(
      CompoundSentence.$
        .sentence(Sentence.$.actor(Word.she).action(Word.turn).time(Word.past).$)
        .coordinator(Word.and)
        .sentence(Sentence.$.actor(Word.she)
          .action(Action.$.primary(Word.seize).subject(Entity.$(Word.boy).specifier(Word.one).adjective(Word.small).$).$)
          .time(Word.past).$).$,
      [
        [en, 'she turned and she seized a small boy'],
        [fi, 'kääntyi ja tarttui pieni poika'],
        [nl, 'zij draaide en zij greep een kleine jongen'],
        [ru, 'она повернула и она хватала маленький мальчика']
      ]
    );
  });

  // 6. "The old lady whirled round."
  describe('the old lady whirled round', function() {
    shouldTranslate(
      Sentence.$.actor(Entity.$(Word.lady).specifier(wordThis).adjective(Word.old).$)
        .action(Action.$.primary(Word.whirl).adverb(Word.round_adv).$)
        .time(Word.past).$,
      [
        [en, 'the old lady whirled round'],
        [fi, 'vanha rouva pyöri ympäri'],
        [nl, 'de oude dame draaide rond'],
        [ru, 'старая дама кругом кружила']
      ]
    );
  });

  // 7. "The lad fled and disappeared over the fence."
  describe('the lad fled and disappeared over the fence', function() {
    shouldTranslate(
      CompoundSentence.$
        .sentence(Sentence.$.actor(Entity.$(Word.lad).specifier(wordThis).$).action(Word.flee).time(Word.past).$)
        .coordinator(Word.and)
        .sentence(Sentence.$.actor(Entity.$(Word.lad).specifier(wordThis).$)
          .action(Action.$.primary(Word.disappear)
            .prepositionalPhrase(PrepositionalPhrase.$(Word.over).object(Entity.$(Word.fence).specifier(wordThis).$).$).$)
          .time(Word.past).$).$,
      [
        [en, 'the lad fled and the lad disappeared over the fence'],
        [fi, 'nuorukainen pakeni ja nuorukainen katosi aidan yli'],
        [nl, 'de knaap vluchtte en de knaap verdween over het hek'],
        [ru, 'парень убегал и парень исчез над забором']
      ]
    );
  });

  // 8. "Look behind you!"
  describe('look behind you', function() {
    shouldTranslate(
      Sentence.$.actor(Word.you)
        .action(Action.$.primary(Word.look)
          .prepositionalPhrase(PrepositionalPhrase.$(Word.behind).object(Word.you).$).$)
        .time(Word.imperative).$,
      [
        [en, 'look behind you'],
        [fi, 'katso sinun takana'],
        [nl, 'kijk achter jou'],
        [ru, 'смотри за тобой']
      ]
    );
  });

  // 9. "It is jam."
  describe('it is jam', function() {
    shouldTranslate(
      Sentence.$.actor(Word.it)
        .action(Action.$.primary(Word.be).subject(Word.jam).$)
        .time(Word.now).$,
      [
        [en, 'it is jam'],
        [fi, 'on hillo'],
        [nl, 'het is jam'],
        [ru, 'оно варенье']
      ]
    );
  });

  // 10. "I do not know."
  describe('I do not know', function() {
    shouldTranslate(
      Sentence.$.actor(Word.I)
        .action(Action.$.primary(Word.know).negated().$)
        .time(Word.now).$,
      [
        [en, 'I do not know'],
        [fi, 'en tiedä'],
        [nl, 'ik weet niet'],
        [ru, 'я не знаю']
      ]
    );
  });

  // 11. "The switch hovered in the air."
  describe('the switch hovered in the air', function() {
    shouldTranslate(
      Sentence.$.actor(Entity.$(Word.switch_noun).specifier(wordThis).$)
        .action(Action.$.primary(Word.hover)
          .prepositionalPhrase(PrepositionalPhrase.$(Word.in_loc).object(Entity.$(Word.air).specifier(wordThis).$).$).$)
        .time(Word.past).$,
      [
        [en, 'the switch hovered in the air'],
        [fi, 'vitsa leijui ilmassa'],
        [nl, 'de roede zweefde in de lucht'],
        [ru, 'розга парила в воздухе']
      ]
    );
  });

  // 12. "He played and she sang."
  describe('he played and she sang', function() {
    shouldTranslate(
      CompoundSentence.$
        .sentence(Sentence.$.actor(Word.he).action(Word.play).time(Word.past).$)
        .coordinator(Word.and)
        .sentence(Sentence.$.actor(Word.she).action(Word.sing).time(Word.past).$).$,
      [
        [en, 'he played and she sang'],
        [fi, 'leikki ja lauloi'],
        [nl, 'hij speelde en zij zong'],
        [ru, 'он играл и она пела']
      ]
    );
  });

  // 13. "The summer evenings were long." — using "be" + complement adjective
  // (Encoded as: the summer "be" long, time=past, with summer as actor adjective on a generic entity)
  // Simplified: "Summer was long."
  describe('summer was long', function() {
    shouldTranslate(
      Sentence.$.actor(Word.summer)
        .action(Action.$.primary(Word.be).complement(Word.long).$)
        .time(Word.past).$,
      [
        [en, 'summer was long'],
        [fi, 'kesä oli pitkä'],
        [nl, 'de zomer was lang'],
        [ru, 'лето было длинное']
      ]
    );
  });

  // 14. "A stranger was before him."
  describe('a stranger was before him', function() {
    shouldTranslate(
      Sentence.$.actor(Entity.$(Word.stranger).specifier(Word.one).$)
        .action(Action.$.primary(Word.be)
          .prepositionalPhrase(PrepositionalPhrase.$(Word.before_prep).object(Word.he).$).$)
        .time(Word.past).$,
      [
        [en, 'a stranger was before him'],
        [fi, 'muukalainen oli hänen edessä'],
        [nl, 'een vreemdeling was voor hem'],
        [ru, 'незнакомец был перед ним']
      ]
    );
  });

  // 15. "This boy was well dressed." — passive voice
  describe('this boy was well dressed', function() {
    shouldTranslate(
      Sentence.$.actor(Entity.$(Word.boy).specifier(wordThis).$)
        .action(Action.$.primary(Word.dress).passive().adverb(Word.well).$)
        .time(Word.past).$,
      [
        [en, 'the boy was dressed well'],
        [fi, 'poika oli pukenut hyvin'],
        [nl, 'de jongen was gekleed goed'],
        [ru, 'мальчик был одет хорошо']
      ]
    );
  });

  // 16. "I can lick you!"
  describe('I can lick you', function() {
    shouldTranslate(
      Sentence.$.actor(Word.I)
        .action(Action.$.primary(Word.can).secondary(Word.lick).subject(Word.you).$)
        .time(Word.now).$,
      [
        [en, 'I can lick you'],
        [fi, 'voin lyödä sinut'],
        [nl, 'ik kan slaan je'],
        [ru, 'я могу побить тебя']
      ]
    );
  });

  // 17. "What is your name?"
  describe('what is your name', function() {
    shouldTranslate(
      Question.$
        .questionWord(Word.what)
        .actor(Entity.$(Word.name_noun).possessor(Word.you).$)
        .action(Word.be)
        .time(Word.now).$,
      [
        [en, 'what is your name?'],
        [fi, 'mitä on sinun nimi?'],
        [nl, 'wat is jouw naam?'],
        [ru, 'что твоё имя?']
      ]
    );
  });

  // 18. "I am not afraid."
  describe('I am not afraid', function() {
    shouldTranslate(
      Sentence.$.actor(Word.I)
        .action(Action.$.primary(Word.be).complement(Word.afraid).negated().$)
        .time(Word.now).$,
      [
        [en, 'I am not afraid'],
        [fi, 'en ole peloissaan'],
        [nl, 'ik ben niet bang'],
        [ru, 'я не испуган']
      ]
    );
  });

  // 19. "The boy was crying." — progressive aspect
  describe('the boy was crying', function() {
    shouldTranslate(
      Sentence.$.actor(Entity.$(Word.boy).specifier(wordThis).$)
        .action(Word.cry)
        .time(Word.past)
        .aspect(Word.progressive).$,
      [
        [en, 'the boy was crying'],
        [fi, 'poika itki'],
        [nl, 'de jongen was aan het huilen'],
        [ru, 'мальчик плакал']
      ]
    );
  });

  // 20. "Tom chased him."
  describe('he chased him', function() {
    shouldTranslate(
      Sentence.$.actor(Word.he)
        .action(Action.$.primary(Word.chase).subject(Word.he).$)
        .time(Word.past).$,
      [
        [en, 'he chased him'],
        [fi, 'jahtasi hänet'],
        [nl, 'hij achtervolgde hem'],
        [ru, 'он гнал его']
      ]
    );
  });

  // 21. "He climbed cautiously through the window."
  describe('he climbed cautiously through the window', function() {
    shouldTranslate(
      Sentence.$.actor(Word.he)
        .action(Action.$.primary(Word.climb).adverb(Word.cautiously)
          .prepositionalPhrase(PrepositionalPhrase.$(Word.through_prep).object(Entity.$(Word.window).specifier(wordThis).$).$).$)
        .time(Word.past).$,
      [
        [en, 'he climbed cautiously through the window'],
        [fi, 'kiipesi varovasti ikkunasta'],
        [nl, 'hij klom voorzichtig door het raam'],
        [ru, 'он осторожно лез через окно']
      ]
    );
  });

  // 22. "She saw his clothes."
  describe('she saw his clothes', function() {
    shouldTranslate(
      Sentence.$.actor(Word.she)
        .action(Action.$.primary(Word.see).subject(Entity.$(Word.clothes).possessor(Word.he).$).$)
        .time(Word.past).$,
      [
        [en, 'she saw his clothes'],
        [fi, 'näki hänen vaatteet'],
        [nl, 'zij zag zijn kleren'],
        [ru, 'она видела его одежда']
      ]
    );
  });

  // 23. "His aunt stood surprised." — complement on non-be verb
  describe('his aunt stood surprised', function() {
    shouldTranslate(
      Sentence.$.actor(Entity.$(Word.lady).possessor(Word.he).$)
        .action(Action.$.primary(Word.look).complement(Word.surprised).$)
        .time(Word.past).$,
      [
        [en, 'his lady looked surprised'],
        [fi, 'hänen rouva katsoi yllättynyt'],
        [nl, 'zijn dame keek verrast'],
        [ru, 'его дама смотрела удивлённая']
      ]
    );
  });

  // 24. "The cat fled."
  describe('the cat fled', function() {
    shouldTranslate(
      Sentence.$.actor(Entity.$(Word.cat).specifier(wordThis).$)
        .action(Word.flee)
        .time(Word.past).$,
      [
        [en, 'the cat fled'],
        [fi, 'kissa pakeni'],
        [nl, 'de kat vluchtte'],
        [ru, 'кот убегал']
      ]
    );
  });

  // 25. "She gave him the switch." — imperative: Hand me that switch!
  describe('give me that switch', function() {
    shouldTranslate(
      Sentence.$.actor(Word.you)
        .action(Action.$.primary(Word.give).subject(Entity.$(Word.switch_noun).specifier(Word.that).$).$)
        .time(Word.imperative).$,
      [
        [en, 'give the switch'],
        [fi, 'anna vitsa'],
        [nl, 'geef de roede'],
        [ru, 'давай розга']
      ]
    );
  });

});
