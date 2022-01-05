const TABLE_NAME = "users";

module.exports = ({ mysql }) => {
	const getUserByUsername = async ({ username }) => {
		const sql = `SELECT *
                        FROM ${TABLE_NAME}
                        WHERE username = ?`;

		const values = [username];

		const [result] = await mysql.execute(sql, values);

		return result[0];
	};

	const addUser = async ({ username, password, type }) => {
		const sql = `INSERT 
                        INTO ${TABLE_NAME} (username,password,type)
                        VALUES (?,?,?)`;

		const values = [username, password, type];

		const [result] = await mysql.execute(sql, values);

		return result;
	};

	return Object.freeze({
		getUserByUsername,
		addUser,
	});
};
