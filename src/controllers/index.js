const Joi = require("joi");

// Import use cases
const useCases = require("../use-cases");

// Import all controllers
const makeAuthController = require("./auth.controller");
const authController = makeAuthController({
	generateJwtToken: useCases.generateJwtToken,
	Joi,
});

const makeCreateAssignmentController = require("./create-assignment.controller");
const createAssignmentController = makeCreateAssignmentController({
	addNewAssignment: useCases.addNewAssignment,
	Joi,
});

const makeDeleteAssignmentController = require("./delete-assignment.controller");
const deleteAssignmentController = makeDeleteAssignmentController({
	deleteAssignment: useCases.deleteAssignment,
	Joi,
});

const makeGetAssignmentSubmissionController = require("./get-assignment-submission.controller");
const getAssignmentSubmissionController = makeGetAssignmentSubmissionController({
	useCases,
	Joi,
});

const makeUpdateAssignmentController = require("./update-assignment.controller");
const updateAssignmentController = makeUpdateAssignmentController({
	updateAssignmentById: useCases.updateAssignmentById,
	Joi,
});

const makeAddSubmissionController = require("./add-submission.controller");
const addSubmissionController = makeAddSubmissionController({
	addSubmission: useCases.addSubmission,
	Joi,
});

const makeGetFeedController = require("./get-feed.controller");
const getFeedController = makeGetFeedController({
	useCases,
	Joi,
});

// Export all controllers
module.exports = {
	authController,
	createAssignmentController,
	deleteAssignmentController,
	getAssignmentSubmissionController,
	updateAssignmentController,
	addSubmissionController,
	getFeedController,
};
