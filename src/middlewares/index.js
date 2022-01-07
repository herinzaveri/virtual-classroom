// Import all dependencies
const jwt = require("jsonwebtoken");

const config = require("../config");

const makeIsValidUser = require("./is-valid-user");
const isValidUser = makeIsValidUser({ jwt, config });

const makeIsTutor = require("./is-tutor");
const isTutor = makeIsTutor();

const makeIsStudent = require("./is-student");
const isStudent = makeIsStudent();

module.exports = {
	isValidUser,
	isTutor,
	isStudent,
};
