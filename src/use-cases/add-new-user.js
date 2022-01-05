module.exports = ({ usersDb, Joi }) => {
	return async ({ username, password, type }) => {
		validateInput({ username, password, type });

		return await usersDb.addUser({ username, password, type });
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
