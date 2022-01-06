module.exports = ({ addNewAssignment }) => {
	return async (req, res) => {
		const { description, publishedAt, deadline, assignTo } = req.body;
		const createdBy = req.user.id;

		try {
			validateInput({ description, publishedAt, deadline, createdBy, assignTo });

			const response = await addNewAssignment({ description, publishedAt, deadline, createdBy, assignTo });

			res.send(response);
		} catch (err) {
			res.status(400).send(err.message);
		}
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
