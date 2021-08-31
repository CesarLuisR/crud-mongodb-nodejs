const { Router } = require("express");
const router = Router();
const indexController = require("../controllers/index");

router.post("/", indexController.createDocument);

router.put("/:id", indexController.updateDocument);

router.delete("/:id", indexController.deleteDocument);

router.get("/notes", indexController.sendNotes);

module.exports = router;