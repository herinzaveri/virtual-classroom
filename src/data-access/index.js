const mysql = require("./mysql");

const makeUsersDb = require("./users.db");
const usersDb = makeUsersDb({ mysql });

module.exports = {
	usersDb,
};
