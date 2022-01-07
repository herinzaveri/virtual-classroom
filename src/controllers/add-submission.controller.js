module.exports = ({ addSubmission, Joi }) => {
	return async (req, res) => {
		const assignmentId = req.params.id;
		const userId = req.user.id;
		const submission = req.body.submission;

		try {
			validateInput({ assignmentId, userId, submission });

			const response = await addSubmission({ userId, assignmentId, submission });

			res.send(response);
		} catch (err) {
			res.status(400).send(err.message);
		}
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
