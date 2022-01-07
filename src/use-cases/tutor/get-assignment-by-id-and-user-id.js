module.exports = ({ getStatusOfAssignment, assignmentDb, Joi }) => {
	return async ({ assignmentId, userId }) => {
		validateInput({ assignmentId, userId });

		const submissions = await assignmentDb.getAssignmentSubmissionByIdAndCreatorId({
			id: assignmentId,
			createdBy: userId,
		});

		if (!submissions.length) {
			return { message: "No submissions found" };
		}

		for (let submission of submissions) {
			submission.status = await getStatusOfAssignment({
				publishedAt: submission.publishedAt,
				deadline: submission.deadline,
				submission: submission.submission,
			});
		}

		return submissions;
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
