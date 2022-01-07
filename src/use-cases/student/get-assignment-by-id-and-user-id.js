module.exports = ({ getStatusOfAssignment, assignmentDb, Joi }) => {
	return async ({ assignmentId, userId }) => {
		validateInput({ assignmentId, userId });

		const submission = await assignmentDb.getAssignmentSubmissionByIdAndUserId({
			id: assignmentId,
			userId,
		});

		if (submission) {
			const status = await getStatusOfAssignment({
				publishedAt: submission.publishedAt,
				deadline: submission.deadline,
				submission: submission.submission,
			});

			submission.status = status;

			return submission;
		}

		return { message: "No submission found" };
	};

	function validateInput({ assignmentId, userId }) {
		const schema = Joi.object({
			assignmentId: Joi.number().required(),
			userId: Joi.number().required(),
		});
		const { error } = schema.validate({ assignmentId, userId });
		if (error) {
			throw new Error(error.message);
		}
	}
};
