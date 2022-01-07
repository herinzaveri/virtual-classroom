module.exports = ({ submissionsDb, Joi }) => {
	return async ({ userId, assignmentId, submission }) => {
		validateInput({ assignmentId, userId, submission });

		const submitted = await submissionsDb.getSubmissionByUserIdAndAssignmentId({ userId, assignmentId });

		if (!submitted) {
			return { message: `No assignment found with id ${assignmentId}` };
		}

		if (submitted && submitted.remark) {
			return { message: "Great Job, you have already submitted this assignment" };
		}

		await submissionsDb.addRemark({ submission, userId, assignmentId });

		return { message: "Great Job on submitting your assignment" };
	};

	function validateInput({ assignmentId, userId, submission }) {
		const schema = Joi.object({
			assignmentId: Joi.number().required(),
			userId: Joi.number().required(),
			submission: Joi.string().required(),
		});
		const { error } = schema.validate({ assignmentId, userId, submission });
		if (error) {
			throw new Error(error.message);
		}
	}
};
