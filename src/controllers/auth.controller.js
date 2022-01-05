module.exports = ({ generateJwtToken, Joi }) => {
	return async (req, res) => {
		const { username, password } = req.body;
		const type = req.body.type === "tutor" ? "tutor" : "student";

		try {
			validateInput({ username, password, type });

			const jwtToken = await generateJwtToken({ username, password, type });

			res.send(JSON.stringify({ jwtToken }));
		} catch (err) {
			res.status(400).send(err.message);
		}
	};

	function validateInput({ username, password, type }) {
		const schema = Joi.object({
			username: Joi.string().required(),
			password: Joi.string().required(),
			type: Joi.string().required(),
		});
		const { error } = schema.validate({ username, password, type });
		if (error) {
			throw new Error(error.message);
		}
	}
};
