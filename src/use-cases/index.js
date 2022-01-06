const Joi = require("joi");
const jwt = require("jsonwebtoken");

const config = require("../config");
const DB = require("../data-access");

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

module.exports = {
	generateJwtToken,
	getUserByUsername,
	addNewUser,
	addNewAssignment,
	assignAssignmentToStudent,
	deleteAssignment,
};
