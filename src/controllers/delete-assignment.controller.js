module.exports = ({ deleteAssignment, Joi }) => {
	return async (req, res) => {
		const { id: assignmentId } = req.params;

		try {
			validateInput({ assignmentId });

			await deleteAssignment({ assignmentId });

			res.send({ message: `Assignment deleted successfully with id ${assignmentId}` });
		} catch (err) {
			res.status(400).send(err.message);
		}
	};

	function validateInput({ assignmentId }) {
		const schema = Joi.object({
			assignmentId: Joi.number().required(),
		});
		const { error } = schema.validate({ assignmentId });
		if (error) {
			throw new Error(error.message);
		}
	}
};
