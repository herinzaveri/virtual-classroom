module.exports = ({ jwt, config }) => {
	return async (req, res, next) => {
		const jwtToken = req.headers.jwt;

		try {
			const user = jwt.verify(jwtToken, config.jwt.secretKey);

			if (user && user.id && user.type) {
				req.user = user;
				next();
			} else {
				throw new Error();
			}
		} catch (err) {
			res.status(400).send("Invalid user");
		}
	};
};
