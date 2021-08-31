const { Schema, model } = require("mongoose");

const NoteSchema = new Schema({
    text: String
});

const Note = model("Note", NoteSchema);

module.exports = Note;