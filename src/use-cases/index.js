// Import all dependencies
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const config = require("../config");
const DB = require("../data-access");

// Import factory use cases
const student = require("./student");
const tutor = require("./tutor");

// Import all common use cases
const makeGetUserByUsername = require("./get-user-by-username");
const getUserByUsername = makeGetUserByUsername({
	usersDb: DB.usersDb,
	Joi,
});

const makeAddNewUser = require("./add-new-user");
const addNewUser = makeAddNewUser({
	usersDb: DB.usersDb,
	Joi,
});

const makeGenerateJwtToken = require("./generate-jwt-token");
const generateJwtToken = makeGenerateJwtToken({
	getUserByUsername,
	addNewUser,
	jwt,
	config,
	usersDb: DB.usersDb,
	Joi,
});

const makeAssignAssignmentToStudent = require("./assign-assignment-to-student");
const assignAssignmentToStudent = makeAssignAssignmentToStudent({
	submissionsDb: DB.submissionsDb,
	usersDb: DB.usersDb,
	Joi,
});

const makeAddNewAssignment = require("./add-new-assignment");
const addNewAssignment = makeAddNewAssignment({
	assignAssignmentToStudent,
	assignmentDb: DB.assignmentDb,
	Joi,
});

const makeDeleteAssignment = require("./delete-assignment");
const deleteAssignment = makeDeleteAssignment({
	assignmentDb: DB.assignmentDb,
	submissionsDb: DB.submissionsDb,
	Joi,
});

const makeUnassignAssignmentToStudent = require("./unassign-assignment-to-student");
const unassignAssignmentToStudent = makeUnassignAssignmentToStudent({
	submissionsDb: DB.submissionsDb,
	Joi,
});

const makeUpdateAssignmentById = require("./update-assignment-by-id");
const updateAssignmentById = makeUpdateAssignmentById({
	assignmentDb: DB.assignmentDb,
	assignAssignmentToStudent,
	unassignAssignmentToStudent,
	Joi,
});

const makeAddSubmission = require("./add-submission");
const addSubmission = makeAddSubmission({
	submissionsDb: DB.submissionsDb,
	Joi,
});

// Export all use cases
module.exports = {
	student,
	tutor,
	generateJwtToken,
	getUserByUsername,
	addNewUser,
	addNewAssignment,
	assignAssignmentToStudent,
	deleteAssignment,
	updateAssignmentById,
	addSubmission,
};
