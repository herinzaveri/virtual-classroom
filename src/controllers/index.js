const Joi = require("joi");

const useCases = require("../use-cases");

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

module.exports = {
	authController,
	createAssignmentController,
	deleteAssignmentController,
};
