const express = require("express");
const router = express.Router();

const contoller = require("../controllers");

router.get("/", (req, res) => {
	res.send("Hello World");
});

router.post("/auth", contoller.authController);

module.exports = router;
