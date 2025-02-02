const express=require('express');
const mongoose=require('mongoose');
const User=require('./models/user');
const cors=require('cors');
const jwt=require('jsonwebtoken');
const cookieParser=require('cookie-parser')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const fs=require('fs');
const Post=require('./models/post')

const app=express()
const url='mongodb://localhost:27017/Blog;'
const secret = 'asdfe45we45w345wegw345werjktjwertkj';

app.use(express.json())
app.use(cors({credentials:true,origin:'http://localhost:5173'}))
app.use(cookieParser());
app.use('/uploads',express.static(__dirname+'/uploads'))

mongoose.connect(url);

app.post('/register',async (req,res)=>{
    const {username,password}=req.body;
    try{
        const data=await User.create({username,password});
        res.json(data);
    }catch(e){
        res.status(400).json(e);
    }
})

app.post('/login',async (req,res)=>{
    const {username,password}=req.body;
    try{
        const data=await User.findOne({username});
        console.log(data)
        if(data.password===password){
            jwt.sign({username,id:data._id},secret,{},(err,token)=>{
                if(err) throw err;
                res.cookie('token',token).json({username,id:data._id,flag:true});
            })
        }
        else{
            res.json({flag:false});
        }
    }
    catch(e){
        console.log(e)
        res.status(400).json("Login details Not Found");
    }
})


app.get('/profile',(req,res)=>{
    const {token}=req.cookies;
    
    jwt.verify(token,secret,{},(err,info)=>{
        if(err){res.status(401).json({error:"Token Not verified"})};
        res.json(info);
    })
})

app.post('/logout',(req,res)=>{
    res.cookie('token','').json('ok');
})

app.post('/newpost',upload.single('file'),(req,res)=>{
    let newpath=null;
    if(req.file){
        const {file,originalname,path}=req.file;
        const type=originalname.split('.');
        newpath=path+'.'+type[1];
        fs.renameSync(path,newpath)
    }

    const {token}= req.cookies;
    jwt.verify(token,secret,{},async(err,info)=>{
        if (err) throw err;
        const {title,content,summary,locations}=req.body;
        //console.log(info.iat)
        const data=await Post.create({
            title:title,
            summary:summary,
            content:content,
            locations:JSON.parse(locations),
            cover:newpath,
            author:info.id,
        })
        res.json(data);
    })
})

app.get('/post',async (req,res)=>{
    const displayPosts=await Post.find().populate('author');
    res.json(displayPosts);
})


app.get('/posts/:id',async (req,res)=>{
    const {id}=req.params;
    console.log('This is the id----',id);
    const postData=await Post.findById(id).populate('author',['username']);

    res.json(postData);

})

app.get('/getpost/:id',async (req,res)=>{
    const {id}=req.params;
    const postPage=await Post.findById(id);

    res.json(postPage);
})

app.get('/search',async (req,res)=>{
    const {searchValue}=req.query;
    let searchResults=await Post.find(
    {$or:[{locations:{ $regex: searchValue, $options: 'i' }},{title: { $regex: searchValue,$options: 'i' }}],
    }).populate('author');

    console.log(searchResults);
    res.json(searchResults);
})

app.put('/editpost/:id',upload.single('file'),async (req,res)=>{
    let newpath=null;
    if(req.file){
        const {file,originalname,path}=req.file;
        const type=originalname.split('.');
        newpath=path+'.'+type[1];
        fs.renameSync(path,newpath)
    }
    
    const {token}= req.cookies;
    const {id}=req.params;
    jwt.verify(token,secret,{},async(err,info)=>{
        if (err) throw err;
        const {title,content,summary,locations}=req.body;
        const updateLocation=JSON.parse(locations)
        const data=await Post.findByIdAndUpdate(id,{title,content,summary,updateLocation},{new:true});
        res.json(data);
    })
})

app.listen(4000)
