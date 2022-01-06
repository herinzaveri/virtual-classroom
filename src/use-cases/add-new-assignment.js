module.exports = ({ assignAssignmentToStudent, assignmentDb, Joi }) => {
	return async ({ description, publishedAt, deadline, createdBy, assignTo }) => {
		validateInput({ description, publishedAt, deadline, createdBy, assignTo });

		const assignment = await assignmentDb.addAssignment({ description, publishedAt, deadline, createdBy });

		const assignmentId = assignment.insertId;

		for (let userId of assignTo) {
			await assignAssignmentToStudent({ userId, assignmentId });
		}

		return { message: `Assignment added with id ${assignmentId}` };
	};

	function validateInput({ description, publishedAt, deadline, createdBy, assignTo }) {
		const schema = Joi.object({
			description: Joi.string().required(),
			publishedAt: Joi.date().iso().required(),
			deadline: Joi.date().iso().required(),
			createdBy: Joi.number().required(),
			assignTo: Joi.array().required(),
		});
		const { error } = schema.validate({ description, publishedAt, deadline, createdBy, assignTo });
		if (error) {
			throw new Error(error.message);
		}
	}
};
