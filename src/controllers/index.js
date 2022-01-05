const Joi = require("joi");

const useCases = require("../use-cases");

const makeAuthController = require("./auth.controller");
const authController = makeAuthController({
	Joi,
	generateJwtToken: useCases.generateJwtToken,
});

module.exports = {
	authController,
};
