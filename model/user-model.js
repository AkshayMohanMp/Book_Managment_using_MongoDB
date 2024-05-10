const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const userschema = new Schema({
    name:{
        type: String,
        required:true
    },
    author:{
        type: String,
        required:true
    },
    surname:{
        type: String,
        requirde:true
    },
    email:{
        type: String,
        required:true
    },
    issuedBook:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: false,
    },
    returnDate:{
        type: String,
        required: false,
    },
    returnDate:{
        type: String,
        required: false
    },
    SubscriptionType:{
        type: String,
        required: false
    },
    SubscriptionDate:{
        type: String,
        required: false
    },
},
{
    Timestamp: true,
})

module.exports =mongoose.model("User",userschema)