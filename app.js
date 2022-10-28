const express=require("express");
const bodyparser=require("body-parser");
const {spawn} = require('child_process');

const app=express();
const gtts=require("gtts");

app.use(bodyparser.urlencoded({extended:true}));



app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){


  var filetext=req.body.filename;
  var inputtext=req.body.inputtext;
  var outputtext=req.body.outputtext;


  const gTTS = require('gtts');

  var speech = filetext;
  var gtts = new gTTS(speech, inputtext);

  gtts.save('Voice.mp3', function (err, result){
    if(err) { throw new Error(err); }
    console.log("Text to speech converted!");
  });





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
});

app.listen(3000,function(){
  console.log("Server is running on port 3000");
});
