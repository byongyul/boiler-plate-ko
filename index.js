const express  = require("express");
const app = express();
const port =3000;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const {User} = require("./models/User");

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose =require('mongoose');
mongoose.connect('mongodb+srv://bychoi:abcd1234@boilerplate.iv8li.mongodb.net/<dbname>?retryWrites=true&w=majority',
                { userBewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify:true
                }).then(()=>{console.log('MongoDB connected...')}).catch(err=> console.log(err))

app.get('/',(req,res)=>{ res.send("Hello World! Happy Chuseok!");});

app.post('/register',(req,res)=>{
    const user = new User(req.body);

    user.save((err,userInfo)=>{
        if(err) return res.json({succes:false,err})
        return res.status(200).json(
            {success:true}
        )
    });
});

app.post('/login',(req,res)=>{
    //email check
    //password check
    //비밀번호까지 맞다면 토큰 생성

    User.findOne({ email:req.body.email},(err,user)=>{
        if(!user){
            return res.json(
                {
                    loginSuccess:false,
                    message:"제공된 이메일에 해당하는 유저가 없습니다."
                }
            )
        }
        user.comparePassword(req.body.password,(err,isMatch)=>{
            if(!isMatch) 
                return res.json({loginSuccess:false,message:"비밀번호가 틀렸습니다."})
            //비밀번호까지 맞다면 토근 생성
            user.generateToken((err,user)=>{
                if(err) return res.status(400).send(err);
                //토큰을 저장한다,어디에?? 쿠키, 로컬 스토리지...?
                //쿠키에 저장하는 걸로
                res.cookie("x_auth", user.token)
                .status(200)
                .json({loginSuccess:true,userId:user._id})


            })
        })
    })
});
app.post('/lo',(req,res)=>{
    return res.status(200).json({success:true});
})
app.listen(port,()=>{
    console.log("server listens on 3000.")
});
