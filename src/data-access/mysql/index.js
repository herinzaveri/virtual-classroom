const mysql = require("mysql2");

const db = mysql.createPool({
	host: "localhost",
	user: process.env.user || "root",
	password: process.env.password || "root",
	port: 3306,
	database: "virtual_classroom",
});

module.exports = db.promise();
