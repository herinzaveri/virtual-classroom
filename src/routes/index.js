const express = require("express");
const router = express.Router();

const contollers = require("../controllers");
const middlewares = require("../middlewares");

router.get("/", (req, res) => {
	res.send("Hello World");
});

router.post("/auth", contollers.authController);

router.use(middlewares.isValidUser);

router.post("/assignment", middlewares.isTutor, contollers.createAssignmentController);

router.delete("/assignment/:id", middlewares.isTutor, contollers.deleteAssignmentController);

router.get("/test", (req, res) => {
	res.send(req.user);
});

module.exports = router;
