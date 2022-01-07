const mysql = require("./mysql");

// Import all dbs
const makeUsersDb = require("./users.db");
const usersDb = makeUsersDb({ mysql });

const makeAssignmentDb = require("./assignment.db");
const assignmentDb = makeAssignmentDb({ mysql });

const makeSubmissionsDb = require("./submissions.db");
const submissionsDb = makeSubmissionsDb({ mysql });

// Import all dbs
module.exports = {
	usersDb,
	assignmentDb,
	submissionsDb,
};
