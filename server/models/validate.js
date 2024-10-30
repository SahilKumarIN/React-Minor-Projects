const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema ({
    filename:{
        type: String,
        required:true,
    },
    path:{
        type: String,
        required:true,
    },
    uuid:{
        type:String,
        required:true,
    },
    filehash:{
        type:String,
        required:true,
    },
    fileSize:{
        type:String,
    }

},{timestamps:true});

module.exports = mongoose.model('File',fileSchema);