const config = {
	jwt: {
		secretKey: process.env.secretKey || "secretKeyOfHerin",
	},
	mysql: {
		host: process.env.host || "localhost",
		user: process.env.user || "root",
		password: process.env.password || "root",
	},
};

module.exports = config;
