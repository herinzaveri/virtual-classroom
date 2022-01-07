module.exports = ({ useCases, Joi }) => {
	return async (req, res) => {
		const userId = req.user.id;
		const userType = req.user.type;
		const { publishedAt, status } = req.query;

		try {
			validateInput({ userId, userType });

			const response = await useCases[userType].getFeed({ userId, query: { publishedAt, status } });

			res.send(response);
		} catch (err) {
			res.status(400).send(err.message);
		}
	};

	function validateInput({ userId, userType }) {
		const schema = Joi.object({
			userId: Joi.number().required(),
			userType: Joi.string().required(),
		});
		const { error } = schema.validate({ userId, userType });
		if (error) {
			throw new Error(error.message);
		}
	}
};
