const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recordSchema = new Schema(
    {
        artist: {type: String, required: true },
        albumName: {type: String, required: true},
        year: {type: Number, required: true},
        genreList: {type: String, required: true} 
    }
)

 module.exports = mongoose.model('record', recordSchema)