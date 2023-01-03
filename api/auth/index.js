const router = require("express").Router();

router.post("/register", require("./register"));

module.exports = router;
