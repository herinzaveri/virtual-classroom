module.exports = ({ assignmentDb, submissionsDb, Joi }) => {
	return async ({ assignmentId }) => {
		validateInput({ assignmentId });

		await submissionsDb.removeAssignmentById({ assignmentId });

		return await assignmentDb.deleteAssignmentById({ id: assignmentId });
	};

	function validateInput({ assignmentId }) {
		const schema = Joi.object({
			assignmentId: Joi.number().required(),
		});
		const { error } = schema.validate({ assignmentId });
		if (error) {
			throw new Error(error.message);
		}
	}
};
