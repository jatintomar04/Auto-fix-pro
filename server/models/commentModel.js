const { mongoose } = require("mongoose");

const commentSchema = new mongoose.Schema({

    user:{
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    },
    car:{
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'Car'
    },
    text :{
        type : String,
        required : true
    },
    isAdmin:{
        type : Boolean,
        required :true,
        default : false
    },
},
{
   timestamps : true,
}
);

module.exports = mongoose.model("Comment", commentSchema)