module.exports = ({ moment, assignmentDb, submissionsDb, Joi }) => {
	return async ({ userId, query }) => {
		validateInput({ userId, query });

		const { publishedAt } = query;

		const assignments = await assignmentDb.getAssignmentsByCreatorId({ createdBy: userId });

		for (let assignment of assignments) {
			const students = await submissionsDb.getAssignedUsersByAssignmentId({ assignmentId: assignment.id });

			const studentIds = students.map((student) => student.userId);

			assignment.assignedTo = studentIds;
		}

		if (publishedAt === "SCHEDULED") {
			return assignments.filter((assignment) => moment(assignment.publishedAt).diff(moment()) > 0);
		}

		if (publishedAt === "ONGOING") {
			return assignments.filter((assignment) => moment(assignment.publishedAt).diff(moment()) < 0);
		}

		return assignments;
	};

	function validateInput({ userId, query }) {
		const schema = Joi.object({
			userId: Joi.number().required(),
			query: Joi.object().required(),
		});
		const { error } = schema.validate({ userId, query });
		if (error) {
			throw new Error(error.message);
		}
	}
};
