import os
import sys
import math

"""
Para ejecutar script.py, hacer "python script.py N" donde N
"""

def tf(word, doc):
    # Retorna la frecuencia de dicha palabra en relación al total de palabras del documento
    return doc[word] / sum(doc.values())


def n_containing(word, documents):
    # Calcula cuantos documentos contienen una palabra en especifico
    return sum(1 for doc in documents if word in doc)


def idf(word, documents):
    # Calcula la frecuencia inversa de la palabra en las palabras
    return math.log(len(documents) / (1 + n_containing(word, documents)))


def tfidf(word, doc, documents):
    # Retorna la frecuencia dada por tf * idf
    return tf(word, doc) * idf(word, documents)


def parse(document):
    # Para cada documento, retorna un dicionario con el contador de cada palabra con largo mayor a 2.
    counter = {}
    for word in document.split(" "):
        if len(word) > 2:
            if word in counter:
                counter[word] += 1
            else:
                counter[word] = 1
    return counter

def preprocesing(text):
    return text.replace("\n", " ").replace(",", " ").replace(".", " ").replace("-", "").replace("\t", "")

if __name__ == "__main__":

    # Guardamos cada documento preprocesado
    documents = []
    for text in os.listdir("avisos"):
        if text != ".DS_Store":
            with open("avisos/{}".format(text), encoding="utf-8") as file:
                documents.append(parse(preprocesing("".join(file.readlines()))))

    # Para cada documento le aplicamos la técnica de TF-IDF para obtener dicha frecuencia
    data = []
    for i, doc in enumerate(documents):
        print("Top words in document {} -> {}".format(i + 1, os.listdir("avisos")[i]))
        # Calculamos la frecuencia
        scores = {word: tfidf(word, doc, documents) for word in doc.keys()}

        # Ordenamos cada palabra por su frecuencia
        sorted_words = sorted(scores.items(), key=lambda x: x[1], reverse=True)

        # Se imprime cada palabra del documento y se guardan en una lista para luego imprimir
        for word, score in sorted_words:    
            data.append([os.listdir("avisos")[i], word, round(score, 5)])
            print("\tWord: {}, TF-IDF: {}".format(word, round(score, 5)))

    # Se imprime los N terminos con mayor frecuencia
    print("| {:15s}|{:15s}| {:12s} |".format("Documento", "Palabra", "Valor TF-IDF"))
    print("|{}|{}|{}|".format("-"*16, "-"*15, "-"*14))
    for i, y in enumerate(sorted(data, key=lambda x: x[2], reverse=True)):

        if i == int(sys.argv[1]):
            break

        print("| {:15.15s}|{:15.15s}| {:12f} |".format(*y))
