import json
from transformers import pipeline
from random import randint

wordsFilePath = 'topWords.json' 


def getWordList():
    with open(wordsFilePath, 'r') as file:
        words = json.load(file)
    return words



def generateText(words: str):
    generator = pipeline('text-generation', model ='EleutherAI/gpt-neo-125M')
    post = words
    result = generator(post, max_length=50, do_sample=True, temperature=0.9)
    return result


def trimText(text):
    lastDot = 0
    for i in range(len(text) - 1, -1, -1):
        if text[i] in '.?!”“':
            lastDot = i
            break
    text = text.capitalize()
    return text[:lastDot + 1]


def workflow(brandType: str):
    wordsDict = getWordList()
    brandWords = wordsDict[brandType]
    wordsKeys = brandWords[randint(0, len(brandWords)) - 1].keys()
    words = list(wordsKeys)[0]
    text = trimText(generateText(words)[0]['generated_text'])
    return text


if __name__ == "__main__":
    text = workflow("fashion")
    print(text)