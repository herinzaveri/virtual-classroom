module.exports = ({ getUserByUsername, addNewUser, Joi, jwt, config }) => {
	return async ({ username, password, type }) => {
		validateInput({ username, password, type });

		const user = await getUserByUsername({ username });

		if (user) {
			if (user.password === password) {
				return jwt.sign(user, config.jwt.secretKey);
			} else {
				throw new Error("Invalid Password");
			}
		}

		const newUser = await addNewUser({ username, password, type });

		return jwt.sign({ username, password, type, id: newUser.insertId }, config.jwt.secretKey);
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
