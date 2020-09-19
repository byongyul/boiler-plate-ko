const express  = require("express");
const app = express();
const port =3000;

const mongoose =require('mongoose');
mongoose.connect('mongodb+srv://bychoi:abcd1234@boilerplate.iv8li.mongodb.net/<dbname>?retryWrites=true&w=majority',
                { userBewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify:true
                }).then(()=>{console.log('MonggoDB connected...')}).catch(err=> console.log(err))
app.get('/',(req,res)=>{
    res.send("Hello World 안녕하세요?");
})

app.listen(port,()=>{
    console.log("server listens on 3000.")
});
