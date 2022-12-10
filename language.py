import pyttsx3
import sys
engine=pyttsx3.init()
text=str(sys.argv[1])
rate=str(sys.argv[2])

vol=str(sys.argv[3])
engine.setProperty("rate",int(rate))
engine.setProperty("volume",int(vol))
voices=engine.getProperty("voices")
voi=str(sys.argv[4])
print("Successful")
if voi=='1':
    #print("voi is: ",voices[1].id)
    engine.setProperty("voice",voices[1].id)
elif voi=='0':
    engine.setProperty("voice",voices[0].id)
else:
    print("Invalid input")
engine.say(text)
engine.runAndWait()