const TABLE_NAME = "assignment";
const SUBMISSIONS_TABLE_NAME = "submissions";

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

	const getAssignmentSubmissionByIdAndUserId = async ({ id, userId }) => {
		const sql = `SELECT description,publishedAt,deadline,userId,remark AS submission
						FROM ${TABLE_NAME} AS a
						JOIN ${SUBMISSIONS_TABLE_NAME} AS s 
							ON a.id=s.assignmentId
						WHERE id = ?
							AND userId = ?`;

		const values = [id, userId];

		const [result] = await mysql.execute(sql, values);

		return result[0];
	};

	const getAssignmentSubmissionByIdAndCreatorId = async ({ id, createdBy }) => {
		const sql = `SELECT userId,description,publishedAt,deadline,userId,remark AS submission
						FROM ${TABLE_NAME} AS a
						JOIN ${SUBMISSIONS_TABLE_NAME} AS s 
							ON a.id=s.assignmentId
						WHERE id = ?
							AND createdBy = ?`;

		const values = [id, createdBy];

		const [result] = await mysql.execute(sql, values);

		return result;
	};

	const updateAssignmentById = async ({ id, createdBy, updateInfo }) => {
		const { columns, values } = manipulateJSONData({ updateInfo });

		values.push(id);
		values.push(createdBy);

		const sql = `UPDATE ${TABLE_NAME}
						SET ${columns}
						WHERE id = ?
							AND createdBy = ?`;

		const [result] = await mysql.execute(sql, values);

		return result;
	};

	const getAssignmentSubmissionByUserId = async ({ userId }) => {
		const sql = `SELECT description,publishedAt,deadline,userId,remark AS submission
						FROM ${TABLE_NAME} AS a
						JOIN ${SUBMISSIONS_TABLE_NAME} AS s 
							ON a.id=s.assignmentId
						WHERE userId = ?`;

		const values = [userId];

		const [result] = await mysql.execute(sql, values);

		return result;
	};

	const getAssignmentsByCreatorId = async ({ createdBy }) => {
		const sql = `SELECT id,description,publishedAt,deadline
						FROM ${TABLE_NAME} 
						WHERE createdBy = ?`;

		const values = [createdBy];

		const [result] = await mysql.execute(sql, values);

		return result;
	};

	function manipulateJSONData({ updateInfo }) {
		let columns = "";
		const values = [];

		for (const column in updateInfo) {
			if (updateInfo[column]) {
				if (!columns) {
					columns += ` ${column} = ? `;
				} else {
					columns += `, ${column} = ? `;
				}
				values.push(updateInfo[column]);
			}
		}
		return { columns, values };
	}

	return Object.freeze({
		addAssignment,
		deleteAssignmentById,
		getAssignmentSubmissionByIdAndUserId,
		getAssignmentSubmissionByIdAndCreatorId,
		updateAssignmentById,
		getAssignmentSubmissionByUserId,
		getAssignmentsByCreatorId,
	});
};
