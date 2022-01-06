module.exports = () => {
	return async (req, res, next) => {
		try {
			if (req.user.type === "student") {
				next();
			} else {
				throw new Error();
			}
		} catch (err) {
			res.status(400).send("You do not have rights to access this route, only students can access");
		}
	};
};
