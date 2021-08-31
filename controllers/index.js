const indexController = { };
const Note = require("../models/Note");

indexController.createDocument = async (req, res) => {
    await Note.create({ text: req.body.text });
    res.send("Saved");
};

indexController.updateDocument = async (req, res) => {
    const text = req.body.text;
    const id = req.params.id;

    const updateOperation = await Note.findByIdAndUpdate(id, { text });

    updateOperation
        ? res.json({ error: false, message: "Success" })
        : res.json({ error: true, message: "Error" });
};

indexController.deleteDocument = async (req, res) => {
    const deleteOperation = await Note.findByIdAndDelete({ _id: req.params.id });

    deleteOperation
        ? res.json({ error: false, message: "Success" })
        : res.json({ error: true, message: "Error" });
};

indexController.sendNotes = async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    const notes = await Note.find();
    res.send(notes);
};

module.exports = indexController;