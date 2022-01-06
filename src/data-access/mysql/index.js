const mysql = require("mysql2");
const config = require("../../config");

const db = mysql.createPool({
	host: config.mysql.host,
	user: config.mysql.user,
	password: config.mysql.password,
	database: "virtual_classroom",
});

module.exports = db.promise();
