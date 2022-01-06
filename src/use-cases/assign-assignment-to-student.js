module.exports = ({ submissionsDb, usersDb, Joi }) => {
	return async ({ userId, assignmentId }) => {
		validateInput({ userId, assignmentId });

		const user = await usersDb.getUserById({ id: userId });
		if (user.type !== "student") {
			return;
		}

		const submission = await submissionsDb.getSubmissionByUserIdAndAssignmentId({ userId, assignmentId });
		if (submission) {
			return;
		}

		return await submissionsDb.assignToStudent({ userId, assignmentId });
	};

	function validateInput({ userId, assignmentId }) {
		const schema = Joi.object({
			userId: Joi.number().required(),
			assignmentId: Joi.number().required(),
		});
		const { error } = schema.validate({ userId, assignmentId });
		if (error) {
			throw new Error(error.message);
		}
	}
};
