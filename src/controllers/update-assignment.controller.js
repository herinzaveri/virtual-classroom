module.exports = ({ updateAssignmentById, Joi }) => {
	return async (req, res) => {
		const { description, publishedAt, deadline, assignTo, unassignTo } = req.body;
		const assignmentId = req.params.id;
		const createdBy = req.user.id;

		try {
			validateInput({ assignmentId, description, publishedAt, deadline, createdBy, assignTo, unassignTo });

			const response = await updateAssignmentById({ assignmentId, description, publishedAt, deadline, createdBy, assignTo, unassignTo });

			res.send(response);
		} catch (err) {
			res.status(400).send(err.message);
		}
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
