const express = require("express");
const router = express.Router();
const { translateContent } = require("../controllers/translateController");

router.post("/", translateContent);

module.exports = router;
