
const { default: mongoose } = require("mongoose");

const carSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    car:{
        type :String,
        enum : ['scorpio', 'thar', 'xuv700', '3xo', 'bolero'],
        required :true
    },
    description:{
        type : String,
        required : true
    },
    registration:{
        type :String,
        required : true
    },
    status: {
        type : String,
        enum : ['open', 'pending', "colse"],
        default : "open",
        required : true
    },
    carImage :{
        type :String,
        required : true, 


    }

},{
    timestamps :true

});

module.exports = mongoose.model('Car',carSchema)