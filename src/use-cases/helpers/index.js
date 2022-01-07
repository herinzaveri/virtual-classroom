// Import all dependencies
const moment = require("moment");

// Import all helper use cases
const makeGetStatusOfAssignment = require("./get-status-of-assignment");
const getStatusOfAssignment = makeGetStatusOfAssignment({ moment });

getStatusOfAssignment({
	publishedAt: "2022-07-10T09:30:00.000Z",
	deadline: "2020-07-10T09:30:00.000Z",
	submission: "",
});

// Export all helper use cases
module.exports = {
	getStatusOfAssignment,
};
