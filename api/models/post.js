const {Schema,model} = require('mongoose')

const post=new Schema({
    title:{type:String},
    summary:{type:String},
    locations:{type:[String]},
    content:{type:String},
    cover:{type:String},
    author:{type:Schema.Types.ObjectId,ref:'user'}},{
        timestamps:true,
    }
)

const Postmodel=model('Post',post);

module.exports=Postmodel

