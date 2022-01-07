const TABLE_NAME = "submissions";

module.exports = ({ mysql }) => {
	const assignToStudent = async ({ userId, assignmentId }) => {
		const sql = `INSERT 
                        INTO ${TABLE_NAME} (userId, assignmentId)
                        VALUES (?,?)`;

		const values = [userId, assignmentId];

		const [result] = await mysql.execute(sql, values);

		return result;
	};

	const getSubmissionByUserIdAndAssignmentId = async ({ userId, assignmentId }) => {
		const sql = `SELECT * 
                        FROM ${TABLE_NAME}
                        WHERE userId = ?
                            AND assignmentId = ?`;

		const values = [userId, assignmentId];

		const [result] = await mysql.execute(sql, values);

		return result[0];
	};

	const unassignToStudent = async ({ userId, assignmentId }) => {
		const sql = `DELETE
                        FROM ${TABLE_NAME}
                        WHERE userId = ?
                            AND assignmentId = ?`;

		const values = [userId, assignmentId];

		const [result] = await mysql.execute(sql, values);

		return result;
	};

	const removeAssignmentById = async ({ assignmentId }) => {
		const sql = `DELETE
                        FROM ${TABLE_NAME}
                        WHERE assignmentId = ?`;

		const values = [assignmentId];

		const [result] = await mysql.execute(sql, values);

		return result;
	};

	const addRemark = async ({ userId, assignmentId, submission }) => {
		const sql = `UPDATE ${TABLE_NAME}
						SET remark = ?
						WHERE userId = ?
							AND assignmentId = ?`;

		const values = [submission, userId, assignmentId];

		const [result] = await mysql.execute(sql, values);

		return result;
	};

	const getAssignedUsersByAssignmentId = async ({ assignmentId }) => {
		const sql = `SELECT userId
						FROM ${TABLE_NAME}
						WHERE assignmentId = ?`;

		const values = [assignmentId];

		const [result] = await mysql.execute(sql, values);

		return result;
	};

	return Object.freeze({
		assignToStudent,
		getSubmissionByUserIdAndAssignmentId,
		unassignToStudent,
		removeAssignmentById,
		addRemark,
		getAssignedUsersByAssignmentId,
	});
};
