const express=require("express");
const bodyparser=require("body-parser");
const ejs = require("ejs");
const {spawn} = require('child_process');


const app=express();
const gtts=require("gtts");
app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/home.html");
});

app.get("/home",function(req,res){
  res.sendFile(__dirname+"/index.html");
});

// text to emotion analyser
app.get("/t2e",function(req,res){
  res.sendFile(__dirname+"/t2e.html")
})

app.get("/chat",function(req,res){
  res.sendFile(__dirname+"/chat.html")
})

app.post("/chat",function(req,res){
  var text =req.body.myfile;

  const pypro = spawn('python',['chat_to_speech.py',text]);

pypro.stdout.on('data',(data)=>{
   
   data=data.toString();
    console.log('stdout:',data);
    res.render("t2eres.ejs",{data:data});
});

pypro.stderr.on('data',(data)=>{
    data=data.toString()
    
    console.error('stderr:',data);
});

pypro.on('close',(code)=>{
    console.log('py exited with code',code);
})

  

})


app.get("/stt",function(req,res){
  res.redirect('http://localhost:3000/default')
})

app.post("/t2e",function(req,res){
  var text =req.body.text;

  const pypro = spawn('python',['t2e.py',text]);

pypro.stdout.on('data',(data)=>{
   
   data=data.toString();
    console.log('stdout:',data);
    res.render("t2eres.ejs",{data:data});
});

pypro.stderr.on('data',(data)=>{
    data=data.toString()
    
    console.error('stderr:',data);
});

pypro.on('close',(code)=>{
    console.log('py exited with code',code);
})

  

})

//text to speech, diff lang accent
app.post("/home",function(req,res){


  var filetext=req.body.filename;
  var inputtext=req.body.inputtext;
  var outputtext=req.body.outputtext;
  console.log(inputtext)


  const gTTS = require('gtts');

  var speech = filetext;
  var gtts = new gTTS(speech, inputtext);

  gtts.save('Voice.mp3', function (err, result){
    if(err) { throw new Error(err); }
    console.log("Text to speech converted!");
  });
  console.log('*')

  /*const pypro = spawn('python',['t2e.py','i am happy now']);

pypro.stdout.on('data',(data)=>{
    data=data.toString()
    console.log('stdout:',data);
    //res.send(data);
});

pypro.stderr.on('data',(data)=>{
    data=data.toString()
    console.error('stderr:',data);
});

pypro.on('close',(code)=>{
    console.log('py exited with code',code);
})*/





 //  var dataToSend;
 //
 //    const python = spawn('python3', ['demo.py',filetext,inputtext,outputtext]);
 //    //console.log("python value: ",python)
 //    python.stdout.on('data', function (data) {
 //  //console.log('Pipe data from python script ...');
 //          dataToSend = data.toString();
 //  //console.log(dataToSend);
 // });
 // python.stderr.on('data',data=>{
 //   console.error("error:",data);
 // })
 //
 // python.on('exit', (code) => {
 // console.log('child process close all stdio with code ${code},${dataToSend}');
 // res.sendFile(__dirname+"/result.html")
 // });
 res.sendFile(__dirname+"/result.html");

});


app.get("/language",function(req,res){
  res.sendFile(__dirname+"/language.html")
});

app.post("/language",function(req,res){
var text=req.body.text;
var rate=req.body.rate;
var volume=req.body.volume;
var gender=req.body.gender;
const pypro = spawn('python',['language.py',text,rate,volume,gender]);

pypro.stdout.on('data',(data)=>{
  data=data.toString()
  console.log('stdout:',data);
  //res.send(data);
});

pypro.stderr.on('data',(data)=>{
  data=data.toString()
  console.error('stderr:',data);
});

pypro.on('close',(code)=>{
  console.log('py exited with code',code);
})

});

app.listen(8000,function(){
  console.log("Server is running on port 8000");
});
