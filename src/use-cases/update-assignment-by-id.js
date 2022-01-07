module.exports = ({ assignmentDb, assignAssignmentToStudent, unassignAssignmentToStudent, Joi }) => {
	return async ({ assignmentId, description, publishedAt, deadline, createdBy, assignTo, unassignTo }) => {
		validateInput({ assignmentId, description, publishedAt, deadline, createdBy, assignTo, unassignTo });

		const assignment = await assignmentDb.updateAssignmentById({
			id: assignmentId,
			createdBy,
			updateInfo: {
				description,
				publishedAt,
				deadline,
			},
		});

		if (assignment.affectedRows) {
			if (unassignTo) {
				for (let userId of unassignTo) {
					await unassignAssignmentToStudent({ userId, assignmentId });
				}
			}

			if (assignTo) {
				for (let userId of assignTo) {
					await assignAssignmentToStudent({ userId, assignmentId });
				}
			}
		}

		return { message: `Assignment updated with id ${assignmentId}` };
	};

	function validateInput({ assignmentId, description, publishedAt, deadline, createdBy, assignTo, unassignTo }) {
		const schema = Joi.object({
			assignmentId: Joi.number().required(),
			description: Joi.string().allow(""),
			publishedAt: Joi.date().iso().allow(""),
			deadline: Joi.date().iso().allow(""),
			createdBy: Joi.number().required(),
			assignTo: Joi.array(),
			unassignTo: Joi.array(),
		});
		const { error } = schema.validate({ assignmentId, description, publishedAt, deadline, createdBy, assignTo, unassignTo });
		if (error) {
			throw new Error(error.message);
		}
	}
};
