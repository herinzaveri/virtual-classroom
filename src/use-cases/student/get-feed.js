module.exports = ({ getStatusOfAssignment, assignmentDb, Joi }) => {
	return async ({ userId, query }) => {
		validateInput({ userId, query });

		let { status } = query;

		const assignments = await assignmentDb.getAssignmentSubmissionByUserId({ userId });

		for (let assignment of assignments) {
			assignment.status = await getStatusOfAssignment({
				publishedAt: assignment.publishedAt,
				deadline: assignment.deadline,
				submission: assignment.submission,
			});
		}

		if (!status || status === "ALL") {
			return assignments;
		}

		return assignments.filter((assignment) => assignment.status === status);
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
