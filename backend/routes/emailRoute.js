const express = require('express');
const { createEmail, deleteEmail, getAllEmail, getSentEmail } = require("../controllers/email");
const isAuthenticated = require("../middlewares/isAuthenticated");
const router = express.Router();

router.post("/create", isAuthenticated, createEmail);
router.delete("/:id", isAuthenticated, deleteEmail);
router.get("/getallemails", isAuthenticated, getAllEmail);
router.get("/getsentemails", isAuthenticated, getSentEmail);

module.exports = router;