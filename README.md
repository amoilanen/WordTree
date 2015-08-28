# WordTree

Experiment in building formalized common grammar and vocabulary meta-representation for several languages.

Problems with language translation are cause not by languages themselves being difficult but rather that spoken languages omit a lot of things and
are optimized by their native speakers to be short and meaningful which leads to ambiguity.

For example words 'you singular' and 'you plural' are indistinguishable in English unlike in many other languages where those are distinct words.

In fact languages share common grammar and vocabularly in the sense that every spoken language is just a rendition of some single common higher level language into a particular human language.

Metaphor: single common language is like a tree being lit by the sun and every particular language is just a shadow or reflection of this tree. Reflection in water, shadow on the ground or shadow on a rock would be different human languages. Translating between human languages is difficult becuase it is hard to reconstruct the full image of the tree from its shadow as many details are omitted or shortened. How exactly those details are omitted is specific to every language and reflects the particular way how it perceives the surrounding world and has developed over time. It is difficult to understand what would be the reflection of the tree in the water based on its shadow on the ground, then the most challenging thing in automated translation is reconstructing the common language representation based on a given fragment in some specific human language and we do not deal with this challenge in this project, we only try to build a subset of this common language.

Based on this metaphor the project is called WordTree.

This project is a simple experiment in building a subset of the+ single common higher level language that will be sufficient for describing a short text
that contains only positive descriptional sentences.

Text (in Finnish, source yle.fi):

'Lauantai on ollut lämmin päivä. Lämpimin paikka oli Kouvolan Utti, jossa oli melkein 25 astetta lämmintä. Pohjois-Suomessa oli lauantaina selvästi kylmempää kuin etelässä. Sää kylmenee myös etelässä jo sunnuntaina. Ensi viikko eli juhannusviikko on melko kylmä koko maassa. Ensi viikolla sataa myös vettä.'

We are still using one of the languages (English) as the base to specify the common abstract meta-language and may be limited by this selected language.
Hopefully the programming language such as JavaScript brings more formalism and mathematical like definitions. Although our discussion is still quite informal.

Speculation:

1. The common language does not change much or stays unchanged unlike the individual languages that are its renditions. Then it is appropriate to describe it using mathematical formulas or pure functions in a programming language (functional programming).

2. Most of the exceptions with inflictions are not really exceptions, but if the pronunciation is taken into account just natural shortenings that are then written down a bit differently

3. Languages are pretty common:

3.1 words, words are inflicted to indicate action, object, subject, belonging, etc. Sometimes the inflictions 
3.2 Common linear structure, something is described as a sequence of events. Another category of sentences stating facts is modeled after sequences of actions, i.e. 'to be true' vs. 'to be'. That is in fact is expressed still as a sequence of events. This may be the limitation of natural languages and why we need more formal notation like mathematics.

4. Redefining Turing test. Machine passes the test if it can reconstruct universal representation from any random text in any language and translates the text to any other language with 100% accuracy.

5. Words can be easily added to a language from other languages, also points out commonality. Just follow common grammar rules in that language

6. In different contexts various languages demonstrate different variability: i.e. same phrase in English but two different phrases in Dutch

7. Language rules are pretty formal, even exceptions are not that exceptional, it is just the rules are oversimplified or not adequate. For example, rules of pronunciation and inscription can explain many of the so called 'irregular' verbs. This level of language formalization is not addressed by this simple project.

8. 3 basic tenses: past, now, future, different persons

Notes

Verbs irregular in one language may be not irregular in other languages? Is this related to how often some verb is used?

9. Despite some features specific to some languages (more past tenses, self directed action form, etc.) those may be just extra complicated constructs thought up by people studying those languages and at the core they are still similar and simple. At least in this experiment all such differences can be easily accomodated for. Simple things can be described in complex ways.

10. This experiment is a constructive proof that universal grammar rules and common language can be constructed. What these rules and language look like is starting to get clear from the implementation of only a small subset of it in the present experiment.

11. Challenge of automatic translation between languages is then the challenge of recognizing the original common language representation. i.e. the problem of translation is equivalent to the problem of recognition.

12. Action conjugations of the present forms are more irregular than the past forms. May be related to the frequency of use: present forms are used more often than the past ones

13. Languages are also a reflection of the environment, then they should be similar even if they develop independently and are completely isolated

14. Persons often match, he she it often have the same action conjugations

15. Language develops most the means (or rather retains more advanced and nuanced features of the universal language) needed to describe the particular environment in which it is used. Other languages can still be used to describe the same environment but they will require more constructs and may be less expressive.

16. Equivivalence of different texts. Texts can communicate the same information but in different forms, i.e. many ways to build a sentence in the abstract meta-language. Is there an even more abstract language in which there will be one and only one way to describe something?

17. Human languages and the common meta-grammar/meta-language we built are still too low level. Like zeros and ones for computers. i.e. we do not formalize how to command a language, how to write a poem in it, etc. which may still be too low level.

18. Constructive proof that a meta-grammar/meta-language for the selected languages exists: the number of primitive grammatical constructs is finite and by defining how to combine them for any language and providing a means to accomodate the next grammatical construct from some language we can build the full meta-grammar/meta-language. Discuss how the next grammatical constructions can be accomodated.

19. Languages tend to use same grammatical constructions for things as for persons when they are performing some actions