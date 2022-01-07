// Import all dependencies
const Joi = require("joi");

// Import all db
const DB = require("../../data-access");

// Import all helper use cases
const helperUseCases = require("../helpers");

// Import all student use cases
const makeGetAssignmentByIdAndUserId = require("./get-assignment-by-id-and-user-id");
const getAssignmentByIdAndUserId = makeGetAssignmentByIdAndUserId({
	getStatusOfAssignment: helperUseCases.getStatusOfAssignment,
	assignmentDb: DB.assignmentDb,
	Joi,
});

const makeGetFeed = require("./get-feed");
const getFeed = makeGetFeed({
	getStatusOfAssignment: helperUseCases.getStatusOfAssignment,
	assignmentDb: DB.assignmentDb,
	Joi,
});

// Export student use cases
module.exports = {
	getAssignmentByIdAndUserId,
	getFeed,
};
