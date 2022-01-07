const express = require("express");
const router = express.Router();

const contollers = require("../controllers");
const middlewares = require("../middlewares");

router.get("/", (req, res) => {
	res.send("Welcome to Virtual Classroom");
});

router.post("/auth", contollers.authController);

router.use(middlewares.isValidUser);

router.post("/assignment", middlewares.isTutor, contollers.createAssignmentController);

router.delete("/assignment/:id", middlewares.isTutor, contollers.deleteAssignmentController);

router.get("/assignment/:id", contollers.getAssignmentSubmissionController);

router.put("/assignment/:id", middlewares.isTutor, contollers.updateAssignmentController);

router.put("/assignment/:id/submission", middlewares.isStudent, contollers.addSubmissionController);

router.get("/feed", contollers.getFeedController);

module.exports = router;
