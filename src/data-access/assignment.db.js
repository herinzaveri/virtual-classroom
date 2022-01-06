const TABLE_NAME = "assignment";

module.exports = ({ mysql }) => {
	const addAssignment = async ({ description, publishedAt, deadline, createdBy }) => {
		const sql = `INSERT 
                        INTO ${TABLE_NAME} (description, publishedAt, deadline, createdBy)
                        VALUES (?,?,?,?)`;

		const values = [description, publishedAt, deadline, createdBy];

		const [result] = await mysql.execute(sql, values);

		return result;
	};

	const deleteAssignmentById = async ({ id }) => {
		const sql = `DELETE
                        FROM ${TABLE_NAME}
                        WHERE id = ?`;

		const values = [id];

		const [result] = await mysql.execute(sql, values);

		return result;
	};

	return Object.freeze({
		addAssignment,
		deleteAssignmentById,
	});
};
