const express = require("express");
const router = express.Router();
const user = require("./user.js");

router.use(user);

module.exports = router;
