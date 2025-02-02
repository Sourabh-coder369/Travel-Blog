const mongoose=require('mongoose');

const {Schema,model}= mongoose;

const Userschema =new Schema({
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true}
})

const usermodel=model('user',Userschema);

module.exports=usermodel;











