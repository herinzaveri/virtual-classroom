module.exports = ({ submissionsDb, Joi }) => {
	return async ({ userId, assignmentId }) => {
		validateInput({ userId, assignmentId });

		return await submissionsDb.unassignToStudent({ userId, assignmentId });
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
