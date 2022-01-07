module.exports = ({ moment }) => {
	return async ({ publishedAt, deadline, submission }) => {
		const start = moment(publishedAt);
		const end = moment(deadline);

		let status = "PENDING";

		if (start.diff(moment()) > 0) {
			status = "SCHEDULED";
		}

		if (end.diff(moment()) < 0) {
			status = "OVERDUE";
		}

		if (submission) {
			status = "SUBMITTED";
		}

		return status;
	};
};
