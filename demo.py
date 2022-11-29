from gtts import gTTS
import sys
from playsound import playsound

from translate import Translator



class clsTranslate():

    def translateText(self, strString, strTolang):
        self.strString = strString
        self.strTolang = strTolang
        translator = Translator(to_lang=self.strTolang)
        translation = translator.translate(self.strString)
        return (str(translation))

# Create a Class object and call the Translate function



mytext=""
l=[]
#res.append(sub.replace("\n", ""))
with open("result.html",encoding="utf-8") as f:
    for line in f:
        l.append(line.replace("\n","\t"))


for line in l:
    mytext+=line



objTrans=clsTranslate()
mytext= objTrans.translateText(mytext,sys.argv[2])
print(mytext)
#smytext="Où est-ce que vous allez Madame, Monsieur ?/ Quelle est votre destination ?"
language=sys.argv[3]

obj=gTTS(text=mytext,lang=language)
obj.save("welcome.mp3")
#os.system("welcome.mp3")
#print(gtts-cli --all)
playsound("welcome.mp3")
sys.stdout.flush()
