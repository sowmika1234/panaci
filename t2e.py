import sys
import text2emotion as te
import nltk
nltk.download('omw-1.4')
def t2e(text):
    d=te.get_emotion(text)
    return d
text = str(sys.argv[1])
print(t2e(text))

#print('Welcome')

