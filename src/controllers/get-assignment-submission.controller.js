module.exports = ({ useCases, Joi }) => {
	return async (req, res) => {
		const assignmentId = req.params.id;
		const userId = req.user.id;
		const userType = req.user.type;

		try {
			validateInput({ assignmentId, userId, userType });

			const response = await useCases[userType].getAssignmentByIdAndUserId({ assignmentId, userId });

			res.send(response);
		} catch (err) {
			res.status(400).send(err.message);
		}
	};

	function validateInput({ assignmentId, userId, userType }) {
		const schema = Joi.object({
			assignmentId: Joi.number().required(),
			userId: Joi.number().required(),
			userType: Joi.string().required(),
		});
		const { error } = schema.validate({ assignmentId, userId, userType });
		if (error) {
			throw new Error(error.message);
		}
	}
};
