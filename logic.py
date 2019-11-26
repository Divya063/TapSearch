import nltk
import re
from collections import defaultdict
from nltk.stem.snowball import EnglishStemmer  # Assuming we're working with English


class Index:
    """ Inverted index data structure """

    def __init__(self):
        """
        tokenizer   - NLTK compatible tokenizer function
        stemmer     - NLTK compatible stemmer
        stopwords   - list of ignored words
        """
        self.tokenizer = nltk.word_tokenize
        self.stemmer = EnglishStemmer()
        self.index = defaultdict(list)
        self.documents = {}
        self.__unique_id = 0
        self.stopwords = set(nltk.corpus.stopwords.words('english'))

    def lookup(self, word):
        """
        Lookup a word in the index
        """
        word = word.lower()
        if self.stemmer:
            word = self.stemmer.stem(word)

        if word not in self.index.keys():
            return None

        return {"para": [self.documents.get(id, None) for id in self.index.get(word)]}

    def add(self, document):
        """
        Add a document string to the index
        """

        paragraphs = re.split('\n\s*\n', document)
        print(paragraphs)
        for paragraph in paragraphs:
            try:
                for token in [t.lower() for t in nltk.word_tokenize(paragraph)]:
                    if token in self.stopwords:
                        continue

                    if self.stemmer:
                        token = self.stemmer.stem(token)

                    if self.__unique_id not in self.index[token]:
                        self.index[token].append(self.__unique_id)

                self.documents[self.__unique_id] = paragraph
                self.__unique_id += 1

            except Exception as e:
                print('Error: ', e)
                return None

        return {"item": paragraphs}

    def clear_index(self):
        try:
            self.documents.clear()
            self.index.clear()

        except Exception as e:
            print('Error: ', e)
            return None
        return {"status": "done"}
