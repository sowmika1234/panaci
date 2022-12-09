import sys
import pandas as pd
import re
from pandas import DataFrame as df
import pyttsx3
engine = pyttsx3.init()
voices = engine.getProperty('voices')
file = sys.argv[1]
emoji_key = df(pd.read_csv(file, encoding='utf-8', index_col=0))
chat=((emoji_key.iloc[:,0]))
x=''
y=''
for i in range(len(chat)):
    s=str(chat[i])
    a=s[12:].split()
    if x=="":
        x=a[0]
        p1=1
    elif x==a[0]:
        p1=1
    elif y=="":
        y=a[0]
        p1=0 
    else :
        p1=0
    rx=" ".join(a[1:])
    engine.setProperty('voice', voices[p1].id)
    engine.say(rx)
engine.runAndWait()