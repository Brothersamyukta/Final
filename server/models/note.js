const mongoose = require('mongoose')

const noteSchema = mongoose.Schema({
    title: {type:String, required:true},
    description: {type:String}
})

module.exports = mongoose.model("Note", noteSchema);