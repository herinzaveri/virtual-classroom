module.exports = ({ usersDb, Joi }) => {
	return async ({ username }) => {
		validateInput({ username });

		return await usersDb.getUserByUsername({ username });
	};

	function validateInput({ username }) {
		const schema = Joi.object({
			username: Joi.string().required(),
		});
		const { error } = schema.validate({ username });
		if (error) {
			throw new Error(error.message);
		}
	}
};
