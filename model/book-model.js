const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const bookschema = new Schema({
    name:{
        type: String,
        required:true
    },
    author:{
        type: String,
        required:true
    },
    genre:{
        type: String,
        required:true
    },
    price:{
        type: String,
        required:true
    },
    Publsher:{
        type: String,
        required:true
    }
},
{
    Timestamp: true,
});

module.exports =mongoose.model("Book",bookschema);