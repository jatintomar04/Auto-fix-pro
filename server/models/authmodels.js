
const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    name  :{
        type : String,
        require : true
    } ,
    email :{
        type : String,
        require : true,
        unique : true
    },
    password : {
        type : String,
        require : true
    },
    isAdmin : {
        type : Boolean,
        default : false,
        require : true
    }
},{
        timestamps : true
})


module.exports = mongoose.model('user' , userSchema )