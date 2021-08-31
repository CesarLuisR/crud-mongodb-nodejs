const { Router } = require("express");
const router = Router();
const Note = require("../models/Note");

router.post("/", async (req, res) => {
    await Note.create({ text: req.body.text });
    res.send("Saved");
});

router.get("/notes", async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    const notes = await Note.find();
    res.send(notes);
});

module.exports = router;