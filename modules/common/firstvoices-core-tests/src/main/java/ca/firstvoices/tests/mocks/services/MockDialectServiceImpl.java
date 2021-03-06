package ca.firstvoices.tests.mocks.services;

import static ca.firstvoices.data.schemas.DialectTypesConstants.FV_ALPHABET;
import static ca.firstvoices.data.schemas.DialectTypesConstants.FV_AUDIO;
import static ca.firstvoices.data.schemas.DialectTypesConstants.FV_BOOK;
import static ca.firstvoices.data.schemas.DialectTypesConstants.FV_BOOKS;
import static ca.firstvoices.data.schemas.DialectTypesConstants.FV_BOOK_ENTRY;
import static ca.firstvoices.data.schemas.DialectTypesConstants.FV_CATEGORIES;
import static ca.firstvoices.data.schemas.DialectTypesConstants.FV_CATEGORY;
import static ca.firstvoices.data.schemas.DialectTypesConstants.FV_CHARACTER;
import static ca.firstvoices.data.schemas.DialectTypesConstants.FV_CONTRIBUTOR;
import static ca.firstvoices.data.schemas.DialectTypesConstants.FV_CONTRIBUTORS;
import static ca.firstvoices.data.schemas.DialectTypesConstants.FV_DICTIONARY;
import static ca.firstvoices.data.schemas.DialectTypesConstants.FV_PHRASE;
import static ca.firstvoices.data.schemas.DialectTypesConstants.FV_PICTURE;
import static ca.firstvoices.data.schemas.DialectTypesConstants.FV_RESOURCES;
import static ca.firstvoices.data.schemas.DialectTypesConstants.FV_VIDEO;
import static ca.firstvoices.data.schemas.DialectTypesConstants.FV_WORD;
import static ca.firstvoices.data.schemas.DomainTypesConstants.FV_DIALECT;
import static ca.firstvoices.data.schemas.DomainTypesConstants.FV_LANGUAGE;
import static ca.firstvoices.data.schemas.DomainTypesConstants.FV_LANGUAGE_FAMILY;

import java.io.File;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.StringJoiner;
import java.util.concurrent.ThreadLocalRandom;
import org.nuxeo.common.utils.FileUtils;
import org.nuxeo.ecm.core.api.CoreSession;
import org.nuxeo.ecm.core.api.DocumentModel;
import org.nuxeo.ecm.core.api.DocumentModelList;
import org.nuxeo.ecm.core.api.NuxeoException;
import org.nuxeo.ecm.core.api.PathRef;
import org.nuxeo.ecm.core.api.impl.DocumentModelListImpl;
import org.nuxeo.ecm.core.api.impl.blob.FileBlob;

public class MockDialectServiceImpl implements MockDialectService {


  private static final String[] alphabetChars = new String[]{
      //Regular alphabet
      "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s",
      "t", "u", "v", "w", "x", "y", "z"};
  private static final String[] multiChars = new String[]{
      //Double and triple characters (Nisga'a)
      "aa", "ee", "ii", "oo", "uu", "yy", "gw", "hl", "k'", "ḵ'", "kw", "kw'", "p'", "t'", "tl'",
      "ts'", "xw"};
  private static final String[] maskChars = new String[]{
      //Maskwacis Cree alphabet
      "ᐊ", "ᐁ", "ᐃ", "ᐅ", "ᐧ", "ᐤ", "ᐸ", "ᐯ", "ᐱ", "ᐳ",
      "ᑊ", "ᐦ", "ᑕ", "ᑌ", "ᑎ", "ᑐ", "ᐟ", "ᑲ", "ᑫ", "ᑭ", "ᑯ", "ᐠ", "ᒐ", "ᒉ", "ᒋ", "ᒍ", "ᐨ", "ᒪ", "ᒣ",
      "ᒥ", "ᒧ", "ᒼ", "ᓇ", "ᓀ", "ᓂ", "ᓄ", "ᐣ", "ᓴ", "ᓭ", "ᓯ", "ᓱ", "ᐢ", "ᔭ", "ᔦ", "ᔨ", "ᔪ", "ᐩ",};
  private static final String[] uniChars = new String[]{
      //Common Unicode characters from confusable_characters.csv
      "ƛ", "¢", "À", "Á", "È", "É", "Ì", "Í", "Î", "Ï", "Ñ", "Ò", "Ó",
      "Ô", "Ö", "Ù", "Ú", "Û", "Ü", "à", "á", "â", "ä", "æ", "è", "é", "ê", "ë", "ì", "í", "î",
      "ï", "ñ", "ò", "ó", "ô", "ö", "ù", "ú", "û", "ü", "ÿ", "Ā", "ā", "Ą", "ą", "Ć", "ĉ", "Č",
      "č", "ē", "Ę", "ę", "ě", "ĝ", "ĥ", "Ĩ", "ĩ", "ī", "Į", "į", "Ĵ", "ĵ", "ĺ", "ľ", "Ł", "ł",
      "ŋ", "Ō", "ō", "œ", "Ś", "ś", "Ŝ", "ŝ", "Š", "š", "Ū", "ū", "Ų", "ų", "Ŵ", "ŵ", "Ÿ", "Ɣ",
      "ƛ", "Ɵ", "ǂ", "ǎ", "Ǐ", "ǐ", "Ǒ", "ǒ", "Ǔ", "ǔ", "ǧ", "ǫ", "Ǭ", "ǭ", "ǰ", "ǳ", "Ⱥ", "Ȼ",
      "ɔ", "ə", "ɬ", "ʔ", "ʦ", "θ", "λ", "ᒼ", "ᕀ", "Ḏ", "ḏ", "ḕ", "ḗ", "ḡ", "ḥ", "Ḵ", "ḵ", "ḷ",
      "Ṉ", "ṉ", "Ṑ", "ṑ", "Ṓ", "ṓ", "Ṣ", "ṣ", "Ṯ", "ṯ", "Ẅ", "ẅ", "Ẑ", "ẑ", "Ẕ", "ẕ", "ị",};

  private static String[] currentAlphabet;
  private static String[] currentWords;

  private static int alphabetCount = ThreadLocalRandom.current().nextInt(0, alphabetChars.length);
  private static int multiCount = ThreadLocalRandom.current().nextInt(0, multiChars.length);
  private static int maskCount = ThreadLocalRandom.current().nextInt(0, maskChars.length);
  private static int uniCount = ThreadLocalRandom.current().nextInt(0, uniChars.length);

  private static final String TRANSLATION = "translation";
  private static final String LANGUAGE = "language";
  private static final String ENGLISH = "english";

  private static void generateRandomAlphabet() {

    Set<String> alphabetSet = new HashSet<>();

    while (alphabetSet.size() < 10) {
      String toAdd = alphabetChars[alphabetCount];
      if (setDoesNotContain(alphabetSet, toAdd)) {
        alphabetSet.add(toAdd);
      }
      alphabetCount += 1;
      if (alphabetCount >= alphabetChars.length) {
        alphabetCount = 0;
      }
    }

    while (alphabetSet.size() < 15) {
      String toAdd = multiChars[multiCount];
      if (setDoesNotContain(alphabetSet, toAdd)) {
        alphabetSet.add(toAdd);
      }
      multiCount += 1;
      if (multiCount >= multiChars.length) {
        multiCount = 0;
      }
    }

    while (alphabetSet.size() < 20) {
      String toAdd = maskChars[maskCount];
      if (setDoesNotContain(alphabetSet, toAdd)) {
        alphabetSet.add(toAdd);
      }
      maskCount += 1;
      if (maskCount >= maskChars.length) {
        maskCount = 0;
      }
    }

    while (alphabetSet.size() < 30) {
      String toAdd = uniChars[uniCount];
      if (setDoesNotContain(alphabetSet, toAdd)) {
        alphabetSet.add(toAdd);
      }
      uniCount += 1;
      if (uniCount >= uniChars.length) {
        uniCount = 0;
      }
    }

    List<String> alphabetList = new ArrayList<>(alphabetSet);
    Collections.shuffle(alphabetList);

    currentAlphabet = alphabetList.toArray(alphabetList.toArray(new String[0]));
  }

  private static void setDemoAlphabet(String[] alphabet) {
    currentAlphabet = alphabet;
  }

  private static boolean setDoesNotContain(Set<String> set, String toAdd) {
    return !set.contains(toAdd) && !set.contains(toAdd.toUpperCase());
  }

  private static String generateRandomWord(String[] alphabet) {

    StringBuilder bld = new StringBuilder();
    for (int i = 0; i < ThreadLocalRandom.current().nextInt(1, 13); i++) {
      bld.append(alphabet[ThreadLocalRandom.current().nextInt(0, alphabet.length)]);
    }

    return bld.toString();
  }

  private static void generateWordArr(int wordEntries) {
    List<String> wordList = new ArrayList<>();

    for (int i = 0; i < wordEntries; i++) {
      wordList.add(generateRandomWord(currentAlphabet));
    }

    //have at least 1 word starting with each letter
    if (wordEntries >= currentAlphabet.length) {
      for (int i = 0; i < currentAlphabet.length; i++) {
        wordList.set(i, currentAlphabet[i] + wordList.get(i).substring(1));
      }
    }
    Collections.shuffle(wordList);

    currentWords = wordList.toArray(wordList.toArray(new String[0]));
  }

  @Override
  public DocumentModel generateMockDemoDialect(CoreSession session, int maxEntries, String name) {
    String desc = "This is a generated test dialect for demo and cypress test purposes.";
    final String[] words = {"Alpha", "Bravo", "Charlie", "Delta", "Echo", "Foxtrot", "Golf",
        "Hotel",
        "India", "Juliet", "Kilo", "Lima", "Mike", "November", "Oscar", "Papa", "Quebec",
        "Romeo", "Sierra", "Tango", "Uniform", "Victor", "Whiskey", "X-Ray", "Yankee", "Zulu"};

    DocumentModel dialect = generateEmptyDialect(session, name, desc);

    setDemoAlphabet(alphabetChars);
    generateFVCharacters(session, dialect.getPathAsString(), alphabetChars);
    DocumentModelList categories = generateFVCategories(session, dialect.getPathAsString());
    DocumentModelList phraseBooks = generateFVPhraseBooks(session, dialect.getPathAsString());
    generateMedia(session, dialect.getPathAsString());
    generateFVWords(session, dialect.getPathAsString(), words, categories);
    generateFVPhrases(session, dialect.getPathAsString(), maxEntries / 2, words,
            phraseBooks);
    generateFVContributors(session, dialect.getPathAsString());
    generateFVSongs(session, dialect.getPathAsString(), 5, words);
    generateFVStories(session, dialect.getPathAsString(), 5, words);

    return dialect;

  }

  @Override
  public DocumentModel generateMockRandomDialect(CoreSession session, int maxEntries) {
    int wordEntries;
    int phraseEntries;
    //Split max entries 50/50 for words and phrases
    if (maxEntries % 2 == 0) {
      wordEntries = maxEntries / 2;
    } else {
      wordEntries = maxEntries / 2 + 1;
    }
    phraseEntries = maxEntries / 2;

    generateRandomAlphabet();
    generateWordArr(wordEntries);
    String name = generateRandomWord(currentAlphabet);
    String desc = generateRandomPhrase(30, currentWords);

    DocumentModel dialect = generateEmptyDialect(session, name, desc);

    generateFVCharacters(session, dialect.getPathAsString(), currentAlphabet);
    DocumentModelList categories = generateFVCategories(session, dialect.getPathAsString());
    DocumentModelList phraseBooks = generateFVPhraseBooks(session, dialect.getPathAsString());
    generateMedia(session, dialect.getPathAsString());
    generateFVWords(session, dialect.getPathAsString(), currentWords, categories);
    generateFVPhrases(session, dialect.getPathAsString(), phraseEntries, currentWords,
        phraseBooks);
    generateFVContributors(session, dialect.getPathAsString());
    generateFVSongs(session, dialect.getPathAsString(), 5, currentWords);
    generateFVStories(session, dialect.getPathAsString(), 5, currentWords);

    return dialect;

  }

  @Override
  public void removeMockDialect(CoreSession session, PathRef path) {
    session.removeDocument(path);

  }

  @Override
  public void removeMockDialects(CoreSession session) {
    PathRef a = new PathRef("/FV/Workspaces/Data/Test/Test");
    PathRef b = new PathRef("/FV/Workspaces/Data/Test");
    session.removeDocument(a);
    session.removeDocument(b);
  }

  private DocumentModel createDocument(CoreSession session, DocumentModel model) {
    model.setPropertyValue("dc:title", model.getName());
    DocumentModel newDoc = session.createDocument(model);
    session.save();

    return newDoc;
  }

  private DocumentModel createDocument(CoreSession session, DocumentModel model, String desc) {
    model.setPropertyValue("dc:title", model.getName());
    model.setPropertyValue("dc:description", desc);
    DocumentModel newDoc = session.createDocument(model);
    session.save();

    return newDoc;
  }

  private void generateDomainTree(CoreSession session) {

    String testPath = "/FV/Workspaces/Data/Test/Test/";
    //if path exists, do nothing
    if (!session.exists(new PathRef(testPath))) {

      if (session.exists(new PathRef("FV/Workspaces/Data/"))) {
        createDocument(session,
            session
                .createDocumentModel("/FV/Workspaces/Data", "Test", FV_LANGUAGE_FAMILY));
        createDocument(session,
            session.createDocumentModel("/FV/Workspaces/Data/Test", "Test",
                FV_LANGUAGE));
      } else {
        throw new NuxeoException("Document tree FV/Workspaces/Data/ must exist");
      }
    }
  }

  private DocumentModel generateEmptyDialect(CoreSession session, String name, String desc) {
    //In the current session, in the /FV/Workspaces/Data/Test/Test/ directory
    //create an empty dialect with all necessary generated children

    generateDomainTree(session);

    DocumentModel dialect = createDocument(session,
        session
            .createDocumentModel("/FV/Workspaces/Data/Test/Test/", name, FV_DIALECT), desc);

    createDocument(session,
        session.createDocumentModel(dialect.getPathAsString(), "Alphabet", FV_ALPHABET));
    createDocument(session,
        session.createDocumentModel(dialect.getPathAsString(), "Dictionary", FV_DICTIONARY));
    createDocument(session,
        session.createDocumentModel(dialect.getPathAsString(), "Categories", FV_CATEGORIES));
    createDocument(session,
        session.createDocumentModel(dialect.getPathAsString(), "Phrase Books", FV_CATEGORIES));
    createDocument(session,
        session.createDocumentModel(dialect.getPathAsString(), "Contributors", FV_CONTRIBUTORS));
    createDocument(session,
        session.createDocumentModel(dialect.getPathAsString(), "Stories & Songs", FV_BOOKS));
    createDocument(session,
        session.createDocumentModel(dialect.getPathAsString(), "Resources", FV_RESOURCES));

    return dialect;
  }

  private DocumentModelList generateFVCharacters(CoreSession session, String path,
      String[] alphabet) {
    DocumentModelList fvAlphabet = new DocumentModelListImpl();

    for (int i = 0; i < alphabet.length; i++) {
      DocumentModel letterDoc = session
          .createDocumentModel(path + "/Alphabet", alphabet[i], FV_CHARACTER);
      letterDoc.setPropertyValue("fvcharacter:alphabet_order", i + 1);
      letterDoc.setPropertyValue("fvcharacter:upper_case_character", alphabet[i].toUpperCase());
      createDocument(session, letterDoc);
      fvAlphabet.add(letterDoc);

    }
    return fvAlphabet;
  }

  private String generateRandomPhrase(int numberOfWords, String[] wordsToUse) {
    StringJoiner join = new StringJoiner(" ");
    for (int i = 0; i < numberOfWords; i++) {
      join.add(wordsToUse[ThreadLocalRandom.current().nextInt(0, wordsToUse.length)]);
    }
    return join.toString();
  }

  private void generateMedia(CoreSession session, String path) {

    String resourcesFolder = path + "/Resources";

    //Generate an audio
    DocumentModel audioDoc = createDocument(session,
        session.createDocumentModel(resourcesFolder, "audio", FV_AUDIO));
    File audioFile =  FileUtils.getResourceFileFromContext("nuxeo.war/mock-data-media/TestWav.wav");
    FileBlob audioBlob = new FileBlob(audioFile, "audio/wav");
    audioDoc.setPropertyValue("file:content", audioBlob);
    session.saveDocument(audioDoc);

    //Generate a picture
    DocumentModel pictureDoc = createDocument(session,
        session.createDocumentModel(resourcesFolder, "picture", FV_PICTURE));
    File pictureFile = FileUtils
        .getResourceFileFromContext("nuxeo.war/mock-data-media/TestPhoto.jpg");
    FileBlob pictureBlob = new FileBlob(pictureFile, "image/jpeg");
    pictureDoc.setPropertyValue("file:content", pictureBlob);
    session.saveDocument(pictureDoc);

    //Generate a video
    DocumentModel videoDoc = createDocument(session,
        session.createDocumentModel(resourcesFolder, "video", FV_VIDEO));
    File videoFile = FileUtils
        .getResourceFileFromContext("nuxeo.war/mock-data-media/TestVideo.mp4");
    FileBlob videoBlob = new FileBlob(videoFile, "video/mp4");
    videoDoc.setPropertyValue("file:content", videoBlob);
    session.saveDocument(videoDoc);
  }

  public DocumentModelList generateFVWords(CoreSession session, String path,
      String[] words, DocumentModelList categories) {
    //Generate word documents and set appropriate properties
    String[] samplePartsOfSpeech = {"noun", "pronoun", "adjective", "verb", "adverb"};
    DocumentModelList fvWords = new DocumentModelListImpl();

    for (String word : words) {
      final DocumentModel wordDoc = session
          .createDocumentModel(path + "/Dictionary", word, FV_WORD);

      ArrayList<Map<String, String>> definition = new ArrayList<>();
      Map<String, String> definitionEntry = new HashMap<>();
      definitionEntry.put(TRANSLATION, "Definition of " + word);
      definitionEntry.put(LANGUAGE, ENGLISH);
      definition.add(definitionEntry);
      wordDoc.setPropertyValue("fv:definitions", definition);
      wordDoc.setPropertyValue("fv-word:part_of_speech",
          samplePartsOfSpeech[ThreadLocalRandom.current().nextInt(0, samplePartsOfSpeech.length)]);
      wordDoc.setPropertyValue("fv-word:pronunciation", wordDoc.getName() + " pronunciation");

      setMedia(session, path, wordDoc);

      //Makes the word available in kids portal with 1/2 chance
      if (ThreadLocalRandom.current().nextInt(0, 2) == 0) {
        wordDoc.setPropertyValue("fv:available_in_childrens_archive", true);
      }

      //Makes the word available in games with 1/3 chance
      if (ThreadLocalRandom.current().nextInt(0, 3) == 0) {
        wordDoc.setPropertyValue("fv-word:available_in_games", true);
      }

      if (categories != null && !categories.isEmpty()) {
        String randomCategory = categories
            .get(ThreadLocalRandom.current().nextInt(0, categories.size())).getId();
        String[] categoryArr = {randomCategory};
        wordDoc.setPropertyValue("fv-word:categories", categoryArr);
      }
      fvWords.add(createDocument(session, wordDoc));
    }

    return fvWords;
  }

  public DocumentModelList generateFVPhrases(CoreSession session, String path, int phraseEntries,
      String[] wordsToUse, DocumentModelList phraseBooks) {
    //Generate phrase documents
    DocumentModelList fvPhrases = new DocumentModelListImpl();

    for (int i = 0; i < phraseEntries; i++) {
      String newPhrase = generateRandomPhrase(ThreadLocalRandom.current().nextInt(3, 10),
          wordsToUse);
      final DocumentModel phraseDoc = session
          .createDocumentModel(path + "/Dictionary", newPhrase, FV_PHRASE);

      ArrayList<Map<String, String>> definition = new ArrayList<>();
      Map<String, String> definitionEntry = new HashMap<>();
      definitionEntry.put(TRANSLATION, "Definition of " + newPhrase);
      definitionEntry.put(LANGUAGE, ENGLISH);
      definition.add(definitionEntry);
      phraseDoc.setPropertyValue("fv:definitions", definition);

      setMedia(session, path, phraseDoc);

      if (phraseBooks != null) {
        String randomPhraseBook = phraseBooks
            .get(ThreadLocalRandom.current().nextInt(0, phraseBooks.size())).getId();
        String[] phraseBookArr = {randomPhraseBook};
        phraseDoc.setPropertyValue("fv-phrase:phrase_books", phraseBookArr);
      }

      //Makes the phrase available in kids portal with 1/2 chance
      if (ThreadLocalRandom.current().nextInt(0, 2) == 0) {
        phraseDoc.setPropertyValue("fv:available_in_childrens_archive", true);
      }

      fvPhrases.add(createDocument(session, phraseDoc));
    }

    return fvPhrases;
  }

  private DocumentModelList generateFVCategories(CoreSession session, String path) {
    //Generate category document tree
    //set to 3 categories, each with 2 subcategories (Hardcoded for now)
    DocumentModelList fvCategories = new DocumentModelListImpl();

    for (int i = 0; i < 3; i++) {
      //Add parent categories
      String parentCategoryName = "Parent Category " + currentAlphabet[i].toUpperCase();
      DocumentModel categoryDoc = session
          .createDocumentModel(path + "/Categories", parentCategoryName, FV_CATEGORY);
      fvCategories.add(createDocument(session, categoryDoc));

      for (int j = 0; j < 2; j++) {
        //Add child categories
        String childCategoryName =
            "Child Category " + currentAlphabet[i].toUpperCase() + currentAlphabet[j]
                .toUpperCase();
        DocumentModel childCategoryDoc = session
            .createDocumentModel(path + "/Categories/" + parentCategoryName, childCategoryName,
                FV_CATEGORY);
        fvCategories.add(createDocument(session, childCategoryDoc));
      }
    }

    return fvCategories;
  }

  private DocumentModelList generateFVPhraseBooks(CoreSession session, String path) {
    //Generate phrase book documents
    DocumentModelList fvPhraseBooks = new DocumentModelListImpl();

    for (int i = 0; i < 3; i++) {
      String phraseBookName = "Phrase Book " + currentAlphabet[i].toUpperCase();
      DocumentModel phraseBookDoc = session
          .createDocumentModel(path + "/Phrase Books", phraseBookName, FV_CATEGORY);
      fvPhraseBooks.add(createDocument(session, phraseBookDoc));
    }

    return fvPhraseBooks;
  }

  private DocumentModelList generateFVContributors(CoreSession session, String path) {
    //Generate contributors
    DocumentModelList fvContributors = new DocumentModelListImpl();

    DocumentModel contributorDoc = session
        .createDocumentModel(path + "/Contributors", "Contributor", FV_CONTRIBUTOR);
    fvContributors.add(createDocument(session, contributorDoc));
    return fvContributors;
  }

  private DocumentModelList generateFVSongs(CoreSession session, String path, int songEntries,
      String[] wordsToUse) {
    return createBook(session, path, "song", wordsToUse, songEntries);
  }

  private DocumentModelList generateFVStories(CoreSession session, String path, int storyEntries,
      String[] wordsToUse) {
    return createBook(session, path, "story", wordsToUse, storyEntries);
  }

  private DocumentModelList createBook(CoreSession session, String path,
      String type, String[] wordsToUse, int numBooks) {
    DocumentModelList fvBooks = new DocumentModelListImpl();
    //Generate a book of specified type
    for (int i = 0; i < numBooks; i++) {
      String title = generateRandomPhrase(ThreadLocalRandom.current().nextInt(3, 10),
          wordsToUse);

      DocumentModel bookDoc = session
          .createDocumentModel(path + "/Stories & Songs", title, FV_BOOK);
      bookDoc.setPropertyValue("fvbook:type", type);

      ArrayList<Map<String, String>> titleTranslation = new ArrayList<>();
      Map<String, String> titleTranslationEntry = new HashMap<>();
      titleTranslationEntry.put(TRANSLATION, "Title Translation to English");
      titleTranslationEntry.put(LANGUAGE, ENGLISH);
      titleTranslation.add(titleTranslationEntry);
      bookDoc.setPropertyValue("fvbook:title_literal_translation", titleTranslation);

      String introduction = generateRandomPhrase(ThreadLocalRandom.current().nextInt(10, 50),
          wordsToUse);
      bookDoc.setPropertyValue("fvbook:introduction", introduction);

      //attach media documents
      setMedia(session, path, bookDoc);

      ArrayList<Map<String, String>> introductionTranslation = new ArrayList<>();
      Map<String, String> introductionTranslationEntry = new HashMap<>();
      introductionTranslationEntry.put(TRANSLATION, "Introduction translation to English");
      introductionTranslationEntry.put(LANGUAGE, ENGLISH);
      introductionTranslation.add(introductionTranslationEntry);
      bookDoc.setPropertyValue("fvbook:introduction_literal_translation", introductionTranslation);

      bookDoc.setPropertyValue("fvbook:acknowledgement", "Acknowledgement");
      String[] culturalNoteArr = {"Cultural note"};
      bookDoc.setPropertyValue("fv:cultural_note", culturalNoteArr);
      String[] contributorsArray = {"Contributor"};
      bookDoc.setPropertyValue("dc:contributors", contributorsArray);

      fvBooks.add(createDocument(session, bookDoc));

      // generate pages within book
      String bookPath = bookDoc.getPathAsString();
      int numPages = ThreadLocalRandom.current().nextInt(1, 15);
      for (int k = 0; k < numPages; k++) {

        ArrayList<Map<String, String>> pageTranslation = new ArrayList<>();
        Map<String, String> pageTranslationEntry = new HashMap<>();
        pageTranslationEntry.put(LANGUAGE, ENGLISH);
        pageTranslationEntry.put(TRANSLATION, "Page translation to English");
        pageTranslation.add(pageTranslationEntry);

        DocumentModelList fvPage = new DocumentModelListImpl();
        String pageTitle = generateRandomPhrase(ThreadLocalRandom.current().nextInt(15, 130),
            wordsToUse);
        DocumentModel pageDoc = session
            .createDocumentModel(bookPath, pageTitle, FV_BOOK_ENTRY);
        pageDoc.setPropertyValue("fvbookentry:dominant_language_text", pageTranslation);
        fvPage.add(createDocument(session, pageDoc));
      }
    }

    return fvBooks;
  }

  private void setMedia(CoreSession session, String path,
      DocumentModel entry) {

    // Get audio files and set on property
    DocumentModelList audio = session
        .getChildren(new PathRef(path + "/Resources"), FV_AUDIO);

    if (!audio.isEmpty()) {
      entry.setPropertyValue("fv:related_audio", new String[]{audio.get(0).getId()});
    }

    // Get images and set on property
    DocumentModelList pictures = session
        .getChildren(new PathRef(path + "/Resources"), FV_PICTURE);

    if (!pictures.isEmpty()) {
      entry.setPropertyValue("fv:related_pictures", new String[]{pictures.get(0).getId()});
    }

    // Get videos and set on property
    DocumentModelList videos = session
        .getChildren(new PathRef(path + "/Resources"), FV_VIDEO);

    if (!videos.isEmpty()) {
      entry.setPropertyValue("fv:related_videos", new String[]{videos.get(0).getId()});
    }
  }

}
